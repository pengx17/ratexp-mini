import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Taro, { Component } from '@tarojs/taro';
import { ComponentClass } from 'react';
import { dimensions } from '../../constants/rate';
import RateControl from './ratecontrol';
import { AtTextarea, AtCard, AtDivider, AtButton } from 'taro-ui';

type PageStateProps = { userInfo: Taro.getUserInfo.PromisedPropUserInfo };

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  ratings: { [key: string]: number };
  comments: string;

  toastMessage?: string;
};

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(
  ({ auth }) => auth,
  _dispatch => ({})
)
class Rate extends Component<IProps, PageState> {
  config: Taro.Config = {};

  state: PageState = {
    ratings: {},
    comments: '',
  };

  onRatingsChange = (ratingId: string, score: number) => {
    this.setState({ ratings: { ...this.state.ratings, [ratingId]: score } });
  };

  componentDidMount() {}

  onMessageChange = e => {
    this.setState({ comments: e.detail.value });
  };

  onSubmit = () => {
    const payload = {
      comments: this.state.comments,
      ratings: this.state.ratings,
    };
    this.setState({ toastMessage: JSON.stringify(payload, null, 2) });
  };

  render() {
    const total = 2 * dimensions.length;
    const score = Object.values(this.state.ratings).reduce(
      (accum, val) => accum + val,
      0
    );
    const scored = Object.values(this.state.ratings).filter(s => s !== null)
      .length;

    return (
      <View style={{ margin: '12px 0' }}>
        <AtCard title="为本月的XP打分！" extra={`${score} / ${total}`}>
          {dimensions.map(dimension => (
            <View key={dimension.id} style={{ margin: '12px 0' }}>
              <RateControl
                dimention={dimension}
                value={this.state.ratings[dimension.id]}
                onChange={value => this.onRatingsChange(dimension.id, value)}
              />
            </View>
          ))}

          <AtDivider content="留下宝贵的意见" />

          <AtTextarea
            value={this.state.comments}
            onChange={this.onMessageChange}
          />

          <View style={{ marginTop: '12px' }}>
            <AtButton
              onClick={this.onSubmit}
              disabled={scored !== dimensions.length}
              type="primary"
            >
              提交！
            </AtButton>
          </View>
        </AtCard>
      </View>
    );
  }
}

export default Rate as ComponentClass<PageOwnProps, PageState>;
