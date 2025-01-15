import { Redis } from '@upstash/redis'

export const redis = new Redis({
    url: 'https://needed-dolphin-56137.upstash.io',
    token: process.env.REDIS_KEY!,
})