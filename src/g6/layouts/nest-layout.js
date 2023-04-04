import G6 from '@antv/g6';

G6.registerLayout('nest-layout', {
  // 默认参数 没用
  getDefaultCfg() {
    return {
      center: [0, 0],
    };
  },
  // 执行布局
  execute() {
    const { center, sep, rows, cols, nodes } = { ...this.getDefaultCfg(), ...this };

    let columns = cols;
    if (rows) {
      columns = Math.ceil(nodes.length / rows);
    }

    nodes.forEach((node, i) => {
      let row = 0;
      let col = i;
      if (columns) {
        row = Math.floor(i / columns);
        col = i % columns;
      }
      
      node.x = (node.size[0] + sep) * col;
      node.y = (node.size[1] + sep) * row;
    });
  },
});