import G6 from '@antv/g6';

G6.registerBehavior('click-node', {
  // Bind the event and its callback
  getEvents() {
    return {
      'node:click': 'onClick',
    };
  },
  /**
   * Handle the callback for node:click
   * @override
   * @param  {Object} e The handler
   */
  onClick(e) {
    // 获得当前鼠标操作的目标节点
    const node = e.item;

    const hightlightNodes = this.graph.findAllByState('node', 'highlight');
    hightlightNodes.forEach(node => node.setState('highlight', false));
    const hightlightEdges = this.graph.findAllByState('edge', 'highlight');
    hightlightEdges.forEach(node => node.setState('highlight', false));

    if (node.getStates().includes('click')) {
      node.setState('click', false);
      return;
    }

    const nodes = this.graph.findAllByState('node', 'click');

    if (nodes.length < 1) {
      // 设置当前节点的 hover 状态为 true
      node.setState('click', true);
    } else if (nodes.length === 1) {
      node.setState('click', true);
      const res = lookUp(nodes[0], node, this.graph);
      if (res) {
        res.map(d => {
          d.setState('highlight', true);
        });
      }
    } else {
      nodes.forEach(node => node.setState('click', false));
      node.setState('click', true);
    }
  },
});

const lookDown = (node1, node2, graph) => {
  const edge = node1.getOutEdges()[0];
  if (!edge) {
    return null;
  }
  const tNode = edge.getTarget();

  if (tNode === node2) {
    return [node1, edge, node2];
  }

  const combo = graph.findById(tNode.getModel().comboId);
  const comboNodes = combo.getNodes();

  for (const node of comboNodes) {
    if (node !== node2 && node.getOutEdges()[0]) {
      const nodes = lookDown(node, node2, graph);
      if (nodes) {
        return [node1, edge, tNode, ...nodes];
      }
    }
  }
  return false;
}

const lookUp = (node1, node2, graph) => {
  const edge = node1.getInEdges()[0];
  if (!edge) {
    return false;
  }
  const sNode = edge.getSource();

  const combo = graph.findById(sNode.getModel().comboId);
  const comboNodes = combo.getNodes();

  // 优先向下寻找
  for (const node of comboNodes) {
    if (node !== sNode && node.getOutEdges()[0]) {
      const nodes = lookDown(node, node2, graph);
      if (nodes) {
        return [node1, edge, sNode, ...nodes];
      }
    }
  }

  for (const node of comboNodes) {
    if (node !== sNode && node.getInEdges()[0]) {
      const nodes = lookUp(node, node2, graph);
      if (nodes) {
        return [node1, edge, sNode, ...nodes];
      }
    }
  }
  return false;
}