import { useEffect, useRef } from 'react';
import G6 from '@antv/g6';
import { startEdgeAnimate, stopEdgeAnimate } from '@/g6/utils/utils';

export default (props) => {
  const { options, data } = props;
  const ref = useRef();
  const store = useRef({}).current;

  useEffect(() => {
    store.graph = new G6.Graph({
      ...options,
      container: ref.current,
      width: options.width || ref.current.clientWidth || 100,
      height: options.height || ref.current.clientHeight || 100,
    });

    // 鼠标进入节点
    store.graph.on('node:mouseenter', (e) => {
      // 获得当前鼠标操作的目标节点
      const node = e.item;
      // 设置当前节点的 hover 状态为 true
      store.graph.setItemState(node, 'hover', true);
      // 获得目标节点的所有相关边
      const edges = node.getEdges();
      // 将所有相关边的 running 状态置为 true，此时将会触发自定义节点的 setState 函数
      edges.forEach((edge) => {
        store.graph.setItemState(edge, 'running', true);
        startEdgeAnimate(edge);
      });
    });
    
    // 鼠标离开节点
    store.graph.on('node:mouseleave', (e) => {
      // 获得当前鼠标操作的目标节点
      const node = e.item;
      // 设置当前节点的 hover 状态为 false
      store.graph.setItemState(node, 'hover', false);
      // 获得目标节点的所有相关边
      const edges = node.getEdges();
      // 将所有相关边的 running 状态置为 false，此时将会触发自定义节点的 setState 函数
      edges.forEach((edge) => {
        store.graph.setItemState(edge, 'running', false);
        stopEdgeAnimate(edge);
      });
    });
    
    // 点击节点
    store.graph.on('node:click', (e) => {
      // 先将所有当前是 click 状态的节点置为非 click 状态
      const clickNodes = store.graph.findAllByState('node', 'click');
      clickNodes.forEach((cn) => {
        store.graph.setItemState(cn, 'click', false);
      });
      const nodeItem = e.item; // 获取被点击的节点元素对象
      store.graph.setItemState(nodeItem, 'click', true); // 设置当前节点的 click 状态为 true
    });
    
    // 点击边
    store.graph.on('edge:click', (e) => {
      // 先将所有当前是 click 状态的边置为非 click 状态
      const clickEdges = store.graph.findAllByState('edge', 'click');
      clickEdges.forEach((ce) => {
        store.graph.setItemState(ce, 'click', false);
      });
      const edgeItem = e.item; // 获取被点击的边元素对象
      store.graph.setItemState(edgeItem, 'click', true); // 设置当前边的 click 状态为 true
    });

    store.graph.data(data);
    store.graph.render();

    return () => {
      store.graph.off('node:mouseenter');
      store.graph.off('node:mouseleave');
      store.graph.off('node:click');
      store.graph.off('edge:click');
      store.graph.destroy();
    }
  }, [options]);

  // useEffect(() => {
  //   if (store.graph) {
  //     store.graph.changeData(data);
  //   }
  // }, [data]);

  return (
    <div ref={ref} />
  );
}