import { useState } from 'react';
import { Grid, Input, Button } from '@arco-design/web-react';
import { IconPlus, IconDelete } from '@arco-design/web-react/icon';
import Custom from '@/components/Form/Custom';

const parseValue = (data) => {
  return data.reduce((p, n) => {
    p[n.key] = n.value;
    return p;
  }, {});
}

export default (props) => {
  const { value = {}, onChange, spec, ...otherProps } = props;
  const [data, setData] = useState(Object.entries(value).map(([key, value]) => ({
    key,
    value,
    _id: Math.random(),
  })));

  const handleAdd = () => {
    const newData = [
      ...data,
      { _id: Math.random(), key: '', value: Custom.parseValue(spec) },
    ];
    setData(newData);
    onChange(parseValue(newData));
  }

  const handleChange = (_id, key, value) => {
    const newData = data.map(d => {
      if (d._id === _id) {
        return {
          ...d,
          [key]: value,
        };
      }
      return d;
    });
    setData(newData);
    onChange(parseValue(newData));
  }

  const handleRemove = (_id) => {
    const newData = data.filter(d => d._id !== _id);
    setData(newData);
    onChange(parseValue(newData));
  }

  return (
    <>
      {data.map((d) => (
        <Grid.Row key={d._id} gutter={16}>
          <Grid.Col flex={1}>
            <Input placeholder="Key" value={d.key} onChange={(v) => handleChange(d._id, 'key', v)} />
          </Grid.Col>
          <Grid.Col flex={2}>
            <Custom
              spec={spec}
              value={d.value}
              onChange={(v) => {
                handleChange(d._id, 'value', v)
              }}
            />
          </Grid.Col>
          <Grid.Col flex="48px">
            <Button type="text" status="danger" icon={<IconDelete />} onClick={() => handleRemove(d._id)} />
          </Grid.Col>
        </Grid.Row>
      ))}
      <Button type="text" icon={<IconPlus />} onClick={handleAdd} />
    </>
  );
}
