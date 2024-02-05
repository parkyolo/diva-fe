import redis
from django.conf import settings
from django.http import HttpResponse


class SingleRequestOnlyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.redis = redis.StrictRedis(host='i10a607.p.ssafy.io', port=3307, db=0)

    def __call__(self, request):
        redis_key = settings.SHARED_REDIS_KEY

        # redis에 API가 처리 중인지 확인
        if self.redis.exists(redis_key):
            # 처리 중이면 429 http status code 반환
            return HttpResponse('{"error": "API is currently processing a request. Please try again later."}', status=429)

        # redis에 API가 처리 중이라는 key 생성
        self.redis.set(redis_key, 1)

        # request 처리
        response = self.get_response(request)

        # request 처리 후 redis에 API가 처리 중이라는 key 삭제
        self.redis.delete(redis_key)

        # response 반환
        return response
