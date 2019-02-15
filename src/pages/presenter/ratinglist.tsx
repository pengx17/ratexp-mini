import { View } from '@tarojs/components';
import { Component } from '@tarojs/taro';
import { AtCard, AtDivider, AtIcon } from 'taro-ui';

const testArray: number[] = [];
for (let i = 0; i < 10; i++) {
  testArray.push(i);
}

class RatingList extends Component {
  config: Taro.Config = {};

  render() {
    return (
      <View>
        <AtDivider content="最新" />
        {testArray.map(id => (
          <View style={{ margin: '10px 0' }}>
            <AtCard key={id} extra="🤩" title={'日期, 几月几号'}>
              打分的简略信息
            </AtCard>
          </View>
        ))}
        <AtDivider>
          <AtIcon value="check-circle" />
        </AtDivider>
      </View>
    );
  }
}

export default RatingList;
