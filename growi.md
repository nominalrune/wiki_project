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


mongod --dbpath=/home/paulsenglish/mongo/db



結局、[2021-06-13T02:16:09.189Z]  INFO: growi:service:search/199696 on sv8238.xserver.jp: Initializing search delegator
[2021-06-13T02:16:09.882Z]  INFO: growi:crowi/199696 on sv8238.xserver.jp: [production] Express server is listening on port 3000
までたどり着いたが、RewriteEnginの設定の仕方がわからない。
どうやら、growiは3000portを直接リスニングしているらしい。socketに飛ばすことができないという場合、どうしたらいいのやら。
