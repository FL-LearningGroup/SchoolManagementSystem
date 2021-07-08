import type { Effect, Reducer } from 'umi';

import { queryUser, query as queryUsers } from '@/services/services.user';
import { TUser } from '@/modeltypes/UserModel';

export type TUserModelState = {
  currentUser?: TUser;
};

export type TUserViewModel = {
  namespace: 'user';
  state: TUserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<TUserModelState>;
    changeNotifyCount: Reducer<TUserModelState>;
  };
};

const UserModel: TUserViewModel = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent({ payload }, { call, put }) {
      console.log(new Error('Debug').message + '\n\n' + JSON.stringify(payload));
      const response = yield call(queryUser, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: undefined,
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;
