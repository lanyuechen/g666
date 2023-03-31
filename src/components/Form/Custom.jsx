import _ from 'lodash';
import useImmerUpdate from '@/hooks/useImmerUpdate';
import components from './fields';
import Layout from './Layout';

const getComponent = (type) => {
  return type === 'Custom' ? Custom : (components[type] || components.Input);
}

const Custom = (props) => {
  const { spec, value, onChange, ...otherProps } = props;
  const immerUpdate = useImmerUpdate();

  const handleChange = (path, val) => {
    const newValue = immerUpdate(value || {}, path, val);
    onChange(newValue);
  }

  if (Array.isArray(spec)) {
    return spec.map(d => {
      const C = getComponent(d.type);
  
      return (
        <Layout.Item key={d.key} label={d.label || d.key} rules={d.rules}>
          <C
            {...(d.props || {})}
            spec={d.spec} // Custom(Form/Custom)/List组件/Map组件
            value={_.get(value, d.key)}
            onChange={(val) => handleChange(d.key, val)}
          />
        </Layout.Item>
      );
    });
  }

  const C = getComponent(spec.type);

  return (
    <Layout.Item label={spec.label} rules={spec.rules}>
      <C
        {...(spec.props || {})}
        spec={spec.spec} // Custom(Form/Custom)/List组件/Map组件
        value={value}
        onChange={(val) => onChange(val)}
      />
    </Layout.Item>
  );
}

Custom.parseValue = (spec) => {
  if (Array.isArray(spec)) {
    const value = {};
    for (const d of spec) {
      if (d.type === 'Custom') {
        _.set(value, d.key, Custom.parseValue(d.spec));
      } else {
        _.set(value, d.key, d.value);
      }
    }
    return value;
  }

  if (spec.type === 'Custom') {
    return Custom.parseValue(spec.spec);
  } else {
    return spec.value;
  }
}

export default Custom;