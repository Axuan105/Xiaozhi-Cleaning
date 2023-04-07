"use strict";
require("../index.js");
const utils_request = require("../../utils/request.js");
const reqGetComment = (cid, page) => utils_request.$http.get(`/mini/min/getpj?cid=${cid}&page=${page}`);
const reqGetAddComment = (data) => utils_request.$http.post("/mini/abc/addpj", data);
exports.reqGetAddComment = reqGetAddComment;
exports.reqGetComment = reqGetComment;
