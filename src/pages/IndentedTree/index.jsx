import TreeGraph from '@/components/TreeGraph';
import data from './data';

const options = {
  width: 800,
  height: 600,
  modes: {
    default: [
      'drag-canvas', // 拖拽画布
      'zoom-canvas', // 缩放画布
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
    type: 'card-node',
    size: [100, 40],
  },
  defaultEdge: {
    type: 'cubic-horizontal',
  },
  layout: {
    type: 'indented',
    direction: 'LR',
    dropCap: false,
    indent: 200,
    getHeight: () => 60,
  },
}

export default () => {
  return (
    <TreeGraph options={options} data={data} />
  );
}
