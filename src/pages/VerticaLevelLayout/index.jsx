import { useMemo } from 'react';
import G6 from '@antv/g6';
import Graph from '@/components/Graph';

import data from './data';

const parseOptions = (params) => {
  return {
    width: 800,
    height: 600,
    layout: {
      type: 'comboCombined',
      outerLayout: new G6.Layout[params.direction === 'horizontal' ? 'column-layout' : 'row-layout'](),
      innerLayout: new G6.Layout['float-layout']({
        direction: params.direction === 'horizontal' ? 'vertical' : 'horizontal',
      }),
    },
    defaultNode: {
      type: 'rect',
      size: params.direction === 'horizontal' ? [100, 30] : [30, 100],
      anchorPoints: params.direction === 'horizontal' ? undefined : [
        [0.5, 0],
        [0.5, 1],
      ],
      labelCfg: params.direction === 'horizontal' ? undefined : {
        style: {
          matrix: [0, 1, 0, -1, 0, 0, 0, 0, 1], // 旋转
        },
      },
    },
    defaultEdge: {
      type: params.direction === 'horizontal' ? 'cubic-horizontal' : 'cubic-vertical',
      style: {
        stroke: '#ccc',
        lineAppendWidth: 5,
      }
    },
    defaultCombo: {
      type: 'rect',
    },
    modes: {
      default: [
        'drag-canvas', // 拖拽画布
        {
          type: 'zoom-canvas', // 缩放画布
          sensitivity: 1,
        },
        'drag-node', // 拖拽节点
        'drag-combo', // 拖拽分组
        'hover-node', 
        'hover-edge', 
      ],
    },
    // 节点不同状态下的样式集合
    nodeStateStyles: {
      hover: {
        fill: 'lightsteelblue',
      },
      running: {
        fill: 'lightblue',
      }
    },
    // 边不同状态下的样式集合
    edgeStateStyles: {
      hover: {
        stroke: 'lightsteelblue',
        lineWidth: 3,
      },
      running: {
        stroke: 'lightblue',
        lineWidth: 3,
      }
    },
  };
}

function App() {
  const optionVertical = useMemo(() => parseOptions({ direction: 'vertical' }), []);

  return (
    <div>
      <Graph 
        options={optionVertical}
        data={data}
      />
    </div>
  );
}

export default App;
