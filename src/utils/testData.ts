import { getConfig } from '../../config/environments';

export const TestData = {
  validUser: {
    username: getConfig().credentials.username,
    password: getConfig().credentials.password,
  },
  invalidUser: {
    username: 'invalid_user',
    password: 'invalid_password',
  },
  lockedUser: {
    username: 'locked_out_user',
    password: 'secret_sauce',
  },
  products: {
    backpack: 'Sauce Labs Backpack',
    bikeLight: 'Sauce Labs Bike Light',
    boltTshirt: 'Sauce Labs Bolt T-Shirt',
    fleeceJacket: 'Sauce Labs Fleece Jacket',
    onesie: 'Sauce Labs Onesie',
    redTshirt: 'Test.allTheThings() T-Shirt (Red)',
  },
};

export const ErrorMessages = {
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  lockedUser: 'Epic sadface: Sorry, this user has been locked out.',
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required',
};
