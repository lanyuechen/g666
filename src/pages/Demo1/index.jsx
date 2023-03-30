import { useMemo } from 'react';
import G6 from '@antv/g6';
import Graph from '@/components/Graph';

import '@/g6/layouts/column-layout';
import '@/g6/layouts/row-layout';
import '@/g6/layouts/float-layout';
import '@/g6/edges/ani-cubic-horizontal';

import data from './data';
const data2 = JSON.parse(JSON.stringify(data));

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
        stroke: '#ccc'
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
      ],
    },
    // 节点不同状态下的样式集合
    nodeStateStyles: {
      // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
      hover: {
        fill: 'lightsteelblue',
      },
      // 鼠标点击节点，即 click 状态为 true 时的样式
      click: {
        stroke: '#000',
      },
    },
    // 边不同状态下的样式集合
    edgeStateStyles: {
      // 鼠标点击边，即 click 状态为 true 时的样式
      click: {
        stroke: 'steelblue',
      },
      running: {
        stroke: '#888',
      }
    },
  };
}

function App() {
  const optionHorizontal = useMemo(() => parseOptions({ direction: 'horizontal' }), []);
  const optionVertical = useMemo(() => parseOptions({ direction: 'vertical' }), []);

  return (
    <div>
      {/* <Graph 
        options={optionHorizontal}
        data={data}
      /> */}
      <Graph 
        options={optionVertical}
        data={data2}
      />
    </div>
  );
}

export default App;
