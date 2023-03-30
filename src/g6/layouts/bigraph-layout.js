import G6 from '@antv/g6';

const sortNodes = (nodes1, nodes2, edges) => {
  const nodeMap = nodes2.reduce((p, n) => {
    p[n.id] = n.index;
    return p;
  }, {});

  nodes1.forEach((n1) => {
    let index = 0;
    let adjCount = 0;
    edges.forEach((edge) => {
      if (edge.source === n1.id) {
        index += nodeMap[edge.target];
        adjCount++;
      } else if (edge.target === n1.id) {
        index += nodeMap[edge.source];
        adjCount++;
      }
    });
    n1.index = index / adjCount;
  });

  nodes1.sort((a, b) => a.index - b.index);
} 

G6.registerLayout('bigraph-layout', {
  // 默认参数 没用
  getDefaultCfg() {
    return {
      center: [0, 0], // 布局的中心
      biSep: 200, // 两部分的间距
      nodeSep: 20, // 同一部分的节点间距
      direction: 'horizontal', // 两部分的分布方向
      nodeSize: 20, // 节点大小
    };
  },
  // 执行布局
  execute() {
    const { center, biSep, nodeSep, nodeSize, nodes, edges, direction } = { ...this.getDefaultCfg(), ...this };

    const part1Nodes = [];
    const part2Nodes = [];
    // separate the nodes and init the positions
    nodes.forEach((node, i) => {
      node.index = i;
      if (node.cluster === 'part1') {
        part1Nodes.push(node);
      } else {
        part2Nodes.push(node);
      }
    });

    // 对 part1 的节点进行排序
    sortNodes(part1Nodes, part2Nodes, edges);

    // 对 part2 的节点进行排序
    sortNodes(part2Nodes, part1Nodes, edges);

    // 放置节点
    if (direction === 'horizontal') {
      const y1 = center[1] - part1Nodes.length * (nodeSep + nodeSize) / 2;
      const y2 = center[1] - part2Nodes.length * (nodeSep + nodeSize) / 2;
      const x1 = center[0] - biSep / 2;
      const x2 = center[0] + biSep / 2;
      
      part1Nodes.forEach((node, i) => {
        node.x = x1;
        node.y = y1 + i * (nodeSep + nodeSize);
      });
      part2Nodes.forEach((node, i) => {
        node.x = x2;
        node.y = y2 + i * (nodeSep + nodeSize);
      });
    } else {
      const x1 = center[0] - part1Nodes.length * (nodeSep + nodeSize) / 2;
      const x2 = center[0] - part2Nodes.length * (nodeSep + nodeSize) / 2;
      const y1 = center[1] - biSep / 2;
      const y2 = center[1] + biSep / 2;

      part1Nodes.forEach((node, i) => {
        node.x = x1 + i * (nodeSep + nodeSize);
        node.y = y1;
      });
      part2Nodes.forEach((node, i) => {
        node.x = x2 + i * (nodeSep + nodeSize);
        node.y = y2;
      });
    }
  },
});