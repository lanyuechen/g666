export const startEdgeAnimate = (edge) => {
  const shape = edge.get('keyShape');
  let count = 0;
  shape.animate(() => {
    count++;
    if (count > 6) {
      count = 0;
    }
    return {
      lineDash: [4, 2],
      lineDashOffset: -count,
    };
  },
  {
    repeat: true, // 动画重复
    duration: 5000, // 一次动画的时长为 3000
  });
}

export const stopEdgeAnimate = (edge) => {
  const shape = edge.get('keyShape');
  shape.stopAnimate();
  shape.attr('lineDash', null);
}