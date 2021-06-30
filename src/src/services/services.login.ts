import request from '@/utils/request';
import  { TLoginParams, TLoginViewModel } from '@/modeltypes/LoginModel'


export async function fakeAccountLogin(params: TLoginParams): Promise<TLoginViewModel>{
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

