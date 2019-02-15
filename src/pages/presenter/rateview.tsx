import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { AtAvatar, AtCard } from 'taro-ui';

class RateView extends Component<{
  userInfo: Taro.getUserInfo.PromisedPropUserInfo;
}> {
  config: Taro.Config = {};

  render() {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexFlow: 'column',
          height: '100%',
        }}
      >
        <AtCard
          note={this.props.userInfo.nickName + ', 点击你的头像开始打分！'}
          title="本月又可以给xp打分啦！"
        >
          <View onClick={() => Taro.navigateTo({ url: '/pages/rate/rate' })}>
            <AtAvatar size="large" image={this.props.userInfo.avatarUrl} />
          </View>
        </AtCard>
      </View>
    );
  }
}

export default RateView;
