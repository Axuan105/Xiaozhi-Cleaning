import http from '@/api'

// 获取商品详情
export const reqShopDetails = (data) => http.post(`/mini/min/getxq`, data)

// 提交订单
export const reqShopOrder = (data) => http.post('/mini/abc/adddd', data)

// 获取规格
export const reqShopSpecs = (cid) => http.get(`/mini/abc/getgg?cid=${cid}`)

//支付
export const reqZfjk = (data) =>http.put(`/mini/abc/zfjk`, data)

//获取订单列表
export const ApiShopOrder = () => http.get('/mini/abc/getdd')

// 获取订单详情
export const ApiShopDetail = (id) => http.get(`/mini/abc/getddxq?id=${id}`)