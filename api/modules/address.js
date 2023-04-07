import http from '@/api'

// 获取地址列表
export const reqgetdzList = () => http.post('/mini/abc/getdz')

//根据id查找地址
export const reqgetdz = (data) => http.post('/mini/abc/getdzz', data)

// 添加地址
export const reqGetAddress = (data) => http.post('/mini/abc/adddz', data)

// 修改地址
export const reqPutAddress = (data) => http.put('/mini/abc/putdz', data)

//删除地址
export const reqDeleteAddress = (id) => http.delete(`/mini/abc/deldz/${id}`)
