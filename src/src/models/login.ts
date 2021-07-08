import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

import { TLoginViewModel, userLoginAsync, userLogout } from "@/modeltypes/LoginModel"
import { ResponseBodyEnum } from '@/modeltypes/ResponseModel';
import { UserRoleEnum } from '@/modeltypes/UserModel';
//import {consoleLog} from '@/utils/logger';

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

      //consoleLog(new Error(), JSON.stringify(payload));

      const response = yield call(userLoginAsync, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
    },

    logout() {
      userLogout();
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
      payload.data != null ? setAuthority(payload.data.currentAuthority) : setAuthority(UserRoleEnum.None);
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
