export interface EnvironmentConfig {
  baseUrl: string;
  credentials: {
    username: string;
    password: string;
  };
}

export type Environment = 'dev' | 'staging' | 'prod';

const environments: Record<Environment, EnvironmentConfig> = {
  dev: {
    baseUrl: 'https://www.saucedemo.com',
    credentials: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
  },
  staging: {
    baseUrl: 'https://www.saucedemo.com',
    credentials: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
  },
  prod: {
    baseUrl: 'https://www.saucedemo.com',
    credentials: {
      username: 'standard_user',
      password: 'secret_sauce',
    },
  },
};

export function getEnvironment(): Environment {
  const env = process.env.TEST_ENV as Environment;
  if (env && environments[env]) {
    return env;
  }
  return 'dev';
}

export function getConfig(): EnvironmentConfig {
  return environments[getEnvironment()];
}

export default environments;
