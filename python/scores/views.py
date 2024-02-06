import os
import shutil

from django.shortcuts import render
from django.db import transaction

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

import torch
import boto3

from UltraSingerCustom.src.ScoreSettings import ScoreSettings
from UltraSingerCustom.src.UltraSinger import UltraSinger

import os
import json
import multiprocessing

from unicodedata import normalize

import tensorflow as tf
import gc

from .model.Score import Score


# Create your views here.

@api_view(['POST'])
def calculate_score(request):
    data = json.loads(request.body)

    # request에서 PracticeResult의 id를 받아온다.
    practice_result_id = str(data['id'])

    # request에서 artist를 받아온다.
    artist: str = data['artist']

    # request에서 title을 받아온다.
    title: str = data['title']

    # 구조는 다음과 같다.
    bucket_name = "diva-s3"
    s3 = boto3.resource('s3')

    # PracticeResult Bucket 준비
    practice_result_dir = "PracticeResult"
    bucket = s3.Bucket(bucket_name)

    # PracticeResult에 PracticeResult의 id로 폴더를 만든다.
    current_path = os.getcwd()

    try:
        os.makedirs(current_path + "/scores/" + practice_result_dir + "/" + practice_result_id + "/", exist_ok=True)

        os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
        os.environ["CUDA_VISIBLE_DEVICES"] = "6"

        # GPU 할당 확인
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        print('Device:', device)
        print('Current cuda device:', torch.cuda.current_device())
        print('Count of using GPUs:', torch.cuda.device_count())

        # GPU Memory 최대 4GB로 제한
        # torch
        torch.cuda.set_per_process_memory_fraction(0.125)

        # tensorflow

        gpus = tf.config.list_physical_devices('GPU')
        tf.config.set_logical_device_configuration(
            gpus[0],
            [tf.config.LogicalDeviceConfiguration(memory_limit=4096)])

        # S3로부터 사용자의 녹음 파일을 다운로드한다.
        # 녹음 파일은 diva-s3/PracticeResult/{practice_result_id}/에 저장된다.
        remote = practice_result_dir + "/" + practice_result_id + "/" + artist + "-" + title + ".mp3"

        # after_filename = normalize('NFD', remote)
        after_filename = remote

        bucket.download_file(after_filename,
                             current_path + "/" + "scores" + "/" + practice_result_dir + "/" + practice_result_id + "/" + artist + "-" + title + ".mp3")

        song_dir = "song"

        # 녹음 파일을 분석한다.
        scoreSettings = ScoreSettings(id=practice_result_id,
                                      input_file_path=current_path + "/" + "scores" + "/" + song_dir + "/" + artist + "-" + title + "_INFO.txt",
                                      input_audio_file_path=current_path + "/" + "scores" + "/" + practice_result_dir + "/" + practice_result_id + "/" + artist + "-" + title + ".mp3",
                                      output_file_path=current_path + "/" + "scores" + "/" + practice_result_dir)
        us = UltraSinger(scoreSettings)

        result = 0

        get_result(result, us)

        # multiprocessing.set_start_method('spawn')
        process = multiprocessing.Process(target=get_result, args=(result,))
        process.start()
        process.join()

        final_score = result

        # GPU 할당 해제
        # torch
        torch.cuda.empty_cache()

        # tensorflow
        tf.keras.backend.clear_session()

        gc.collect()

        # muted 파일을 S3에 저장한다.
        bucket.upload_file(
            current_path + "/" + "scores" + "/" + practice_result_dir + "/" + practice_result_id + "/" + artist + "-" + title + "/" + "cache" + "/" + artist + "-" + title + "_mute.wav",
            practice_result_dir + "/" + practice_result_id + "/" + artist + "-" + title + "_vocal.wav")

        # PracticeResult에 PracticeResultId 폴더를 지운다.
        shutil.rmtree(current_path + "/" + "scores" + "/" + practice_result_dir + "/" + practice_result_id)

        # 점수를 반환한다.
        score = Score(final_score)

        # 점수를 보정한다.
        score.score = min(100, 50 + score.score)

        # score 객체를 json으로 변환한다.
        dumps = json.dumps(score.__dict__)

        return Response(dumps, status=status.HTTP_200_OK)

    except Exception as e:
        # GPU 할당 해제
        # torch
        torch.cuda.empty_cache()

        # PracticeResult에 PracticeResultId 폴더를 지운다.
        shutil.rmtree(current_path + "/" + "scores" + "/" + practice_result_dir + "/" + practice_result_id)

        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def get_result(number, us: UltraSinger):
    os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
    os.environ["CUDA_VISIBLE_DEVICES"] = "6"

    number = us.analyze()
    return number
