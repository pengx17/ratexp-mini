import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import Taro, { Component } from '@tarojs/taro';
import { ComponentClass } from 'react';
import { AtButton, AtCard, AtDivider, AtTextarea } from 'taro-ui';
import { addRating } from '../../cloud';
import { dimensions, RatingSet } from '../../constants/rate';
import RateControl from './ratecontrol';

type PageStateProps = { userInfo: Taro.getUserInfo.PromisedPropUserInfo };

type PageDispatchProps = {};

type PageOwnProps = {};

type PageState = {
  ratings: { [key: string]: number };
  comments: string;
  submitting: boolean;
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
    submitting: false,
  };

  onRatingsChange = (ratingId: string, score: number) => {
    this.setState({ ratings: { ...this.state.ratings, [ratingId]: score } });
  };

  onMessageChange = e => {
    this.setState({ comments: e.detail.value });
  };

  onSubmit = async () => {
    const payload: RatingSet = {
      comments: this.state.comments,
      ratings: this.state.ratings,
      timestamp: new Date().toISOString(),
    };
    this.setState({ submitting: true });
    await addRating(payload);
    this.setState({ submitting: false });
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
      <View>
        <AtCard isFull title="为本月的XP打分！" extra={`${score} / ${total}`}>
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
              loading={this.state.submitting}
              disabled={scored !== dimensions.length || this.state.submitting}
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
