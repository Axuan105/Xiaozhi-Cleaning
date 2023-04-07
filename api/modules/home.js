import http from '@/api'

// 获取轮播图
export const reqGetSwiper = () => http.get('/mini/min/picture')

// 获取列表
export const reqGetDate = (cid) => http.get(`/mini/min/getdata?cid=${cid}`)

// 获取列表2
export const reqGetDate2 = (cid) => http.get(`/mini/min/getdata`)

// 获取分类
export const reqGetgetlm = () => http.get('/mini/min/getlm')

// 搜索
export const reqGetSearch = (data) => http.post('/mini/min/sousuo', data)

// 热门搜索
export const reqGetHotSearch = () => http.get('/mini/min/rcfl')
