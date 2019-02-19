import F2 from '@antv/f2';
import { View } from '@tarojs/components';
import Taro, { Component } from '@tarojs/taro';
import { RatingSet } from '../constants/rate';
import FtCanvas from './ft-canvas';
import { getDayString } from '../util';

class RatingChart extends Component<{
  ratingSets: RatingSet[];
}> {
  static defaultProps = {
    ratingSets: [],
  };

  renderChart(canvas, width, height) {
    // ⚠️ 别忘了这行
    // 为了兼容微信与支付宝的小程序，你需要通过这个命令为F2打补丁
    FtCanvas.fixF2(F2);

    const chart = new F2.Chart({
      el: canvas,
      width,
      height,
    });

    const sourceData = [...this.props.ratingSets]
      .sort((a, b) => a.timestamp.localeCompare(b.timestamp))
      .map(rs => ({
        timestamp: rs.timestamp,
        score: Object.values(rs.ratings).reduce((acc, v) => acc + v, 0),
      }));

    chart.source(sourceData, {
      timestamp: { range: [0, 1], type: 'timeCat' },
      score: {
        tickCount: 3,
        max: 10,
        min: 0,
      },
    });
    chart.axis('timestamp', {
      label: text => ({ text: getDayString(text) }),
    });

    chart.tooltip({
      showTitle: true,
      onShow: function onShow(ev) {
        const items = ev.items;
        items[0].name = '分数';
      },
    });

    chart
      .line()
      .position('timestamp*score')
      .shape('smooth')
      .color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
    chart
      .area()
      .position('timestamp*score')
      .shape('smooth')
      .color('l(0) 0:#F2C587 0.5:#ED7973 1:#8659AF');
    chart.render();
  }

  render() {
    return (
      <View className="index">
        <View style="width:100%;height:120px">
          <FtCanvas onCanvasInit={this.renderChart.bind(this)} />
        </View>
      </View>
    );
  }
}

export default RatingChart;
