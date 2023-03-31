export default [
  {
    key: 'direction',
    type: 'RadioGroup',
    value: 'vertical',
    props: {
      type: 'button',
      options: [
        { key: 'horizontal', label: 'Horizontal' },
        { key: 'vertical', label: 'Vertical' },
      ],
    },
  },
  {
    key: 'behaviors',
    type: 'CheckboxGroup',
    value: ['drag-canvas', 'zoom-canvas'],
    props: {
      options: [
        { key: 'drag-canvas', label: 'drag-canvas' },
        { key: 'zoom-canvas', label: 'zoom-canvas' },
        { key: 'drag-node', label: 'drag-node' },
        { key: 'drag-combo', label: 'drag-combo' },
        { key: 'hover-node', label: 'hover-node' },
        { key: 'hover-edge', label: 'hover-edge' },
      ],
    },
  }
];
