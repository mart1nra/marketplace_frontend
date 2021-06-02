//import Cookies from 'js-cookie';
import axios from 'axios';

//const token = Cookies.get('id_token');
//const authorization_prefix = 'Bearer ';

export const customHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
    //Authorization: authorization_prefix + token || undefined
};

export const baseUrl = 'http://localhost:3000';
export const frontendUrl = 'http://localhost:8000';
export const apiEndpoint = `${baseUrl}/api/v2/storefront`

export default axios.create({
    baseUrl,
    headers: customHeaders
});

export const serializeQuery = query => {
    return Object.keys(query)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
};
