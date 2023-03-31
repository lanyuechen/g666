import _ from 'lodash';
import Layout from './Layout';
import Custom from './Custom';
import ValueProvider from './ValueProvider';

const Form = (props) => {
  const { spec, value, onChange, ...otherProps } = props;

  return (
    <ValueProvider value={value}>
      <Layout>
        <Custom spec={spec} value={value} onChange={onChange} {...otherProps} />
      </Layout>
    </ValueProvider>
  );
}

Form.parseValue = Custom.parseValue;

export default Form;