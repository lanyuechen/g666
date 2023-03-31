export default [
  {
    label: '自定义',
    route: '/custom',
    component: 'Custom',
  },
  {
    label: '分层布局',
    route: '/level',
    routes: [
      {
        label: '垂直布局',
        route: '/level/vertica',
        component: 'VerticaLevelLayout',
      },
      {
        label: '水平布局',
        route: '/level/horizontal',
        component: 'HorizontalLevelLayout',
      },
    ],
  },
  {
    label: '树图布局',
    route: '/tree',
    component: 'Tree',
  },
  {
    label: '缩进树图布局',
    route: '/indented-tree',
    component: 'IndentedTree',
  },
];
