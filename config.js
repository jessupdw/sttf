module.exports = {

    "name": "S.T.T.F",
    "version": "0.0.1",
    "listen": process.env.VCAP_APP_PORT || 3000,

    "mongo": {
        "uri": "mongodb://localhost/STTF"
    }

};
