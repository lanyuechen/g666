const components  = import.meta.globEager('./*.jsx');

const res = {};

for(const [key, value] of Object.entries(components)) {
  const name = key.split('/').pop().split('.')[0];
  if (name) {
    res[name] = value.default;
  }
}

export default res;