import os

from django.shortcuts import render
from django.db import transaction

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

import boto3

from UltraSingerCustom.src.ScoreSettings import ScoreSettings
from UltraSingerCustom.src.UltraSinger import UltraSinger

import json
import chardet

from .model.Score import Score


# Create your views here.

@api_view(['POST'])
def calculate_score(request):
    data = json.loads(request.body)

    # request에서 PracticeResult의 id를 받아온다.
    practice_result_id = str(data['id'])
    a = bytes(practice_result_id)
    print(chardet.detect(a)['encoding'])

    # request에서 artist를 받아온다.
    artist: str = data['artist']
    a = bytes(artist)
    print(chardet.detect(a)['encoding'])

    # request에서 title을 받아온다.
    title: str = data['title']
    a = bytes(title)
    print(chardet.detect(a)['encoding'])

    # 구조는 다음과 같다.
    bucket_name = "diva-s3"
    s3 = boto3.resource('s3')

    # PracticeResult Bucket 준비
    practice_result_dir = "PracticeResult"
    bucket = s3.Bucket(bucket_name)

    # PracticeResult에 PracticeResult의 id로 폴더를 만든다.
    current_path = os.getcwd()
    os.makedirs(current_path + "/scores/" + practice_result_dir + "/" + practice_result_id + "/")

    # S3로부터 사용자의 녹음 파일을 다운로드한다.
    # 녹음 파일은 diva-s3/PracticeResult/{practice_result_id}/에 저장된다.
    remote = practice_result_dir + "/" + practice_result_id + "/" + artist + "-" + title + ".mp3"
    a = bytes(remote)
    print(chardet.detect(a)['encoding'])
    print(f'remote: {remote}')
    compare = "PracticeResult/1/버즈-가시.mp3"
    a = bytes(compare)
    print(chardet.detect(a)['encoding'])
    print(f'compare: {compare}')

    print(f'is equal: {remote == compare}')

    print([ord(c) for c in remote])
    print([ord(c) for c in compare])

    bucket.download_file(remote, current_path + "/" + "scores" + "/" + practice_result_dir + "/" + practice_result_id + "/" + artist + "-" + title + ".mp3")

    song_dir = "song"

    # 녹음 파일을 분석한다.
    scoreSettings = ScoreSettings(id=practice_result_id, input_file_path=current_path + "/" + "scores" + "/" + song_dir + "/" + artist + "-" + title + "_INFO.txt", input_audio_file_path=current_path + "/" + practice_result_dir + "/" + practice_result_id + "/" + artist + "-" + title + ".mp3", output_file_path=current_path + "/" + "scores" + "/" + practice_result_dir)
    us = UltraSinger(scoreSettings)
    final_score = us.analyze()

    # 녹음 파일을 S3에 저장한다.

    # 점수를 반환한다.
    score = Score(final_score)

    # score 객체를 json으로 변환한다.
    dumps = json.dumps(score.__dict__)

    return Response(dumps, status=status.HTTP_200_OK)
