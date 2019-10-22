const base64 = require('base-64');
const utf8 = require('utf8');

module.exports = {

    encodeJson: (value) => {
        const string = JSON.stringify(value);
        const bytes = utf8.encode(string);
        const encoded = base64.encode(bytes);
        return encoded;
    },

    decodeJson: (value) => {
        const bytes = base64.decode(value);
        const string = utf8.decode(bytes);
        const decoded = JSON.parse(string);
        return decoded;
    }

}