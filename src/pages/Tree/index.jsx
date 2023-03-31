import TreeGraph from '@/components/TreeGraph';
import data from './data';

const options = {
  width: 800,
  height: 600,
  modes: {
    default: [
      'drag-canvas', // 拖拽画布
      {
        type: 'zoom-canvas', // 缩放画布
        sensitivity: 1,
      },
      {
        type: 'collapse-expand', // 展开/折叠
        onChange: (item, collapsed) => {
          const data = item.getModel();
          data.collapsed = collapsed;
          return true;
        },
      },
    ],
  },
  defaultNode: {
    size: 26,
    anchorPoints: [
      [0, 0.5],
      [1, 0.5],
    ],
  },
  defaultEdge: {
    type: 'cubic-horizontal',
  },
  layout: {
    type: 'compactBox',
    direction: 'LR',
    getId: (d) => d.id,
    getHeight: () => 16,
    getWidth: () => 16,
    getVGap: () => 10,
    getHGap: () => 100,
  },
}

export default () => {
  return (
    <TreeGraph options={options} data={data} />
  );
}
