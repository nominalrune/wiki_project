# Growi

- [mongo]
- [yarn]
- [elasticsearch]
	- failed

```sh
cd /home
mkdir opt
git clone https://github.com/weseek/growi /opt/growi
cd /opt/growi
git tag -l
git checkout -b v4.2.20 refs/tags/v4.2.20
yarn
```


/home/paulsenglish/opt/growi/config/env.prod.js
```js
module.exports = {
  NODE_ENV: 'production',
  // ELASTICSEARCH_URI='http://localhost:9200/growi',
  MONGO_URI='mongodb://localhost:27017/growi'
  // FORMAT_NODE_LOG: false, // default: true
};

```
