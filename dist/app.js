"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
app.use(function (req, res, next) {
    console.log(req.rawHeaders[1]);
    console.log("Logging Middleware");
    next();
});
app.get('/cats', function (req, res) {
    try {
        var cats = app_model_1.Cat;
        res.status(200).send({
            success: true,
            data: {
                cats: cats,
            },
        });
    }
    catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
});
app.use(function (req, res, next) {
    console.log("error middleware");
    res.send({ error: '404 NOT FOUND' });
});
app.listen(8000, function () {
    console.log("server is on port 8000");
});
//# sourceMappingURL=app.js.map