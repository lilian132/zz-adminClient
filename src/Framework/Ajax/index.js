import { default as ajax } from './core/ajax';

export const init = ajax.init;
export const get = ajax.get;
export const post = ajax.post;
export const extend = ajax.extend;
export const cancelAjax = ajax.cancelAjax;
export const encryptUrl = ajax.encryptUrl;
export default ajax;