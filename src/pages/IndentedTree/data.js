const data = {
  id: 'A',
  children: [
    {
      id: 'A1',
      children: [{ id: 'A11' }, { id: 'A12' }, { id: 'A13' }, { id: 'A14' }],
    },
    {
      id: 'A2',
      children: [
        {
          id: 'A21',
          children: [{ id: 'A211' }, { id: 'A212' }],
        },
        {
          id: 'A22',
        },
      ],
    },
  ],
};

const parseData = (data) => {
  return {
    ...data,
    label: data.id,
    labelCfg: {
      offset: 10,
      position: data.children && data.children.length > 0 ? 'left' : 'right',
    },
    children: data.children && data.children.map(d => parseData(d)),
  }
}

export default parseData(data);
