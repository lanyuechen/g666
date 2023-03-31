import G6 from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const graph = new G6.TreeGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['drag-canvas'],
  },
  defaultNode: {
    type: 'card-node',
    size: [100, 40],
  },
  defaultEdge: {
    type: 'cubic-horizontal',
    style: {
      endArrow: true,
    },
  },
  layout: {
    type: 'indented',
    direction: 'LR',
    dropCap: false,
    indent: 200,
    getHeight: () => {
      return 60;
    },
  },
});

graph.data(data);
graph.render();
graph.fitView();
graph.on('node:click', (e) => {
  if (e.target.get('name') === 'collapse-icon') {
    e.item.getModel().collapsed = !e.item.getModel().collapsed;
    graph.setItemState(e.item, 'collapsed', e.item.getModel().collapsed);
    graph.layout();
  }
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.changeSize(container.scrollWidth, container.scrollHeight);
  };
