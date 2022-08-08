const componentsRoutes = [
  {
    text: '基础组件',
    children: [
      '/components/button/',
      '/components/loading/',
      '/components/icon/',
      '/components/tag/',
    ],
  },
  {
    text: '表单',
    children: [
      '/components/form/input',
      '/components/form/select/',
      '/components/form/radio/',
      '/components/form/checkbox/',
      '/components/form/toggle/',
      '/components/form/date-picker/',
      '/components/form/form/',
    ],
  },
  {
    text: '交互',
    children: [
      '/components/interact/expansion/',
      '/components/interact/dropdown/',
      '/components/interact/tabs/',
      '/components/carousel/',
    ],
  },
  {
    text: '反馈',
    children: [
      '/components/feedback/tooltip/',
      '/components/feedback/dialog/',
      '/components/feedback/drawer/',
      '/components/feedback/notification/',
    ],
  },
  {
    text: '数据展示',
    children: [
      '/components/data-presentation/table/',
      '/components/data-presentation/list/',
    ],
  },
]

export { componentsRoutes }
