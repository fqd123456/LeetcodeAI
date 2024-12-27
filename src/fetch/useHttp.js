const fetch = $fetch.create({
  onRequest({ options, request }) {
    options.headers = options.headers || {};
   
    const contentType = options.headers.get('Content-Type');
    // 继续进行其他操作
    if (contentType === 'application/x-www-form-urlencoded; charset=UTF-8') {
      options.body = Object.keys(options.body)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(options.body[key]))
        .join('&');
    }
    if (request.includes('uploadr2byfileurl')) {
      options.credentials = 'omit'; // 关闭请求中的凭据发送
    }
  },
  onResponse({ response }) {
    const { url, status, _data } = response;
    console.log("相应拦截")
    if (status !== 200) {
      return Promise.reject(_data);
    }

    if (url.includes('emaillogin') || url.includes('emailsignup') || url.includes('user/status')) {
      if (_data.ok !== 0) {
        return Promise.reject(_data);
      }
    }


    // 如果——data是json，则返回json
    if (typeof _data === 'string' && _data.startsWith('{')) {
      // return JSON.parse(_data);
      return Promise.resolve(JSON.parse(_data));
    } else {
      return Promise.resolve(_data);
    }
  },
});

export default useHttp = {
  get: (url, params, headers) => {
    return fetch(url, { method: 'get', params, headers });
  },

  post: (url, body, headers, params) => {
    if (params) {
      return fetch(url, { method: 'post', body, headers, params: params ? params : undefined });
    } else {
      return fetch(url, { method: 'post', body, headers });
    }
  },

  put: (url, body, headers) => {
    return fetch(url, { method: 'put', body, headers });
  },
  delete: (url, body, headers) => {
    return fetch(url, { method: 'delete', body, headers });
  },
};
