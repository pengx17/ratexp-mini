import { ComponentClass } from 'react';
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import { State } from '../../reducers/auth';
import { initUserInfo } from '../../actions/auth';
import { kuo, allowedUsers } from '../../constants/auth';

import styles from './index.module.css';
import { AtButton, AtAvatar, AtMessage } from 'taro-ui';

type PageStateProps = State;

type PageDispatchProps = {
  initUserInfo: (userInfo: any) => any;
};

type PageOwnProps = {};

type PageState = {
  initialized: boolean;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ auth }) => auth,
  dispatch => ({
    initUserInfo(userInfo: any) {
      dispatch(initUserInfo(userInfo));
    },
  })
)
class Index extends Component<IProps, PageState> {
  state = { initialized: false };

  config: Config = {
    navigationBarTitleText: '廓廓老公真争气',
  };

  componentDidMount() {
    // 登录，确认用户没毛病。
    this.refreshAuthSetting();
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  render() {
    return (
      <View className={styles.container}>
        {this.state.initialized && (
          <View>
            <AtMessage />
            {this.props.userInfo && (
              <View className={styles.content}>
                <AtAvatar
                  circle
                  size="large"
                  image={this.props.userInfo.avatarUrl}
                />
                <Text className={styles.nickName}>
                  {this.props.userInfo.nickName}
                </Text>
              </View>
            )}
            {!this.props.userInfo && (
              <AtButton
                type="primary"
                openType="getUserInfo"
                onGetUserInfo={params =>
                  this.onGetUserInfo(params.detail.userInfo)
                }
              >
                Make XP great again
              </AtButton>
            )}
          </View>
        )}
      </View>
    );
  }

  async refreshAuthSetting() {
    Taro.showLoading({ title: '加载中', mask: true });
    try {
      const [login, session] = [await Taro.login(), await Taro.checkSession()];
      console.log(login, session);
      const { authSetting } = await Taro.getSetting();

      if (authSetting && authSetting['scope.userInfo']) {
        const { userInfo } = await Taro.getUserInfo();
        this.onGetUserInfo(userInfo);
      }
    } catch (err) {
      console.error(err);
    }

    this.setState({ initialized: true });
    Taro.hideLoading();
  }

  checkUserValid() {
    return (
      this.props.userInfo && allowedUsers.includes(this.props.userInfo.nickName)
    );
  }

  onGetUserInfo = (userInfo: any) => {
    this.props.initUserInfo(userInfo);

    if (kuo.includes(userInfo.nickName)) {
      Taro.atMessage({
        message: '欢迎老婆大人！',
        type: 'success',
      });
    } else if (userInfo.nickName === 'xp') {
      Taro.atMessage({
        message: '💩💩💩',
        type: 'warning',
      });
    }
  };
}

export default Index as ComponentClass<PageOwnProps, PageState>;
