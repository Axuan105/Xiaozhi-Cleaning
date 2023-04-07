import http from '@/api'

// 注册
export const reqUserRegister = data => http.post('/mini/mii/zhuce',data)


// 登录
export const reqUserLogin = data => http.post('/mini/mii/login',data)

// 获取用户信息
export const reqUserGethy = data => http.post('/mini/abc/gethy',data)
// http://localhost:4090/mini/mii/gethy