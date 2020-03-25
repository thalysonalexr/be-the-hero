import { config } from 'dotenv';

const ENV = {
  'development': '.env.dev',
  'test': '.env.test',
  'production': '.env',
};

config({ path: ENV[process.env.NODE_ENV] });
