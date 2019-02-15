import { connect } from '@tarojs/redux';
import Taro, { Component } from '@tarojs/taro';
import { ComponentClass } from 'react';
import { AtCard } from 'taro-ui';

type PageStateProps = { userInfo: Taro.getUserInfo.PromisedPropUserInfo };

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ auth }) => auth,
  _dispatch => ({})
)
class Rate extends Component<IProps, PageState> {
  state = {};

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  render() {
    return (
      <AtCard note="小Tips" extra="额外信息" title="这是个标题">
        这也是内容区 可以随意定义功能
      </AtCard>
    );
  }
}

export default Rate as ComponentClass<PageOwnProps, PageState>;
