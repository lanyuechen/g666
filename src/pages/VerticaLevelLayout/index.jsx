import { useMemo } from 'react';
import G6 from '@antv/g6';
import Graph from '@/components/Graph';

import data from './data';

window.xxx = data;

import './style.css';

const parseOptions = () => {
  return {
    // width: 800,
    // height: 600,
    layout: {
      type: 'comboCombined',
      outerLayout: new G6.Layout['row-layout']({
        biSep: 200,
        childSize: 40,
      }),
      innerLayout: new G6.Layout['grid-layout']({
        cols: 11,
        sep: 10,
      }),
      // innerLayout: new G6.Layout['grid']({
      //   condense: true,
      //   cols: 12,
      // }),
    },
    defaultNode: {
      type: 'rect',
      size: [30, 30],
      anchorPoints: [
        [0.5, 0], // 上
        [1, 0.5], // 右
        [0.5, 1], // 下
        [0, 0.5], // 左
      ],
    },
    defaultEdge: {
      type: 'cubic-vertical',
      style: {
        stroke: '#aaa',
        lineAppendWidth: 5,
      }
    },
    defaultCombo: {
      type: 'rect',
    },
    modes: {
      default: [
        'drag-canvas', // 拖拽画布
        'zoom-canvas', // 缩放画布
        'hover-node', 
        'hover-edge', 
        'click-node',
        {
          type: 'tooltip', // 提示框
          formatText(model) {
            // 提示框文本内容
            const text = model.originLabel;
            return text;
          },
        },
      ],
    },
    // 节点不同状态下的样式集合
    nodeStateStyles: {
      hover: {
        fill: 'lightsteelblue',
      },
      running: {
        fill: 'lightblue',
      },
      click: {
        fill: 'lightblue',
      },
      highlight: {
        stroke: 'black',
      },
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
      },
      highlight: {
        stroke: 'black',
        lineWidth: 3,
      },
    },
  };
}

// const handleLoad = (graph) => {
//   console.log('===', graph)
//   const edges = graph.getEdges();
//   edges.forEach((edge) => {
//     edge.toFront();
//   });
//   graph.paint();
// }

function App() {
  const optionVertical = useMemo(() => parseOptions(), []);

  return (
    <Graph 
      options={optionVertical}
      data={data}
      style={{
        height: '100%',
      }}
      // onLoad={(graph) => handleLoad(graph)}
    />
  );
}

export default App;
