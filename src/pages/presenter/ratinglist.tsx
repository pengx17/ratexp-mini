import { View } from '@tarojs/components';
import { Component } from '@tarojs/taro';
import { AtActivityIndicator, AtCard, AtTag } from 'taro-ui';
import { getRatings } from '../../cloud';
import { dimensions, RatingSet, scoresMap } from '../../constants/rate';

const testArray: number[] = [];
for (let i = 0; i < 10; i++) {
  testArray.push(i);
}

interface State {
  ratingSets?: RatingSet[];
}

class RatingList extends Component<{}, State> {
  config: Taro.Config = {};
  state: State = {};

  async componentDidMount() {
    const { data } = await getRatings();
    this.setState({ ratingSets: data });
  }

  render() {
    const total = 2 * dimensions.length;
    const getScore = (ratings: { [key: string]: number }) =>
      Object.values(ratings).reduce((accum, val) => accum + val, 0);
    return (
      <View>
        {!this.state.ratingSets && (
          <AtActivityIndicator mode="center" content="加载中..." />
        )}
        {this.state.ratingSets &&
          this.state.ratingSets.map(rs => (
            <View key={rs.timestamp} style={{ margin: '10px 0' }}>
              <AtCard
                extra={'' + getScore(rs.ratings) + '/' + total}
                title={rs.timestamp}
                note={rs.comments}
              >
                <View style={{ display: 'flex' }}>
                  {dimensions.map(dim => (
                    <View key={dim.id} style={{ marginRight: '4px' }}>
                      <AtTag size="small">
                        {dim.title}: {scoresMap[rs.ratings[dim.id]]}
                      </AtTag>
                    </View>
                  ))}
                </View>
              </AtCard>
            </View>
          ))}
      </View>
    );
  }
}

export default RatingList;
