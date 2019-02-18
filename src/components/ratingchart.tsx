import F2 from '@antv/f2';
import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import F2Canvas from '../f2-canvas/f2-canvas';

import { RatingSet } from '../constants/rate';

class RatingChart extends Component<{
  ratingSets: RatingSet[];
}> {
  static defaultProps = {
    ratingSets: [],
  };

  drawRadar(canvas, width, height) {
    // ⚠️ 别忘了这行
    // 为了兼容微信与支付宝的小程序，你需要通过这个命令为F2打补丁
    F2Canvas.fixF2(F2);

    const data = [
      { name: '超大盘能力', value: 6.5 },
      { name: '抗跌能力', value: 9.5 },
      { name: '稳定能力', value: 9 },
      { name: '绝对收益能力', value: 6 },
      { name: '选证择时能力', value: 6 },
      { name: '风险回报能力', value: 8 },
    ];
    const chart = new F2.Chart({
      el: canvas,
      width,
      height,
    });
    chart.source(data, {
      value: {
        min: 0,
        max: 10,
      },
    });
    chart.coord('polar');
    chart.axis('value', {
      grid: {
        lineDash: null,
      },
      label: null,
      line: null,
    });
    chart.axis('name', {
      grid: {
        lineDash: null,
      },
    });
    chart
      .area()
      .position('name*value')
      .color('#FE5C5B')
      .style({
        fillOpacity: 0.2,
      })
      .animate({
        appear: {
          animation: 'groupWaveIn',
        },
      });
    chart
      .line()
      .position('name*value')
      .color('#FE5C5B')
      .size(1)
      .animate({
        appear: {
          animation: 'groupWaveIn',
        },
      });
    chart
      .point()
      .position('name*value')
      .color('#FE5C5B')
      .animate({
        appear: {
          delay: 300,
        },
      });
    chart.guide().text({
      position: ['50%', '50%'],
      content: '73',
      style: {
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#FE5C5B',
      },
    });
    chart.render();
  }

  render() {
    return (
      <View className="index">
        <View style="width:300px;height:500px">
          <F2Canvas onCanvasInit={this.drawRadar.bind(this)} />
        </View>
      </View>
    );
  }
}

export default RatingChart;
