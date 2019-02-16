import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { AtCard } from 'taro-ui';
import { Dimention, ratings } from '../../constants/rate';
import styles from './ratecontrol.module.css';

class RateControl extends Component<{
  dimention: Dimention;
  value?: number;
  onChange?: (value: number) => void;
}> {
  static defaultProps = {
    dimention: {},
  };

  config: Taro.Config = {};

  render() {
    const iconClassName = (selected: boolean) =>
      styles.controlButton +
      (selected ? ` ${styles.controlButtonSelected}` : '');
    return (
      <AtCard
        title={
          this.props.dimention.title + (this.props.value !== null ? ' ✅' : '')
        }
        note={this.props.dimention.description}
      >
        <View style={{ display: 'flex', justifyContent: 'center' }}>
          {ratings.map(rating => {
            const selected = this.props.value === rating.score;
            return (
              <View
                onClick={() =>
                  this.props.onChange && this.props.onChange(rating.score)
                }
                className={iconClassName(selected)}
                key={rating.score}
              >
                {rating.label}
              </View>
            );
          })}
        </View>
      </AtCard>
    );
  }
}

export default RateControl;
