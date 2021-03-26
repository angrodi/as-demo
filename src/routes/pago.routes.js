const { json } = require('express');
const fetch = require('node-fetch');
const User = require("../models/user");

module.exports =  (app) => {

    app.post('/pago', (req, res) => {

        const { email, token } = req.body;

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
                "authorization": "Bearer sk_test_47172857dd1a28e3"
            },
            body: JSON.stringify(_data)
        }

        fetch('https://api.culqi.com/v2/charges', options)
            .then(res => res.json())
            .then(json => {
                User.findOne({"email": email}, (err, user) => {
                    if (err) throw err;
                    user.saldo = user.saldo + 50;
                    user.save().then(() => {
                        return res
                            .status(200)
                            .json({"redirect":true,"redirect_url":"http://localhost:3000/profile"});
                    })
                });
            });

    });

};