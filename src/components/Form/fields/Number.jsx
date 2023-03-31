import { InputNumber } from '@arco-design/web-react';

export default (props) => {
  const { value, onChange, ...otherProps } = props;

  return (
    <InputNumber
      value={value}
      onChange={onChange}
      {...otherProps}
    />
  );
}
