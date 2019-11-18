import { getError, getLend, getReg } from './api';


export async function getErrorData() {
  let data = await getError({date: -1});
  data = errorDataProcess(data);
  return data;
};

function errorDataProcess(data) {
  if (!data) {
    return null;
  }
  const d = data;  
  return {
    stateData: d,
  }
}