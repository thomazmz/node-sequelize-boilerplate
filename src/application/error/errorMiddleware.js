const RequestError = require('./RequestError');

module.exports = (err, req, res, next) => {
    if (err instanceof RequestError)  {
        res.status(err.status).send(err.asJson());
    } else {
        if (err instanceof Error) { 
            console.error(err.stack); 
        } else {
            console.log(err);
        }
        res.status(500).send('Internal Server Error');
    }
}