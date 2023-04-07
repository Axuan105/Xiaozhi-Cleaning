"use strict";
require("../index.js");
const utils_request = require("../../utils/request.js");
const reqUserRegister = (data) => utils_request.$http.post("/mini/mii/zhuce", data);
const reqUserLogin = (data) => utils_request.$http.post("/mini/mii/login", data);
const reqUserGethy = (data) => utils_request.$http.post("/mini/abc/gethy", data);
exports.reqUserGethy = reqUserGethy;
exports.reqUserLogin = reqUserLogin;
exports.reqUserRegister = reqUserRegister;
