import G6 from '@antv/g6';
import { startEdgeAnimate, stopEdgeAnimate } from '@/g6/utils/utils';

G6.registerBehavior('hover-node', {
  // Bind the event and its callback
  getEvents() {
    return {
      'node:mouseenter': 'onMouseEnter',
      'node:mouseleave': 'onMouseLeave',
    };
  },
  /**
   * Handle the callback for node:click
   * @override
   * @param  {Object} e The handler
   */
  onMouseEnter(e) {
    // 获得当前鼠标操作的目标节点
    const node = e.item;
    // 设置当前节点的 hover 状态为 true
    this.graph.setItemState(node, 'hover', true);
    // 获得目标节点的所有相关边
    const edges = node.getEdges();
    // 将所有相关边的 running 状态置为 true，此时将会触发自定义节点的 setState 函数
    edges.forEach((edge) => {
      this.graph.setItemState(edge, 'running', true);
      startEdgeAnimate(edge);
    });
  },
  /**
   * Handle the callback for mousemove
   * @override
   * @param  {Object} e The handler
   */
  onMouseLeave(e) {
    // 获得当前鼠标操作的目标节点
    const node = e.item;
    // 设置当前节点的 hover 状态为 false
    this.graph.setItemState(node, 'hover', false);
    // 获得目标节点的所有相关边
    const edges = node.getEdges();
    // 将所有相关边的 running 状态置为 false，此时将会触发自定义节点的 setState 函数
    edges.forEach((edge) => {
      this.graph.setItemState(edge, 'running', false);
      stopEdgeAnimate(edge);
    });
  },
});
