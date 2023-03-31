export default [
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
];
