//import Cookies from 'js-cookie';
//import axios from 'axios';

export const state = () => ({
    baseUrl: 'http://localhost:3000',
    apiUrl:  'http://localhost:3000/api/v2/storefront'
});

//const token = Cookies.get('id_token');
//const authorization_prefix = 'Bearer ';

/*export const customHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
    //Authorization: authorization_prefix + token || undefined
};*/

/*export default axios.create({
    baseUrl,
    headers: customHeaders
});*/

/*export const serializeQuery = query => {
    return Object.keys(query)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
};*/
