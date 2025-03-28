import { seconds, ThrottlerOptions } from '@nestjs/throttler';
import { config } from 'dotenv';

config();
const { THROTTLER_TTL, THROTTLER_BLOCK, THROTTLER_LIMIT } = process.env;

export const throttlerOptions: ThrottlerOptions = {
  ttl: seconds(Number(THROTTLER_TTL)),
  limit: Number(THROTTLER_BLOCK),
  blockDuration: seconds(Number(THROTTLER_BLOCK)),
};
