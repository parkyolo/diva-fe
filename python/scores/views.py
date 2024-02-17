import os
import shutil

from django.shortcuts import render
from django.db import transaction

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django_ratelimit.decorators import ratelimit

import torch
import boto3

from UltraSingerCustom.src.ScoreSettings import ScoreSettings
from UltraSingerCustom.src.UltraSinger import UltraSinger

import os
import json
import multiprocessing
from multiprocessing import Manager

from unicodedata import normalize

from .process.TensorProcess import TensorProcess
import tensorflow as tf
import gc

from .model.Score import Score


@ratelimit(key='ip', rate='5/m', block=True)
@api_view(['POST'])
def calculate_score(request):
    data = json.loads(request.body)

    # request에서 PracticeResult의 id를 받아온다.
    practice_result_id = str(data['id'])

    # request에서 artist를 받아온다.
    artist: str = data['artist']


    # request에서 title을 받아온다.
    title: str = data['title']

    # practice_result_id, artist, title 중 하나라도 없으면 400을 반환한다.
    if not practice_result_id or not artist or not title:
        return Response('{"error": "PracticeResultId, Artist, Title is required."}', status=status.HTTP_400_BAD_REQUEST, content_type='application/json')

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
        # gpus = tf.config.list_physical_devices('GPU')
        # tf.config.set_logical_device_configuration(
        #     gpus[0],
        #     [tf.config.LogicalDeviceConfiguration(memory_limit=4096)])

        # S3로부터 사용자의 녹음 파일을 다운로드한다.
        # 녹음 파일은 diva-s3/PracticeResult/{practice_result_id}/에 저장된다.
        remote = practice_result_dir + "/" + practice_result_id + "/" + artist + "-" + title + ".mp3"

        # after_filename = normalize('NFD', remote)
        after_filename = remote
        txt_filename = "song" + "/" + artist + "-" + title + "/" + artist + "-" + title + "_INFO.txt"
        print(after_filename)
        print(txt_filename)

        song_dir = "song"

        download_to = current_path + "/" + "scores" + "/" + song_dir + "/" + artist + "-" + title + "_INFO.txt"
        print(download_to)
        bucket.download_file(txt_filename, download_to)
        bucket.download_file(after_filename,
                             current_path + "/" + "scores" + "/" + practice_result_dir + "/" + practice_result_id + "/" + artist + "-" + title + ".mp3")

        # 녹음 파일을 분석한다.
        scoreSettings = ScoreSettings(id=practice_result_id,
                                      input_file_path=current_path + "/" + "scores" + "/" + song_dir + "/" + artist + "-" + title + "_INFO.txt",
                                      input_audio_file_path=current_path + "/" + "scores" + "/" + practice_result_dir + "/" + practice_result_id + "/" + artist + "-" + title + ".mp3",
                                      output_file_path=current_path + "/" + "scores" + "/" + practice_result_dir)
        us = UltraSinger(scoreSettings)

        final_score = 0

        with Manager() as manager:
            result_dict = manager.dict()
            # 데이터를 받는 프로세스가 없음 -> subprocess.check_output()
            # 송신 프로세스 중 파이프가 끊어짐 -> 데이터를 보내기 전에 파이프가 유효한지 확인
            tensor_process = TensorProcess(result_dict=result_dict, us=us)
            tensor_process.start()
            tensor_process.join()
            if 'error' in result_dict:
                print('An error occurred in the child process:', result_dict['error'])
            else:
                print(result_dict['result'])  # Prints the result of us.analyze()
                final_score = result_dict['result']

        # GPU 할당 해제
        # torch
        torch.cuda.empty_cache()

        # muted 파일을 S3에 저장한다.
        bucket.upload_file(
            current_path + "/" + "scores" + "/" + practice_result_dir + "/" + practice_result_id + "/" + artist + "-" + title + "/" + "cache" + "/" + artist + "-" + title + "_mute.wav",
            practice_result_dir + "/" + practice_result_id + "/" + artist + "-" + title + "_vocal.wav")

        # PracticeResult에 PracticeResultId 폴더를 지운다.
        shutil.rmtree(current_path + "/" + "scores" + "/" + practice_result_dir + "/" + practice_result_id)

        # 점수를 반환한다.
        score = Score(final_score)

        # 점수를 보정한다.
        score.score = min(100, 70 + score.score)

        # 점수를 소수 첫번째 자리에서 반올림한다.
        score.score = round(score.score)

        # score 객체를 json으로 변환한다.
        dumps = score.__dict__

        print(dumps)

        return Response(dumps, status=status.HTTP_200_OK, content_type='application/json')

    except Exception as e:
        # GPU 할당 해제
        # torch
        torch.cuda.empty_cache()

        # PracticeResult에 PracticeResultId 폴더를 지운다.
        shutil.rmtree(current_path + "/" + "scores" + "/" + practice_result_dir + "/" + practice_result_id)

        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR, content_type='application/json')
