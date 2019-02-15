import { ScrollView, View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Taro, { Component } from '@tarojs/taro';
import { ComponentClass } from 'react';
import { AtTabBar } from 'taro-ui';
import styles from './presenter.module.css';
import RateView from './rateview';
import RatingList from './ratinglist';

type PageStateProps = { userInfo: Taro.getUserInfo.PromisedPropUserInfo };

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  tabIndex: number;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ auth }) => auth,
  _dispatch => ({})
)
class Presenter extends Component<IProps, PageState> {
  config: Taro.Config = {
    disableScroll: true,
  };

  state = { tabIndex: 0 };

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  handleClick(tabIndex: number) {
    this.setState({ tabIndex });
  }

  render() {
    return (
      <View className={styles.presenterWrapper}>
        <View className={styles.viewWrapper}>
          <ScrollView scrollY className={styles.viewContainer}>
            {this.state.tabIndex === 0 && (
              <RateView userInfo={this.props.userInfo} />
            )}
            {this.state.tabIndex === 1 && <RatingList />}
          </ScrollView>
        </View>

        <View className={styles.navTabWrapper}>
          <AtTabBar
            tabList={[
              { title: '打分', iconType: 'heart' },
              { title: '往期', iconType: 'bullet-list' },
            ]}
            onClick={this.handleClick.bind(this)}
            current={this.state.tabIndex}
          />
        </View>
      </View>
    );
  }
}

export default Presenter as ComponentClass<PageOwnProps, PageState>;
