import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { AtCard } from 'taro-ui';
import { Dimension, scores } from '../../constants/rate';
import styles from './ratecontrol.module.css';

class RateControl extends Component<{
  dimention: Dimension;
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
      <View>
        <AtCard
          title={
            this.props.dimention.title +
            (this.props.value !== null ? ' ✅' : '')
          }
          note={this.props.dimention.description}
        >
          <View style={{ display: 'flex', justifyContent: 'center' }}>
            {scores.map(rating => {
              const selected = this.props.value === rating.value;
              return (
                <View
                  onClick={() =>
                    this.props.onChange && this.props.onChange(rating.value)
                  }
                  className={iconClassName(selected)}
                  key={rating.value}
                >
                  {rating.label}
                </View>
              );
            })}
          </View>
        </AtCard>
      </View>
    );
  }
}

export default RateControl;
