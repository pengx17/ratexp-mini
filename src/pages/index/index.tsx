import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Taro, { Component } from '@tarojs/taro';
import { AtButton, AtMessage } from 'taro-ui';
import initUserInfo from '../../actions/auth';
import { allowedUsers } from '../../constants/auth';
import { State } from '../../reducers/auth';
import styles from './index.module.css';

type PageStateProps = State;

type PageDispatchProps = {
  onInitUserInfo: (userInfo: any) => any;
};

type PageOwnProps = {};

type PageState = {
  initialized: boolean;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ auth }) => auth,
  dispatch => ({
    onInitUserInfo(userInfo: any) {
      dispatch(initUserInfo(userInfo));
    },
  })
)
class Index extends Component<IProps, PageState> {
  config: Taro.Config = {
    disableScroll: true,
  };

  state = { initialized: false };

  componentDidMount() {
    // 登录，确认用户没毛病。
    this.refreshAuthSetting();
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  render() {
    return (
      <View>
        <AtMessage />
        {this.state.initialized && (
          <View className={styles.container}>
            <View>
              {!this.props.userInfo && (
                <AtButton
                  type="secondary"
                  circle
                  className={styles.button}
                  openType="getUserInfo"
                  onGetUserInfo={this.onGetUserInfo}
                >
                  <View style={{ display: 'flex', alignItems: 'center' }}>
                    <View style={{ marginRight: '4px' }}>登录</View>
                    <View className="icons8-wechat" />
                  </View>
                </AtButton>
              )}
            </View>
            )
          </View>
        )}
      </View>
    );
  }

  async refreshAuthSetting() {
    try {
      const [login, session] = [await Taro.login(), await Taro.checkSession()];
      console.log(login, session);
      const { authSetting } = await Taro.getSetting();

      if (authSetting && authSetting['scope.userInfo']) {
        const { userInfo } = await Taro.getUserInfo();
        this.setUserInfo(userInfo);
        return;
      }
    } catch (err) {
      console.error(err);
    }

    this.setState({ initialized: true });
  }

  checkUserValid() {
    return (
      this.props.userInfo && allowedUsers.includes(this.props.userInfo.nickName)
    );
  }

  setUserInfo = (
    userInfo: Taro.getUserInfo.PromisedPropUserInfo | undefined
  ) => {
    if (!userInfo) {
      Taro.atMessage({
        message: '必须授权后才可使用',
        type: 'error',
      });
      return;
    }

    this.props.onInitUserInfo(userInfo);

    if (!allowedUsers.includes(userInfo.nickName)) {
      Taro.atMessage({
        message: '你是谁，怎么进来的！',
        type: 'error',
      });

      // 目前只给xp和gk用
      return;
    }

    setTimeout(() => {
      Taro.redirectTo({ url: '/pages/presenter/presenter' });
    }, 1000);
  };

  onGetUserInfo = (event: any) => {
    console.log(event);
    this.setUserInfo(event.detail.userInfo);
  };
}

export default Index;
