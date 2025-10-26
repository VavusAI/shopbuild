import fs from 'fs'; import path from 'path'; import dotenv from 'dotenv';
const root = process.cwd();
dotenv.config({ path: path.join(root, process.env.APP_ENV === 'prod' ? '.env.prod' : '.env') });

const ENV = {
  API_BASE_URL: process.env.API_BASE_URL || (process.env.RN_PLATFORM === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000'),
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY || '',
};

const out = `// generated
export const ENV = ${JSON.stringify(ENV, null, 2)} as const;`;
fs.writeFileSync(path.join(root, 'src', 'config', 'env.generated.ts'), out);
console.log('[env] generated src/config/env.generated.ts');
