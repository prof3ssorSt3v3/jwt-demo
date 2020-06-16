//generate a secret key to use with our JWT token for signing purposes

const key = [...Array(30)]
  .map((n) => ((Math.random() * 36) | 0).toString(36))
  .join('');

// 30 characters long, base36 encoded
console.log(key);
