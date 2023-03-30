import G6 from '@antv/g6';

G6.registerLayout('float-layout', {
  // 默认参数 没用
  getDefaultCfg() {
    return {
      center: [0, 0],
      sep: 0,
      direction: 'vertical',
    };
  },
  // 执行布局
  execute() {
    const { center, sep, nodes, direction } = { ...this.getDefaultCfg(), ...this };

    nodes.forEach((node, i) => {
      if (direction === 'vertical') {
        node.x = 0;
        node.y = (node.size[1] + sep) * i;
      } else {
        node.x = (node.size[0] + sep) * i;
        node.y = 0;
      }
    });
  },
});