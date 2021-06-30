import { fakeAccountLogin } from '@/services/services.login';
import { TResponseBody,ResponseBodyEnum } from './ResponseModel';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';
import { history } from 'umi';
import { UserRoleEnum } from './UserModel';

export type TLoginParams = {
    userName?: string;
    password?: string;
};

export type TLoginState = {
    // status property for show message component of the page.
    userName?: string;
    token?: string;
    currentAuthority?: UserRoleEnum;
};

export type TLoginViewModel = TResponseBody<TLoginState>;

export async function userLoginAync(loginParams: TLoginParams): Promise<TLoginViewModel | null> {
    let response:TLoginViewModel = await fakeAccountLogin(loginParams);

    console.log(JSON.stringify(response));
    // Login successfully
    console.log(response.status.toString());
    console.log(ResponseBodyEnum.Ok.toString());

    if (response.status.toUpperCase() === ResponseBodyEnum.Ok.toUpperCase()) {
        
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
            const redirectUrlParams = new URL(redirect);
            if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (window.routerBase !== '/') {
                redirect = redirect.replace(window.routerBase, '/');
            }
            if (redirect.match(/^\/.*#/)) {
                redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
            } else {
            window.location.href = '/';
            return response;
            }
        }
        history.replace(redirect || '/');
    }

    return response;
}

