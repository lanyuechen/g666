import G6 from '@antv/g6';

G6.registerBehavior('hover-edge', {
  // Bind the event and its callback
  getEvents() {
    return {
      'edge:mouseenter': 'onMouseEnter',
      'edge:mouseleave': 'onMouseLeave',
    };
  },
  /**
   * Handle the callback for node:click
   * @override
   * @param  {Object} e The handler
   */
  onMouseEnter(e) {
    // 获得当前鼠标操作的目标节点
    const edge = e.item;
    // 设置当前节点的 hover 状态为 true
    this.graph.setItemState(edge, 'hover', true);
    // 获得目标节点的所有相关边
    const nodes = [edge.getSource(), edge.getTarget()];
    // 将所有相关边的 running 状态置为 true，此时将会触发自定义节点的 setState 函数
    nodes.forEach((node) => {
      this.graph.setItemState(node, 'running', true);
    });
  },
  /**
   * Handle the callback for mousemove
   * @override
   * @param  {Object} e The handler
   */
  onMouseLeave(e) {
    // 获得当前鼠标操作的目标节点
    const edge = e.item;
    // 设置当前节点的 hover 状态为 false
    this.graph.setItemState(edge, 'hover', false);
    // 获得目标节点的所有相关边
    const nodes = [edge.getSource(), edge.getTarget()];
    // 将所有相关边的 running 状态置为 false，此时将会触发自定义节点的 setState 函数
    nodes.forEach((node) => {
      this.graph.setItemState(node, 'running', false);
    });
  },
});
