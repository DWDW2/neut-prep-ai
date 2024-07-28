import Redis from 'ioredis';
import {envs} from './env'

const redis = new Redis({
    host: envs.REDIS_HOST,
    port: envs.REDIS_PORT,
    password: envs.REDIS_PASSWORD
}); 

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

redis.on('connect', () => {
    console.log('connected to redis')
})

export default redis;
