import G6 from '@antv/g6';
import { startEdgeAnimate, stopEdgeAnimate } from '@/g6/utils/utils';

G6.registerEdge('ani-cubic-horizontal', {
  // 复写setState方法
  setState(name, value, item) {
    const shape = item.get('keyShape');
    // 监听 running 状态
    if (name === 'running') {
      // running 状态为 true 时
      shape.attr('stroke', '#888');
      if (value) {
        startEdgeAnimate(item);
      } else {
        stopEdgeAnimate(item);
      }
    }
  },
}, 'cubic-horizontal'); // 该自定义边继承了内置横向三阶贝塞尔曲线边 cubic-horizontal
