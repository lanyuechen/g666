import React, { useState, useEffect } from 'react';
import { Form } from '@arco-design/web-react';
import { useValue } from './ValueProvider';

const Layout = (props) => {
  const { children } = props;

  return (
    <Form autoComplete="off">
      {children}
    </Form>
  );
}

Layout.Item = (props) => {
  const { label, rules = {}, children, ...otherProps } = props;
  const [helpText, setHelpText] = useState('');
  const [validateStatus, setValidateStatus] = useState();
  const values = useValue();

  useEffect(() => {
    if (rules.hidden?.(values)) {
      children.props.onChange(undefined);
    }
  }, [values]);

  if (rules.hidden?.(values)) {
    return null;
  }

  const handleValidate = async (value) => {
    if (rules.validator) {
      try {
        await rules.validator(value);
        setValidateStatus();
        setHelpText('');
      } catch(err) {
        setValidateStatus(rules.validateLevel || 'error');
        setHelpText(err);
      }
    }
  }

  return (
    <Form.Item
      label={label}
      validateStatus={validateStatus}
      help={helpText}
      style={{overflow: 'hidden'}}
      {...otherProps}
    >
      {React.cloneElement(children, {
        ...children.props,
        disabled: rules.disabled?.(values),
        onChange: (value) => {
          handleValidate(value);
          children.props.onChange(value);
        }
      })}
    </Form.Item>
  );
}

export default Layout;