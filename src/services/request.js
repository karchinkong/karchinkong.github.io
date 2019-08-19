import fetch from 'dva/fetch';
import { notification } from 'antd';
import { API_PREFIX, HTTP_ERROR_STATUS } from '@/constances/common';


/**
 * 判断当前状态码是否大于200小于300 若不是则抛出错误
 *
 * @param response
 * @returns {*}
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

const parseQuery = (obj) => {
    let str = '';
    for (let key in obj) {
        const value = typeof obj[key] !== 'string' ? JSON.stringify(obj[key]) : obj[key];
        str += '&' + key + '=' + value;
    }
    return str.substr(1);
};

const checkSuccess = (data) => {
    if ((Array.isArray(data) && data.length > 0) || (!Array.isArray(data) && Object.keys(data).length > 0)) {
        return data;
    } else {
        const error = new Error(data.msg);
        error.response = data;
        throw error;
    }
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param method
 * @param data
 * @return {object}           An object containing either "data" or "err"
 */
const request = (url, method = 'get', data) => {

    const baseUrl = process.env.NODE_ENV === 'development' ? API_PREFIX : API_PREFIX;

    let options = {
        method: method,   // HTTP请求方法，默认为GET
        headers: {        // HTTP的请求头，默认为{}
            'Content-Type': 'application/json',
        }
    };

    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        options.headers['Authorization'] = JSON.parse(userInfo).token;
    }

    method === 'get' ? url += '?' + parseQuery(data) : options.body = JSON.stringify(data);

    return fetch(baseUrl + url, options)
        .then(checkStatus)
        .then(response => response.json())
        .then(checkSuccess)
        .then(data)
        .catch((err) => {
            notification.error({
                message: '请求错误',
                description: HTTP_ERROR_STATUS[err.response.status],
                duration: 2
            });
        });
};

export default {
    get(url, data) {
        return request(url, 'get', data);
    },
    post(url, data) {
        return request(url, 'post', data);
    },
};