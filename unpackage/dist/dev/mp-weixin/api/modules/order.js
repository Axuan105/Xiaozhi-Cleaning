"use strict";
require("../index.js");
const utils_request = require("../../utils/request.js");
const reqShopDetails = (data) => utils_request.$http.post(`/mini/min/getxq`, data);
const reqShopOrder = (data) => utils_request.$http.post("/mini/abc/adddd", data);
const reqShopSpecs = (cid) => utils_request.$http.get(`/mini/abc/getgg?cid=${cid}`);
const reqZfjk = (data) => utils_request.$http.put(`/mini/abc/zfjk`, data);
const ApiShopOrder = () => utils_request.$http.get("/mini/abc/getdd");
const ApiShopDetail = (id) => utils_request.$http.get(`/mini/abc/getddxq?id=${id}`);
exports.ApiShopDetail = ApiShopDetail;
exports.ApiShopOrder = ApiShopOrder;
exports.reqShopDetails = reqShopDetails;
exports.reqShopOrder = reqShopOrder;
exports.reqShopSpecs = reqShopSpecs;
exports.reqZfjk = reqZfjk;
