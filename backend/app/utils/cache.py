# app/utils/cache.py
# import redis
# import json
# import os

# REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
# redis_client = redis.Redis.from_url(REDIS_URL)

def get_cache(key: str):
    # Uncomment when ready to use Redis
    # cached_data = redis_client.get(key)
    # if cached_data:
    #     return json.loads(cached_data)
    return None

def set_cache(key: str, data, ttl: int = 300):
    # Uncomment when ready to use Redis
    # redis_client.set(key, json.dumps(data), ex=ttl)
    pass
