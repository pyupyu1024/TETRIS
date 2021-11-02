const crypto = require('crypto');

const CHAR_ARRAY = 'ABCDEFGHIJKLMNOPQRSTUVWSYZ'
    + 'abcdefghijklmnopqrstuvwsyz0123456789_-';

module.exports = function(len = 10) {
    const bytes = crypto.randomBytes(len);
    for (var res = '', i = 0; i < len; i++)
        res += CHAR_ARRAY[bytes[i] % 0x40];
    return res;
};