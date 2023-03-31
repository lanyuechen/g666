import { Select } from '@arco-design/web-react';

export default (props) => {
  const { value, onChange, options, ...otherProps } = props;

  return (
    <Select
      value={value}
      onChange={onChange}
      {...otherProps}
    >
      {options.map((d) => (
        <Select.Option key={d.key} value={d.key}>
          {d.label}
        </Select.Option>
      ))}
    </Select>
  );
}
