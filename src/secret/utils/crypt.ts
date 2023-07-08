import * as crypto from 'crypto';

/**
 * Function to generate a salt for hash.
 */
export const generateSalt = (): string => {
  return crypto.randomBytes(16).toString('hex');
};

/**
 * Function to generate a salted password hash.
 * @param plainPassword
 * @param salt
 * @returns hashed password
 */
export const generateHash = (plainPassword: string, salt: string): string => {
  const hash = crypto
    .pbkdf2Sync(plainPassword, salt, 1000, 64, `sha512`)
    .toString(`hex`);

  return hash;
};

/**
 * Function to validate an entered password against a stored password.
 * @param attemptedPlainPassword
 * @param salt
 * @param hash
 * @returns
 */
export const validatePassword = (attemptedPlainPassword, salt, hash) => {
  return hash === generateHash(attemptedPlainPassword, salt);
};
