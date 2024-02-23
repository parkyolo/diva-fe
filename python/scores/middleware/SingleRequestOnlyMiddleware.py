from django.conf import settings
from django.http import HttpResponse


class SingleRequestOnlyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        status = settings.SHARED_API_STATUS

        # API가 처리 중인지 확인
        if status:
            print("API 처리 중")

            # 처리 중이면 429 http status code 반환
            return HttpResponse('{"error": "API is currently procesing a request. Please try again later."}', status=429)

        # API가 처리 중이라는 기록 남기기
        print("API가 처리 중이라는 기록 남기기")
        status = True

        # request 처리
        response = self.get_response(request)

        # request 처리 후 API가 처리 중이라는 기록 삭제
        status = False

        # response 반환
        return response
