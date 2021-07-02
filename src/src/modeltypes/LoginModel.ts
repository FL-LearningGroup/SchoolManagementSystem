import { history } from 'umi';

import { fakeAccountLogin } from '@/services/services.login';
import { TResponseBody,ResponseBodyEnum } from './ResponseModel';
import { getPageQuery } from '@/utils/utils';
import { UserRoleEnum } from './UserModel';
import { TTokenData, storageTokenData, checkTokenData, clearTokenData} from './TokenModel';

export type TLoginParams = {
    userName: string;
    password: string;
};

export type TLoginState = {
    // status property for show message component of the page.
    userName: string;
    token: string;
    createAt: string;
    expiredAt: string;
    currentAuthority: UserRoleEnum;
};

export type TLoginViewModel = TResponseBody<TLoginState>;

/*
1.login.
2. login successfull.
   2.1 storage login info.
   2.2 rediect to home page.
   2.3 return.
3. login failed.
   3.1 return.
*/

export async function userLoginAsync(loginParams: TLoginParams): Promise<TLoginViewModel | null> {
    // Call service login API
    let response:TLoginViewModel = await fakeAccountLogin(loginParams);

    // Login successfull.
    if (response.status.toUpperCase() === ResponseBodyEnum.Ok.toUpperCase() && response.data != null) {
        
        // storage tokendata into localstorage.
        let tokenData: TTokenData = {
            user: loginParams.userName,
            password: loginParams.password,
            accessToken: response.data.token,
            createAt: response.data.createAt,
            expiredAt: response.data.expiredAt,
            role: response.data.currentAuthority,
        };

        // Important: Only support one user auto login.
        checkTokenData();
        storageTokenData(tokenData);

        // rediect to home page.
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
            }
        }
        history.replace(redirect || '/');

        // Function return
        return response;
    }
    // login failed and function return.
    return response;
}

/*
1. Remove value of localStorage by user
2. Function return
*/
/**
 * 
 * @returns void
 */

export function userLogout(): void
{
    // remove value of localStorage by user
    clearTokenData();
    return;
}

