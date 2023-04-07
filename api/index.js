// 导入request对象 做基础配置
import { $http } from '@/utils/request.js'

// 配置默认请求地址
$http.baseUrl = 'http://192.168.43.95:4090'

// 配置请求前拦截器
$http.beforeRequest = function(req) {
	req.header.Authorization = 'Bearer ' + uni.getStorageSync('TOKEN') || ''
	console.log('---发起了请求---');
}

// 配置请求后处理器
$http.afterRequest = function() {
	// 每次请求完毕关闭加载效果
	// uni.hideLoading()
}	

// 导出配置好的请求对象
export default $http