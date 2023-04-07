import http from '@/api'

// 获取评论列表
export const reqGetComment = (cid, page) => http.get(`/mini/min/getpj?cid=${cid}&page=${page}`)

// 提交评论
export const reqGetAddComment = (data) => http.post('/mini/abc/addpj', data)