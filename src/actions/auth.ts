import Taro from '@tarojs/taro';

import { Actions } from '../constants/auth';

export function initUserInfo(payload: Taro.getUserInfo.PromisedPropUserInfo) {
  return {
    type: Actions.InitUserInfo,
    payload,
  };
}
