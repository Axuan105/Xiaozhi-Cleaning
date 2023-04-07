"use strict";
const common_vendor = require("../common/vendor.js");
const utils_request = require("../utils/request.js");
utils_request.$http.baseUrl = "http://192.168.43.95:4090";
utils_request.$http.beforeRequest = function(req) {
  req.header.Authorization = "Bearer " + common_vendor.index.getStorageSync("TOKEN") || "";
  console.log("---发起了请求---");
};
utils_request.$http.afterRequest = function() {
};
