const { json } = require('express');
const fetch = require('node-fetch');
const User = require("../models/user");

module.exports =  (app) => {

    app.post('/apostar', (req, res) => {

        const { apuesta, numero } = req.body;
        const user = req.user;

        console.log('USER ---------------> ' + user.saldo);

        let numAleatorio = Math.floor(Math.random() * 100) + 1;
        console.log('ALEATORIO ---------->' + numAleatorio);

        if (parseInt(apuesta) > parseInt(user.saldo)) {
            return res
                .status(200)
                .json({"msg": "No tienes suficiente saldo.", "redirect":true,"redirect_url":"http://localhost:3000/profile"});
        }

        if (parseInt(numero) === numAleatorio) {
            User.findOne({"email": user.email}, (err, user) => {
                if (err) throw err;
                user.saldo = parseInt(user.saldo) + parseInt(apuesta);
                user.save();
            });

            return res
                .status(200)
                .json({"msg": `Resultado: ${numAleatorio}.¡¡Felicidades acertaste!!`, "redirect":true,"redirect_url":"http://localhost:3000/profile"});
        } else {
            User.findOne({"email": user.email}, (err, user) => {
                if (err) throw err;
                user.saldo = parseInt(user.saldo) - parseInt(apuesta);
                user.save();
            });

            return res
                .status(200)
                .json({"msg": `Resultado: ${numAleatorio}. No acertaste`, "redirect":true,"redirect_url":"http://localhost:3000/profile"});
        }
    });

};