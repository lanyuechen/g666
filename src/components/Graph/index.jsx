import { useEffect, useRef } from 'react';
import G6 from '@antv/g6';

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

    store.graph.data(JSON.parse(JSON.stringify(data)));
    store.graph.render();

    return () => {
      store.graph.destroy();
    }
  }, [options, data]);

  // useEffect(() => {
  //   if (store.graph) {
  //     store.graph.changeData(data);
  //   }
  // }, [data]);

  return (
    <div ref={ref} />
  );
}