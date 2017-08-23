import redis
import os


def get_redis():
  return redis.StrictRedis.from_url(os.environ.get('REDIS_URL'))
