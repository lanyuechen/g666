import { useEffect, useState } from 'react';
import G6 from '@antv/g6';
import Graph from '@/components/Graph';
import Form from '@/components/Form';

import data from './data';
import spec from './spec';

const parseOptions = (params) => {
  return {
    width: 800,
    height: 600,
    // layout: {
    //   type: 'comboCombined',
    //   outerLayout: new G6.Layout[params.direction === 'horizontal' ? 'column-layout' : 'row-layout'](),
    //   innerLayout: new G6.Layout['grid-layout']({
    //     [params.direction === 'horizontal' ? 'cols' : 'rows']: 1,
    //   }),
    // },
    layout: {
      type: 'nest-layout',
      layouts: {
        
      }
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
        ...params.behaviors,
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
  const [params, setParams] = useState(Form.parseValue(spec));
  const [options, setOptions] = useState(parseOptions(params));

  const handleParamsChange = (values) => {
    setParams(values);
  }

  useEffect(() => {
    setOptions(parseOptions(params));
  }, [params]);


  return (
    <div>
      <Form
        spec={spec}
        value={params}
        onChange={(values) => handleParamsChange(values)}
      />
      <Graph 
        options={options}
        data={data}
      />
    </div>
  );
}

export default App;
