import axios from 'axios'
import utils from 'axios/lib/utils.js'
import normalizeHeaderName from 'axios/lib/helpers/normalizeHeaderName';

function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
    }
}

const axiosInstance = axios.create({
    baseURL: 'https://api.punkapi.com/v2/',
    headers: {
        common: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    },
});
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.removeTags = (html) => {
    if(typeof html === 'string')
        return html.replace(/<\/?[^>]+(>|$)/g, "");
    else
        return html;
}

function sanitizeMaster(data) {
    if(utils.isFormData(data)) {
        var newData = new FormData();
        for (var key of data.keys()) {
            if(!newData.has(key)) {
                // eslint-disable-next-line
                data.getAll(key).forEach(element => {
                    newData.append(key, window.removeTags(element));
                });
            }
        }
        return newData;
    }
    if (utils.isObject(data)) {
        return iterateAndSanitize(data);
    }

}

function iterateAndSanitize(obj) {
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            // eslint-disable-next-line
            if (typeof obj[property] == "object")
                obj[property] = iterateAndSanitize(obj[property]);
            else
                obj[property] = window.removeTags(obj[property]);
        }
    }
    return obj;
}

axiosInstance.interceptors.request.use((config) => {
    
    config.transformRequest = [
        (data, headers) => {

            data = sanitizeMaster(data);

            normalizeHeaderName(headers, 'Content-Type');
            if (utils.isFormData(data) ||
                utils.isArrayBuffer(data) ||
                utils.isStream(data) ||
                utils.isFile(data) ||
                utils.isBlob(data)
            ) {
                return data;
            }
            if (utils.isArrayBufferView(data)) {
                return data.buffer;
            }
            if (utils.isURLSearchParams(data)) {
                setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
                return data.toS1tring();
            }
            if (utils.isObject(data)) {
                setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
                return JSON.stringify(data);
            }
            return data;
        },
    ];
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        return Promise.reject(error);
    } else {
        return Promise.reject('Something went wrong, Please try again.');
    }
    
});

export default axiosInstance;
