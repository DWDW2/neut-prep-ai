import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
 PORT: get('PORT').required().asPortNumber(),
 API_PREFIX: get('DEFAULT_API_PREFIX').default('/api/v1').asString(),
 NODE_ENV: get('NODE_ENV').default('development').asString(),
 MONGO_URI: get('MONGO_URI').required().asString(),
 GEMINI_API: get('GEMINI_API').required().asString(),
 JWT_SECRET: get('JWT_SECRET').required().asString(),
 
};
