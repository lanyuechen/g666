import { Input } from '@arco-design/web-react';

export default (props) => {
  const { value, onChange, ...otherProps } = props;

  return (
    <Input
      value={value}
      onChange={onChange}
      {...otherProps}
    />
  );
}
