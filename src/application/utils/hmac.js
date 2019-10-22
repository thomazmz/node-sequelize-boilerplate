const crypto = require('crypto');

module.exports = {
    encodeJson: (value, secret) => {
        crypto.createHmac('SHA256', secret).update(JSON.stringify(value)).digest('base64');
    }
}