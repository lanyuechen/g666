import G6 from '@antv/g6';

G6.registerEdge('sw-line', {
  draw(cfg, group) {
    const sp = cfg.startPoint;
    const ep = cfg.endPoint;
    const xm = (sp.x + ep.x) / 2;
    const ym = (sp.y + 50 + ep.y) / 2;
    const sign = ([0, 1, 0, -1][sp.anchorIndex]);
    const shape = group.addShape('path', {
      attrs: {
        ...cfg.style,
        path: [
          ['M', sp.x, sp.y],
          ['Q', sp.x + 5 * sign, sp.y, sp.x + 5 * sign, sp.y + 50],
          ['Q', sp.x + 5 * sign, ym, xm, ym],
          ['Q', ep.x, ym, ep.x, ep.y],
        ],
      },
      // 在 G6 3.3 及之后的版本中，必须指定 name，可以是任意字符串，但需要在同一个自定义元素类型中保持唯一性
      name: 'sw-line',
    });

    return shape;
  },

  setState(name, value, item) {
    const group = item.getContainer();
    const shape = group.get('children')[0]; // 顺序根据 draw 时确定
    const originStyle = item._cfg.originStyle['sw-line'];
    const states = item._cfg.states;
    
    if (states.length) {
      states.forEach(state => {
        Object.entries(originStyle[state]).forEach(([k, v]) => {
          shape.attr(k, v);
        });
      });
    } else {
      Object.entries(originStyle).forEach(([k, v]) => {
        shape.attr(k, v);
      });
    }
  },
});
