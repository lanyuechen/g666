const pages  = import.meta.globEager('./**/index.jsx');

const res = {};

for(const [key, value] of Object.entries(pages)) {
  const name = key.split('/').slice(1, -1).join('/');
  if (name) {
    res[name] = value.default;
  }
}

export default res;