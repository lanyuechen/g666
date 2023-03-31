import { Checkbox } from '@arco-design/web-react';

export default (props) => {
  const { value, onChange, options, ...otherProps } = props;

  return (
    <Checkbox.Group value={value} onChange={onChange} {...otherProps}>
      {options.map((d) => (
        <Checkbox key={d.key} value={d.key}>
          {d.label}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}
