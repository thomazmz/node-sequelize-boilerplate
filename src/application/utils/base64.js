const base64 = require('base-64');
const utf8 = require('utf8');

module.exports = {

    encodeJson: (value) => {
        const bytes = utf8.encode(value);
        const encoded = base64.encode(bytes);
        return encoded;
    },

    decodeJson: (value) => {
        const bytes = base64.decode(value);
        const decoded = utf8.decode(bytes);
        return decoded;
    }

}