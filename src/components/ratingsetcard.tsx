import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { AtCard, AtTag } from 'taro-ui';
import { dimensions, RatingSet, scoresMap } from '../constants/rate';
import { getDayString } from '../util';

class RatingSetCard extends Component<{
  ratingSet: RatingSet;
  onCardClick: (id: string) => void;
}> {
  static defaultProps = {
    ratingSet: {},
    onCardClick: () => {},
  };

  render() {
    const rs = this.props.ratingSet;
    const total = 2 * dimensions.length;
    const getScore = (ratings: { [key: string]: number }) =>
      Object.values(ratings).reduce((accum, val) => accum + val, 0);

    return (
      rs &&
      rs.ratings && (
        <AtCard
          onClick={() => rs._id && this.props.onCardClick(rs._id)}
          extra={'' + getScore(rs.ratings) + '/' + total}
          title={getDayString(rs.timestamp)}
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
      )
    );
  }
}

export default RatingSetCard;
