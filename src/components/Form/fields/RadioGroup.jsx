import { Radio } from '@arco-design/web-react';

export default (props) => {
  const { value, onChange, options, ...otherProps } = props;

  return (
    <Radio.Group value={value} onChange={onChange} {...otherProps}>
      {options.map((d) => (
        <Radio key={d.key} value={d.key}>
          {d.label}
        </Radio>
      ))}
    </Radio.Group>
  );
}
