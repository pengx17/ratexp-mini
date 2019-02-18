import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { AtActivityIndicator, AtDivider, AtIcon } from 'taro-ui';
import { getRatings } from '../../cloud';
import RatingSetCard from '../../components/ratingsetcard';
import { RatingSet } from '../../constants/rate';
import { groupRatingSetsByMonth } from '../../util';

interface State {
  ratingSets?: RatingSet[];
}

class RatingList extends Component<{}, State> {
  config: Taro.Config = {};
  state: State = {};

  async componentDidMount() {
    const data = await getRatings();
    this.setState({ ratingSets: data });
  }

  render() {
    const ratingSetsByMonth = groupRatingSetsByMonth(
      this.state.ratingSets || []
    );
    return (
      <View>
        {!this.state.ratingSets && (
          <AtActivityIndicator mode="center" content="加载中..." />
        )}
        {this.state.ratingSets &&
          ratingSetsByMonth.map(byMonth => {
            return (
              <View key={byMonth.month}>
                <AtDivider content={byMonth.month} />
                {byMonth.ratingSets.map(rs => (
                  <View key={rs.timestamp} style={{ margin: '10px 0' }}>
                    <RatingSetCard
                      ratingSet={rs}
                      onCardClick={this.onCardClick}
                    />
                  </View>
                ))}
              </View>
            );
          })}
        <AtDivider>
          <AtIcon value="check-circle" />
        </AtDivider>
      </View>
    );
  }

  onCardClick = (id: string) => {
    Taro.navigateTo({ url: `/pages/rate/rate?id=${id}` });
  };
}

export default RatingList;
