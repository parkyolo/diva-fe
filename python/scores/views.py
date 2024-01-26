from django.shortcuts import render
from django.db import transaction


# Create your views here.

@transaction.atomic
def calculate_score(request):
    # TODO: calculate score
    # 녹음 파일을 받는다.
    # 녹음 파일의 확장자를 확인한다.


    # 동시에 할 것이므로, 비동기로 처리한다.
    # 녹음 파일을 분석한다.

    # 녹음 파일을 S3에 저장한다.

    # Practice_Result에 점수를 저장한다.

    # 점수를 반환한다.
    return render(request, 'scores/score.html', {'score': 100})
