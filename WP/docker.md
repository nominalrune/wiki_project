# XserverをDockerにする


# 流れ
1. データの用意
  2. WPのデータを根こそぎローカルに落とす
  3. ｍｙSQLのデータを.sqlとして根こそぎローカルに落とす
  4. .sql内の[[本サイトrootURL]]をすべて[[localhost]]に置換しておく(記事内のリンクは、/blog/244)
5. Docker
  7. webサーバ用Dockerfileを用意。CentOS7コンテナをpullして、Nginxとphp-fpmをインストールし、設定ファイルを書き換える
  8. dbサーバー用Dockerfileを用意。mySQLコンテナをpullして、本サイトの.sqlを読み込ませる
  9. docker-compose.ymlファイルをつくり、mySQLの環境変数を設定。web-dbの内部ネットワーク・ポートのフォワワーディングを設定。
  10. ビルドして127.0.0.1を叩けば終わり。
