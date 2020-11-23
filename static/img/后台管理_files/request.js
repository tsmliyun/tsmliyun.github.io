// create an axios instance/
//var baseURL='https://api.sunnycare.com/';
//var baseURL='http://blw.api.izhuodao.com/';
var baseURL='http://local.api.booking.com/';
var service = axios.create({
  baseURL: baseURL,
 //  baseURL: 'http://local.api.booking.com/',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
//
//    if (store.getters.token) {
//      // let each request carry token
//      // ['X-Token'] is a custom headers key
//      // please modify it according to the actual situation
     config.headers['access-token'] = '5503da9a360d48c39ffbf3c82821065b'
//    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.status !== 0) {
    	message('系统', res.msg, true);
    	return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
      switch (error.response.status) {
        case 400:
            error.message = '请求错误'
          break

        case 401:
            error.message = '未授权，请登录'
          break

        case 403:
            error.message = '拒绝访问'
          break
      }
      message('系统',error.message, true);
      return Promise.reject(error)
  }
)
