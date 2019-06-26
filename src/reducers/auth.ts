import Taro from '@tarojs/taro';
import { Actions } from '../constants/auth';

import initUserInfo from '../actions/auth';

export interface State {
  userInfo: Taro.getUserInfo.PromisedPropUserInfo | undefined;
}

const INITIAL_STATE: State = {
  userInfo: undefined,
};

export default function auth(
  state = INITIAL_STATE,
  action: ReturnType<typeof initUserInfo>
): State {
  switch (action.type) {
    case Actions.InitUserInfo:
      return {
        ...state,
        userInfo: action.payload,
      };
    default:
      return state;
  }
}
