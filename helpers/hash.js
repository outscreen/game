const crypto = require('crypto');
const secret = process.env.crypto || 'batman is on the way';

const hash = (string) => crypto.createHmac('sha256', secret)
    .update(string)
    .digest('hex');

module.exports = hash;