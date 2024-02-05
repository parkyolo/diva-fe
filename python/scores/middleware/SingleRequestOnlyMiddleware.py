from django.conf import settings
from django.http import HttpResponse

import django_redis

class SingleRequestOnlyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.redis = django_redis.get_redis_connection('default')

    def __call__(self, request):
        redis_key = settings.SHARED_REDIS_KEY

        # redis에 API가 처리 중인지 확인
        if self.redis.exists(redis_key):
            print("API 처리 중")

            print(self.redis.get(redis_key))

            # 처리 중이면 429 http status code 반환
            return HttpResponse('{"error": "API is currently procesing a request. Please try again later."}', status=429)

        # redis에 API가 처리 중이라는 key 생성
        print("redis에 API가 처리 중이라는 key 생성")
        self.redis.set(redis_key, 1)

        # request 처리
        response = self.get_response(request)

        # request 처리 후 redis에 API가 처리 중이라는 key 삭제
        self.redis.delete(redis_key)

        # response 반환
        return response
