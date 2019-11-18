/* eslint-disable */
import ajax from '@/Framework/Ajax';

export const getError = params => ajax.post({
  url: `${config.BASE_URL}/error`,
  data: params,
});

export const getLend = params => ajax.post({
  url: `${config.BASE_URL}/lend`,
  data: params,
});

export const getReg = params => ajax.post({
  url: `${config.BASE_URL}/reg`,
  data: params,
});
