import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { fakeAccountLogin } from '@/services/services.login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

import { TLoginViewModel, userLoginAync } from "@/modeltypes/LoginModel"
import { ResponseBodyEnum } from '@/modeltypes/ResponseModel';
import { UserRoleEnum } from '@/modeltypes/UserModel';


export type TLoing = {
  namespace: string;
  state: TLoginViewModel | null;
  effects: {
    login: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<TLoginViewModel>;
  };
};

const Model: TLoing = {
  namespace: 'login',

  state: {
    status: ResponseBodyEnum.Ok,
    message: "",
    data: null
  },

  effects: {
    // Two method successfull login: U/P, Token
    *login({ payload }, { call, put }) {
      const response = yield call(userLoginAync, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      payload.data != null ? setAuthority(payload.currentAuthority) : setAuthority(UserRoleEnum.None);
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
