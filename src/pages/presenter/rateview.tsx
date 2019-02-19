import { Image, View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import {
  AtActivityIndicator,
  AtAvatar,
  AtCard,
  AtDivider,
  AtTag,
} from 'taro-ui';
import { getRatings } from '../../cloud';
import RatingChart from '../../components/ratingchart';
import RatingSetCard from '../../components/ratingsetcard';
import { RatingSet } from '../../constants/rate';
import { getDateString } from '../../util';
import orangeImg from './orange.jpg';

interface State {
  ratingSetToday?: RatingSet;
  ratingSets?: RatingSet[];
  loading: boolean;
}

class RateView extends Component<
  {
    userInfo: Taro.getUserInfo.PromisedPropUserInfo;
  },
  State
> {
  static defaultProps = {
    userInfo: {},
  };

  state: State = {
    loading: true,
  };

  config: Taro.Config = {};

  async componentDidMount() {
    const data = await getRatings();
    const rsToday = (data as RatingSet[]).find(
      rs =>
        getDateString(rs.timestamp) === getDateString(new Date().toISOString())
    );

    this.setState({
      ratingSets: data,
      loading: false,
      ratingSetToday: rsToday,
    });
  }

  render() {
    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexFlow: 'column',
          height: '100%',
          width: '100%',
          position: 'relative',
        }}
      >
        <Image
          style={{ width: '360px', height: '200px', marginBottom: '24px' }}
          src={orangeImg}
        />
        {this.state.loading && <AtActivityIndicator content="加载中..." />}
        {!this.state.loading && !this.state.ratingSetToday && (
          <AtCard
            note={this.props.userInfo.nickName + ', 点击你的头像开始打分！'}
            title="又可以给xp打分啦！"
          >
            <View onClick={() => this.onCardClick('')}>
              <AtAvatar size="large" image={this.props.userInfo.avatarUrl} />
            </View>
          </AtCard>
        )}
        {!this.state.loading && this.state.ratingSetToday && (
          <View>
            <View style={{ margin: '0 0 8px 8px' }}>
              <AtTag type="primary">本日已打分 ✅</AtTag>
            </View>
            <RatingSetCard
              ratingSet={this.state.ratingSetToday}
              onCardClick={() =>
                this.onCardClick(
                  this.state.ratingSetToday && this.state.ratingSetToday._id
                )
              }
            />
          </View>
        )}
        {this.state.ratingSets && (
          <View style={{ margin: '24px 12px 0 12px', alignSelf: 'stretch' }}>
            <AtDivider content="趋势" />
            <RatingChart ratingSets={this.state.ratingSets} />
          </View>
        )}
      </View>
    );
  }

  onCardClick = (id?: string) => {
    Taro.navigateTo({ url: `/pages/rate/rate?id=${id}` });
  };
}

export default RateView;
