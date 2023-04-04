import G6 from '@antv/g6';
import _ from 'lodash';

const parseOffsets = (nodes, nodeSep, childSize) => {
  const offsets = [];
  let lastOffset = 0;
  nodes.forEach(node => {
    const padding = typeof node.padding === 'number'
      ? [node.padding, node.padding, node.padding, node.padding]
      : (node.padding || [25, 20, 15, 20]);
    
    const contentSize = node.children ? node.children.length * childSize : 0;
    const size = padding[1] + padding[3] + contentSize;
    offsets.push(lastOffset + padding[1] + node.children.length * childSize / 2);
    lastOffset += size + nodeSep;
  });
  const size = lastOffset - nodeSep;

  return offsets.map(offset => offset - size / 2);
}

G6.registerLayout('row-layout', {
  // 默认参数 没用
  getDefaultCfg() {
    return {
      center: [0, 0], // 布局的中心
      biSep: 200, // 两部分的间距
      nodeSep: 20, // 同一部分的节点间距
      childSize: 30, // 子元素尺寸
    };
  },
  // 执行布局
  execute() {
    const { center, biSep, childSize, nodeSep, nodes } = { ...this.getDefaultCfg(), ...this };

    const levels  = _.groupBy(_.sortBy(nodes, 'level'), 'level');
    Object.values(levels).forEach((levelNodes, i, ds) => {
      const xs = parseOffsets(levelNodes, nodeSep, childSize);
      levelNodes.forEach((node, j) => {
        node.x = center[0] + xs[j];
        node.y = center[1] + biSep * i - biSep * (ds.length - 1) / 2;
      });
    });
  },
});