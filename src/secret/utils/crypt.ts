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
    .pbkdf2Sync(plainPassword, salt, 1000, 64, `sha1`)
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

/**
 * Encrypts a message.
 * @param algorithm cipher to be used (AES-192-CBC)
 * @param content plain text
 * @param passphrase raw passphrase
 * @returns Object
 */
export const encryptMessage = (algorithm, content, passphrase) => {
  const iv = Buffer.alloc(16, 0);
  const key = crypto.scryptSync(passphrase, 'GfG', 24);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let cipherText = '';

  cipher.on('readable', () => {
    let chunk;
    while (null !== (chunk = cipher.read())) {
      cipherText += chunk.toString('base64');
    }
  });

  cipher.write(content);
  cipher.end();

  return {
    cipherText,
    iv: iv.toString(),
  };
};

/**
 * Decrypts a message.
 * @param algorithm cipher to be used (AES-192-CBC)
 * @param cipherText encrypted text
 * @param passphrase raw passphrase
 * @param iv initialization vector
 * @returns decrypted text
 */
export const decryptMessage = (algorithm, cipherText, passphrase, iv) => {
  const key = crypto.scryptSync(passphrase, 'GfG', 24);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decryptedText = decipher.update(
    Buffer.from(cipherText, 'base64').toString('hex'),
    'hex',
    'utf-8',
  );
  decryptedText += decipher.final('utf-8');

  return decryptedText;
};
