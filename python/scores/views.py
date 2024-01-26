from django.shortcuts import render
from django.db import transaction

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

import json

from .model.Score import Score


# Create your views here.

@api_view(['GET'])
def calculate_score(request):
    # request에서 PracticeResult의 id를 받아온다.
    practice_result_id = request.GET.get('practice_result_id')

    # TODO: calculate score
    # S3로부터 녹음 파일을 다운로드한다.


    # S3로부터 txt 파일을 다운로드한다.

    # 동시에 할 것이므로, 비동기로 처리한다.
    # 녹음 파일을 분석한다.

    # 녹음 파일을 S3에 저장한다.

    # 점수를 반환한다.
    score = Score(100)

    # score 객체를 json으로 변환한다.
    dumps = json.dumps(score.__dict__)

    return Response(dumps, status=status.HTTP_200_OK)
