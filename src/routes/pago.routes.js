const fetch = require('node-fetch');
const User = require("../models/user");

module.exports =  (app) => {

    app.post('/pago', (req, res) => {

        const { email, token } = req.body;

        console.log(email);

        const _data = {
            "amount": 5000,
            "currency_code": "PEN",
            "email": email,
            "source_id": token
        }

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": "Bearer sk_test_ed5da332c3d268d0"
            },
            body: JSON.stringify(_data)
        }

        fetch('https://api.culqi.com/v2/charges', options)
            .then(res => res.json())
            .then(json => {
                
            });

    });

};