---
title: 'Encryption / Password Hashing'
description: 'A way to securely encrypt passwords'
prefix: '[Snippet]'
---

# Encryption / Password Hashing

The following method requires a library called `sjcl`, You can install it by running `npm install sjcl` in your terminal.

## Snippet

### Encryption

```js
import sjcl from 'sjcl';

/**
 * Hash a password with pbkdf2
 * @param {string} password
 * @returns {string} A password hash.
 */
export function encryptPassword(password) {
    const saltBits = sjcl.random.randomWords(2, 0);
    const salt = sjcl.codec.base64.fromBits(saltBits);
    const key = sjcl.codec.base64.fromBits(sjcl.misc.pbkdf2(password, saltBits, 2000, 256));
    return `${key}$${salt}`;
}
```

### Verification

```js
import sjcl from 'sjcl';

/**
 * Verify a password matches with pbkdf2.
 * @param {string} password
 * @param {string} storedPasswordHash
 * @returns {bool} true if correct password
 */
export function verifyPassword(password, storedPasswordHash) {
    const [_key, _salt] = storedPasswordHash.split('$');
    const saltBits = sjcl.codec.base64.toBits(_salt);
    const derivedKey = sjcl.misc.pbkdf2(password, saltBits, 2000, 256);
    const derivedBaseKey = sjcl.codec.base64.fromBits(derivedKey);

    if (_key != derivedBaseKey) {
        return false;
    }

    return true;
}
```

## Example Usage

Serverside

```js
const hash = encryptPassword('test');
const isCorrectPassword = verifyPassword('test', hash);

if (isCorrectPassword) {
    console.log(`That was a correct password.`);
}
```