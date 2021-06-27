import request from '@/utils/request';
import  { TLoginParams } from '@/modeltypes/LoginModel'


export async function fakeAccountLogin(params: TLoginParams) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

