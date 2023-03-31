import { Grid, Button } from '@arco-design/web-react';
import { IconPlus, IconDelete } from '@arco-design/web-react/icon';
import Custom from '@/components/Form/Custom';

export default (props) => {
  const { value = [], onChange, spec, ...otherProps } = props;

  const handleAdd = () => {
    onChange([...value, Custom.parseValue(spec)]);
  }

  const handleChange = (idx, val) => {
    onChange(value.map((d, i) => i === idx ? val : d));
  }

  const handleRemove = (idx) => {
    onChange(value.filter((d, i) => i !== idx));
  }

  return (
    <>
      {value.map((d, i) => (
        <Grid.Row key={i} gutter={16}>
          <Grid.Col flex={1}>
            <Custom
              spec={spec}
              value={d}
              onChange={(v) => {
                handleChange(i, v)
              }}
            />
          </Grid.Col>
          <Grid.Col flex="48px">
            <Button type="text" status="danger" icon={<IconDelete />} onClick={() => handleRemove(i)} />
          </Grid.Col>
        </Grid.Row>
      ))}
      <Button type="text" icon={<IconPlus />} onClick={handleAdd} />
    </>
  );
}
