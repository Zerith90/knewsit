"use strict";

let config = require("../config");
let logger = require("../core/logger");

let crypto = require("crypto");
let async = require("async");

let passport = require("passport");
let express = require("express");

let mailer = require("../libs/mailer");
let User = require("../models/user");
let Response = require("../core/response");

let t1 = require("terminalone")


module.exports = function(app, db) {

    let authRouter = express.Router();

    authRouter.post("/local", function(req, res, next) {

        console.log(req.body)

        let t1config = {
            'user': req.body.user,
            'password': req.body.password,
            'api_key': config.t1API.api_key
        };
        let connection = new t1.T1Connection(t1config);

        /*** ADD COOKIE TO BROWSER ***/


        connection.ensureAuthenticated().then((results) => {
                if (connection.cookieAuthed) {
                    console.log(connection)
                    req.user = req.user || {}
                    req.user.t1conn = connection
                    res.send({auth:true})
                } else {
                    console.log(connection)
                    res.send({
                        auth:false,
                        message:"Authentication Failed. Please try again."})
                }
            }).catch((err) => {
                console.log("error", err)
            })


    });


    // Add router to app
    app.use("/auth", authRouter);
};