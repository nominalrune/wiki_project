# Nginx
3つすべてに使える。それぞれに適切な設定がある。
1. 静的なコンテンツのWebサーバー
	- 変更が滅多にない固定データ
	- Webページのデータや、Webページが使う画像やスタイルシートなどのリソースファイル、ダウンロードファイルの提供など
1. 動的なコンテンツのWebサーバー
	- アクセスしてきたユーザーや入力の状況などによって内容が変わるデータ
	- Webアプリケーション
1. ロードバランサ、リバースプロキシ
	- ロードバランサやリバースプロキシの設定が容易
	- nginxにHTTPSの処理を担当させて、暗号化を解いた状態で、別のWebサーバーにアクセスを転送するような使い方もあり
# 基本
## install
```sh
echo SELINUX=disabled >> /etc/selinux/semanage.conf
echo \
"[nginx] \n\
name=nginx repo \n\
baseurl=http://nginx.org/packages/mainline/centos/7/$basearch/ \n\
gpgcheck=l \n\
enabled=l \n\
gpgkey=http://nginx.org/keys/nginx_signing.key \n\
[nginx-source] \n\
name=nginx source \n\
baseurl=http://nginx.org/packages/mainline/centos/7/SRPMS/ \n\
gpgcheck=1 \n\
enabled=O \n\
gpgkey=http://nginx.org/keys/nginx_signing.key \
" > /etc/yum.repos.d/nginx.repo
yum install -y nginx yum-cron
```

## ディレクトリの構成

| ディレクトリ／ファイル名 | 内容 |
| -- | -- |
| `/etc/logrotate.d/nginx` |ログのローテーションの設定ファイル|
| `/etc/nginx` |nginxの設定ファイルが置かれるデイレクトリ|
| `/etc/sysconfig/nginx` | nginxの起動オプションを記述する設定ファイル。現在は使われていない|
| `/usr/lib/systemd/system/nginx.service` |`systemd`の設定ファイルで、起動スクリプトに相当する|
| `/usr/lib64/nginx/modules` |追加モジュールを配置するディレクトリ|
| `/usr/libexec/initscripts/legacy-actions/nginx` | systemdで対応できないコマンドを置くディレクトリ。アップグレード時に実行されるコマンドが配置される|
| `/usr/share/doc/nginx-(バージョン)` |nginxのドキュメントが置かれるディレクトリ 。Copyright表示のみが置かれている|
| `/usr/share/nginx/html` |デフォルトのドキュメントルートとなるデイレクトリ。エラードキュメントなどもここに配置される|
| `/var/cache/nginx` |キャッシュファイルが置かれるディレクトリ|
| `/var/log/nginx` |ログファイルが害き出されるデイレクトリ|


`/etc/nginx`ディレクトリ
|ファイル名|内容|
|--|--|
|`nginx.conf`|最初に読み込まれる設定ファイル。他の設定ファイルはこのファイルから読み込まれる|
|`mime.types`|ファイルの拡張子とContent-Typeのマソビングテープル|
|`conf.d/default.conf`|ポート番号やドキュメントルートの設定など、基本的なWebサーバーとしての設定が記述されている|
|`fastcgi_params`|FastCGIのパラメーターとnginxの変数やテキストのマッビンゲテープル|
|`scgi_params`|SCGIのパラメーターとnginxの変数やテキストのマッピングテープル|
|`uwsgi_prams`|uWSGIのパラメーターとnginxの変数やテキストのマッビングテープル|
|`koi-utf`,`koi-win`,`win-urf`|キリル文字の変換テーブル|

- デフォルトのnginx.confから読み込まれているのは、mime.typesとconf.d/*.conf (インストール直後の状態ではconf.d/default.confのみ）だけ
- 他のファイルは必要になったときに読み込む
p.30

## ファイアウォールの変更
ファイアウォールでHTTPポートを開ける設定p.31
```sh
# 現在の設定を変更、すぐ反映
sudo firerwall-cmd --add-service http
sudo firewall-cmd --add-port 8080/tcp
# 次回以降の設定を変更、リロード後に反映
sudo firerwall-cmd --add-service http --permanent && firewall-cmd --reload
sudo firewall-cmd --add-port 8080/tcp --permanent && firewall-cmd --reload

# リロードしたくないなら両方いえばよい。
sudo firerwall-cmd --add-service https
sudo firewall-cmd --add-port 443/tcp
sudo firerwall-cmd --add-service https --permanent
sudo firewall-cmd --add-port 443/tcp --permanent
```

ポート番号が複数で、個々のポート番号が連続しない場合はfirewalldのサービス設定ディレクトリに、ボート番号を指定したXMLファイルを配置することで、複数のポートを一度に指定することもできます。
- /usr/lib/firewalld/services/your-service.xml
- ```xml
	<?xml version="l.0" encoding="utf-8"?>
	<service>
	<short>your awesome service</short>
		<description>long description</description>
		<port protocol="tcp" port=" 12345" /> < !-- port -->
		<port protocol="tcp" port="23456-23459" /> <! - -port range -->
		<port protocol="udp" port=" 12345" /> < !-- UDP port -->
	</service>
	```

## 起動，停止，再起動，順次リロード，順次再起動
```sh
systemctl start nginx
systemctl stop nginx
systemctl restart nginx
systemctl reload nginx # 設定の再読み込み : 新たなworkerプロセスを新たな設定で起動してから、古い設定のworkerプロセスでリクエスト処理中でないものを順次終了させる
/sbin/service nginx upgrade　# 順次再起動
```
p.33

## 安心すぎる自動アップデート
```ini
[userchost]$ sudo vi /etc/yum/yum-cron.conf
# Whether updates should be downloaded when they are available.
download_updates = yes
# Whether updates should be applied when they are available. Note
# that download_updates must also be yes for the update to be applied.
apply updates = yes (yesに変更）
```
p.24


|||
|-|-|
|ng,nx -s stop| 実行中のnginxデーモンを停止する。処理中のリクエストがあっても強制的に終了させる|
|ng,nx -s quit |実行中のnginxデーモンを停止する。処理中のリクエストが終わるのを待って終了するgracefulshutdown|
|ng111x -s reopen |実行中のnginxデーモンにログファイルを開き直させる|
|nginx -s reload |実行中のnginxデーモンに設定ファイルを再読み込みさせる|

systemctlやnginxコマンドによるnginxデーモンの制御は、実際はシグナルを送信して実現しています。そのため、killコマンドで直接シグナルを送ってnginxデーモンを制御することもできます。
nginxデーモンはmasterプロセスとworkerプロセスに分かれていますが、それぞれのプロセス
が処理できるシグナルには違いがあります。masterプロセスで処理できるシグナルは、表3-4、
worker プロセスで処理できるシグナルは、表3 -5 のようになっています• 2 0
表3-4 masterプロセスで処理するシクナル
|シグナル|内容|
|-|-|
|TERM/INT|masterおよびworkerを終了する。処理中のリクエストは考慮せず、強制的な終了|
|QUIT|masterおよびworkerを終了する。処理中のリクエストがなくなるのを待って終了するgracefulshutdown|
|HUP|設定ファイルの再読み込み。新たなworkerを新たな設定で起動してから、古いworkerをgracefulshutdownさせる。タイムゾーンの変更にも対応している|
|USR1|ログファイルを開き直す|
|USR2|新たな実行ファイルで再起動する|
|WINCH|workerをgracefulshutdownさせる|







表3-5 workerプロセスで処理するシグナル
|シグナル|内容|
|-|-|
|TERM/LNT|終了する。処理中のリクエストは考慇せず、強制的に終了する。workerに直接送られた場合は、masterが新たなworke,を立ち上げる|
|QUIT|終了する。gracefulshutdown|
|USR1|ログファイルを開き直す|
|WINCH|異常終了。デバッグのための機能|


p.37

## ログファイル
デフォルトではアクセスログ
が/var/log/nginx/access.log、エラーログが/var/log/nginx/error.lo

URL (Unifo1m Resource Localor)*2あるいはURI (Uniform Resource
Identifier)

プロトコルを示すスキーム、ホスト名、パス名、引数、フラグメン
トなどから構成される文字列です。
http://user:password@www.example.com :8080/path/to/file?a= 1& b=2#f1
- 4

4-2 設定ファイルの構造

nginxの設定ファイルでは、ディレクティブと呼ばれる設定項目を書いていきます。ディレクテイプには「；」（セミコロン）で終わるものと、「｛}」（中カッコ）を使って囲ったプロックでコンテキストを作成できるものもあります。どのプロックにも含まれない、最も外側のコンテキストをmainコンテキスト、ディレクテイプによって作成されたコンテキストは、コンテキストを作成したディレクティブの名前を付けて＜ ディレクティブ名＞ コンテキストと呼びます。たとえば、httpというデイレクテイプは、Webサーバーの設定を記述するためのコンテキストを作成しますが、httpディレクティブによって作成されたコンテキストを「httpコンテキスト」と呼びます。

それぞれのデイレクテイプは、改行を含むことができます。コメントとは異なり、行末ではなく「；」やプロックの終了までがデイレクテイプとなります。
コンテキストは入れ子構造を作ることができ、たいていは以下のような構造になります。
```ini
# mainコンテキスト

user nginx;
# worker数
worker_processes 1;
# コア数と同数のworkerを起動するには
# worker processes auto;

error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

# イベント待ち関連のパラメーター
events {
# 1つのworkerプロセスが同時に受け付けられる接続数, 、リバースプロキシ:1回のアクセスで2つの接続
	worker_connections 1024;
}
# Webサーバー全体の設定 さまざまなバーチャルホストに共通の設定
http {
	include /etc/nginx/mime.types;
	default_type application/octet-stream; # octet-stream:任意のバイナリファイルを示すContent-Type
	log_format main'$remote_addr -$remote_user [$time_local] "$request" '
		'$status $body bytes_sent "$http_referer"'
		'"$h ttp_user_ agent" "$http_x_forwarded_for"'; #ログフォーマット
	include /etc/nginx/conf.d/*.conf;
	server {
	# バーチャルホスト1の設定
		location ... {
		# URLのパス名ごとの設定
		}
	}
	server {
		# バーチャルホスト2の設定
		location ... {
			# URLのパス名ごとの設定
			}
	}
}
```
## 設定ファイルで使える変数
図4-3 nginxの内部変数
`http://www.example.com/path/to/file?a=1&b=2`
|nginx変数名|内容|
|-|-|
|$request_method|GET|
|$args, $query_string |a=1&b=2|
|$arg_a|1|
|$arg_b|2|
|$cookie_c|3|
|$host, $http_host|wwwe xamplec om|
|$uri,$ document_uri|/path/to/file|
|$request_uri|/path/to/file0a=1& b=2|
|$http_user_agent|Browser Name|
|$http_cookie|c=3|
|$is_arg|？|
|$request|GET /path/to/file?a=1& b=2 HTTP/1.1|
|$scheme|http|
|$server_protocol|HTTP/11|
|$remote_addr|リモートIPアドレス
|$remote_use|Basic認証のユーザー名|
|$request|リクエスト行|
|$request_filename|ファイル名|
|$request_method|リクエストメソッド|
|$status|レスポンスのステータス|
|$time_local|リクエストを受け付けた時刻|

# 静的なWebサイトを作るserverコンテキストの例

```ini
server {
	listen 80; #複数のserverデイレクティブがある場合も、同じポートを
ます。その場合は、server_nameデイレクティブによるホスト名の指定を使ってバーチャルホストを識別します。
	server name static.example.com;
	# ワイルドカード: *.example.com
	# 正規表現("~"つける): ~^www¥d+¥.example¥.com$
	# 優先順位
	# 完全一致>ワイルドカードに一致する最長のもの
	# 正規表現の場合は、設定ファイルを前から順番に見ていって最初にマッチするもの
	access_log /var/log/nginx/static-access.log;
	error_log /var/log/nginx/static-error.log;
	location / {
		root /www/dir;
		index index.html index.htm;
	}
}
```
locationディレクティブ
locationデイレクティブは、引数に指定されたパス名に対応するコンテキストを作ります。
locationディレクテイプにはいくつかの書式があり、優先順位のルールも比較的複雑であるた
め、nginxの設定の中でもつまづきやすいデイレクテイプといえるでしょう。
●「locationパス名 {• .• }」という書式は、パス名を前方一致させる書式です。「location/{
．．．｝」と書くとすべてのパスが一致しますし、「location/files/ { ... }」だと/files/で
始まるすべてのパスが一致します。
● 「location=バス名｛．． ．｝」のように1=」修飾子が付いた書式は完全一致を示します。
● 「location-パターン｛．． ．｝」は、正規表現でパス名を指定します。「location-* パ
ターン｛ ．．． ｝」は大文字小文字を区別しない正規表現の指定です。
● 「location--バターン{... }」は、正規表現よりも優先順位が高くなる前方一致を示し
ます。優先順位のルールについては後で示します。
● 「locationc名前｛．． ．｝」のように、先頭に「Q」を付けると、コンテキストに名前を付
ける特別な告式になり、リダイレクト先にコンテキストを指定する場合に使われます。この
書式については第5章で説明します。
locationによるマッチの対象となるパス名は、正規化されたパス名で、URLエンコード(%xx)
があればデコードされ、I.. Iや/./といった相対パスの指定、複数の連続する「／」（スラッシュ）
の排除といった処理が施された後のものです。なお、locationの引数には、変数を使うことはで
きません。


■lo cationティレクティブのf蔓先順位
server_nameと同様、locationディレクテイプも複数にマッチするものは、優先順位に従って
処理されます。優先順位は次のようなものになっています。
I. 完全一致
正規表現や前方一致ではなく、「=J修飾子が付いた書式で一致した場合、最優先で使用し
ます。
2. 前方一致の最長のもので「--」修飾子が付いたもの
修飾子のない杏式か「＾～」修飾子の付いた書式に一致するもので、最長のものを探します。
そして最長のものが「＾～」修飾子付きであればそれを使用します。
3. 正規表現で最初に一致したもの
「～」か「～ ＊」修飾子の付いた正規表現に一致するものが見つかれば、最初に見つかったも
のを使用します。
4. 前方一致の最長のもの
修飾子のない書式で最長一致するものを使用します。
完全一致でまったく同じパス名が指定された場合など、優先順位の付けられないlocationが
複数定義されているとエラーになり、nginxは、エラーを出力して起動に失敗します。修飾子なし
と「＾～ 」修飾子付きのlocationでパターンが同じ場合も、同様に前方一致となるため、エラー
になります。しかし、正規表現を使う場合は設定ファイルの出現順という順位付けがあるため、
まったく同じ正規表現を複数書いてもエラーにはなりません。
■ネストしたlocationティレクテイプ
locationディレクティブは、ネストして書くこともできます。ネストしていても、パス名は先
頭から比較されます。
1:l ocation /path/ {
2: # /path/で始まる場合
3: location /subpath/ {
4: # /su bpath/は/path/で始まらないため、どこにもマッチしない
5: }
6:}
1:l ocation /path/ {
2: # /path/で始まる場合
3: location /path/subpath/ {
4: # /path/subpath/で始まる場合
5: }
6:}
locationのネストは、優先順位の制御のために使うと便利です。locationデイレクティブは、
前方一致よりも正規表現が優先されるため、スクリプトファイルを処理するために拡張子を指定
したlocationと、スクリプト用ではない、たとえば、アップロードされたファイルを配置する
ディレクトリを同じコンテキストに並べて書いてしまうと、アップロードされたファイルの拡張
子を見て、スクリプトを実行してしまう、といった事故が起こりやすくなっています。
1: location /upload/ {
2: #アップロードされたファイル
3:}
4:
・5 .l ocation ¥. php$ {
6: #スクリプトを実行
7: # /upload/bad.phpのような場合もこちらが使用されてしまう
8:}
これを、前方一致を先に評価したい場合は、次のように書きます。
1:l ocation /upload/ {
2: #アップロードされたファイル
3:}
4:
s・.l o cation / {
6: # /upload/以下はマッチしない
7: lo cat ion -¥. php$ {
8: #スクリプトを実行
9: # /upload/bad.phpはマッチしない
10: }
11: }

■-- 修飾子
「＾～」修飾子を使うと、同じコンテキストに並べても最長一致のほうを優先できますが、修飾
子なしのlocationで、もっと長いものを書いてしまうと、そちらが優先され、正規表現でマッ
チするとさらに優先されるという動作になります。


p.61-62

1: location・- /upload/ {
2: #アップロードされたファイル
3:}
4:
5: location -¥.php$ {
6: #スクリプトを実行
7: # /upload/bad.phpにはマッチしない
8:}
1: location・-/upload/ {
2: #アップロードされたファイル
3:}
4:
5:l ocation /upload/text/ {
6: #アップロードされたテキストファイル
7:}
8:
9: location -¥.php$ {
10: #スクリプトを実行
11: # /upload/bad.phpにはマッチしない
12: # /upload/text/bad.phpだとマッチしてしまう！
13:}
4-4-4 rootとindexディレクティブ
rootディレクティブは、ドキュメントルートを設定します。ドキュメントルートといっても、
ngmxのrootデイレクティブはhttp、server、location、ifコンテキストに書けるため、特定
の条件に一致する場合のみに使われるドキュメントルートの設定ということになります。
indexディレクテイプは、ディレクトリにアクセスしたときにレスポンスに使用されるファイル
名を指定します。indexに複数のファイル名を指定すると、前から順番にファイルの存在をチェッ
クし、見つかったファイルを使用します。
1: location / {
2: root /www/dir;
3: index index.html index.htm;
4:}
indexディレクティブの最後の引数には、絶対パスを書くこともできます。たとえば、以下のように
書いた場合、/subdir/にアクセスすると「/www/dir/subdir/index.htmlJ、「/www/dir/subdir/index


htmと探していき、なかった場合は/www/dir/index.htmlを使うようになります。
index index.htmlin dex.htm /index.html;


# アクセス制限

IPアドレスによるアクセス制限
IP

1:l ocation /private {
2: deny 192 .168 .1. 1;
3: allow 192.168.1.0/24;
4: deny all;
5:}
上記の例では、 「192.l68 . l.l」からのアクセスは拒否し、「192.168.l. l以外の 192.168.1.0/24」の
範囲からのアクセスを許可、それ以外からのアクセスを拒否するという設定になります。つまり
「192.168.1.2-255」までの範囲からのアクセスのみが許可されます。
たとえば、これをアドレス順に並べ替えようとして以下のように設定してしまうとI192.168. l. l」か
らのアクセスも許可されてしまいますし、先頭にdenyallを持ってきてしまうと「192.168.1.0/24」
を含むすべてのアクセスが拒否されてしまいます。
1: location /private {
2: allow 192.16 8 .1. 0/24;
3: deny 192.168.1.1;
4: deny all;
5:}

バスワード認証によるアクセス制限
1: location /private {
2: auth_basic "enter password";
3: auth_basic_user_file /etc/nginx/htpasswd;
4:}

auth_basicデイレクテイプの引数は、realm (認証領域） として使われる文字列で、ブラウザ
のパスワード入力画面に表示されることもありますが（図4-5)、最近は表示しないブラウザも増
えてきています。引数にoffを指定するとBasic認証が無効になり、パスワードなしでアクセス
できるようになります。これは、全体にパスワードをかけておいて、特定のlocationだけパス
ワードなしでアクセスさせるといった場合に便利です。パスワードを正しく入力できない場合は、
クライアントには403(Forbidden)という応答が返ります（図4-6)。


auth_basic_user_fileには、パスワードファイルを指定します。このファイルはApacheで
使っているものと同じファイルが使えます。パスワードファイルの作成も、Apacheに付属する
htpasswdを使うとよいでしょう。インストール方法は以下のとおりです。
[userchost]$ sudo yum install httpd-tools

エンコード方式
||nginx(*9)|Apache(*10)|
|-|-|-|
|bcrypt(blowfish)| X|゜|
|Apache方式の MD5 |゜|゜|
|SHA1| ゜| ゜|
|SSHA(ソルト付き SHA1) |゜|   X|
|CRYPT|゜| ゜|
|平文 |゜| ゜|


パスワードによるアクセス制限と[Pァドレスによるァクセス制限を書いた場合ヽデフ才ルトで
は、両方で許可されたアクセスのみが許可されるという動作になります。「satisfyany;」とい
うデイレクティブを記述しておくと、いずれかの条件を満たすアクセスを許可するように動作を
変更できます。
1:l ocation /private {
2: satisfy any;
3: # 192.168.1.0/24以外はパスワードが必要
4: allow 192.168.1.0/24;
5: deny all;
6: auth_basic "enter password";
7: auth_basic_user_file /etc/nginx/htpasswd;
8:}



# Webアプリケーションの構築
![](2021-04-17-14-54-04.png)

● CGI (Common Gateway Interface)
CG! は、最も古くからある接続方法で、アクセスされるたびにWebアプリケーションのプ
ロセスを毎回起動し、パラメーターを環境変数や標準入出力でやり取りします。プロセス起
動のコストがかかるため、最近はあまり使われていません。
● FastCGI
FastCFIは、CG!の処理速度の遅さという最大の弱点を克服するために作られた接続方法
です。Webアプリケーションのプロセスがデーモンとして常駐し、パラメーターはソケット
を通じてバイナリプロトコルを使ってやり取りされます。リクエストを同時に処理する多重
化にも対応しています。性能を出しやすいため、現在も多く使われています。
● SCGI (Simple Common Gateway Interface)
SCGIは、FastCG[と同様に、Webアプリケーションのプロセスがデーモンとして常駐し、ソケットを通じてバイナリプロトコルでパラメーターをやり取りします。FastCGIと比べる
と単純で実装しやすく作られています。
● Webサーバーの拡張モジュール
拡張モジュールは、Webサーバーの内部で、Webアプリケーションが使うプログラミング
言語の処理系を動作させる接続方法です。最も性能が出る方法ですが、Webアプリケーショ
ンがWebサーバーの権限で動作する必要があり、またWebサーバーによって対応に差があ
るといった難点もあります。Apacheには各種言語のモジュールが用意されていますが、nginx
に対応するモジュールは少ない状況です。
● WSGI (Web Server Gateway Interface)
WSGIは、PythonのWebアプリケーションとやり取りするプログラミングインターフェ
イスです。リクエストパラメーターがPythonの関数に渡される引数に設定されて呼び出さ
れること、引数の形式などを規定しています。CG!やFastCGI、SCGIと比べると一段アプリ
ケーション寄りのレイヤのインターフェイスです。CG!やFastCGIやWebサーバーの拡張モ
ジュールを使って、WSGJを動作させることもできます。PythonのWebアプリケーションに
とっては、Webサーバーとの接統方法がCGIかFastCGIか拡張モジュールかによって記述
を変える必要がないため、非常に便利で人気があります。同様の仕組みが、Rack(Ruby)や
PSGI (Perl)など、他のプログラミング言語にもあります。
● TCP'ノケットのHTTPサーバー
Webサーバーのバックエンドとして、Webアプリケーションを含んだWebサーバーを動
作させ、前段のWebサーバー側でリバースプロキシを設定する方法です。Webアプリケー
ションに使われるプログラミング言語の多くは、内蔵のWebサーバーやWebサーバーとし
て動作するためのライプラリを持っており、Webサーバー側の設定も単純になるため、最近
はよく使われています。
● Unix ドメインソケットのHTTPサーバー
Webサーバーのバックエンドとして、TCPソケットの代わりにUnixドメインソケットで
Webアプリケーションを含んだWebサーバーを同ーホストで動作させ、前段のWebサーバー
側でリバースプロキシの設定をする方法です。Unixドメインソケットとは、同一ホスト内で
のプロセス間通信に使われる通信方法です。TCPのように別のホストとの通信はできません
が、ポート番号を消費せず、TCPよりも性能が出やすいため、使われることも多いようです。
アイコンに使う画像やCSS (Cascading Style Sheets)
など、動的に生成する必要のないコンテンツについては、静的ファイルとしてWebサーバーが直
接提供したほうが性能が良くなります。nginxの設定をうまく使って、静的なコンテンツと動的な
コンテンツを分類してうまく構築する
メソッドことのアクセス制限
rootやaliasといったディレクティブを使って静的なWebサイトを構築している場合は、特に
何も設定しなくてもGETやHEADといったHTTPメソッドしか許可されませんが、Webアプリケー
ションのためのサーバーやリバースプロキシとしてnginxを使っている場合に、HTTPメソッドに
よってアクセス制限をかけたい場合は、limit_exceptディレクティブを使います。limit_except
コンテキストの中にallowやdenyを沓くことにより、特定のHTTPメソッド以外のアクセスに
ついて許可と拒否を設定できます。GETメソッドを許可すると、自動的にHEADメソッドも許可さ
れます。以下のように設定した場合は、GETとHEAD、POSTメソソドは許可し、それ以外のメソッ
ドをすべて拒否するという意味になります。
1: location / {
2: limit_except GET POST {
3: deny all;
4: }
5:}
nginxではURLのパス名の書き換えはrewriteモジュールというモジュールの機能を使います。
本書のようにnginxのmainlineをインストールした場合、rewriteモジュールは最初から有効になっ
ています。rewriteモジュールが提供するディレクテイプを使うと、Webアプリケーションに必要
な告き換えルールを記述することができます。また、サイトの引っ越しやURL構造の変更のよう
なケースでのリダイレクトの設定にも対応しています。
Apacheでは、URLの書き換えをmod_rewriteだけでさまざまな処理に対応できますが、nginxの
rewriteモジュールは、rewriteモジュールだけで処理するというよりも、他の種類のデイレク
テイプと組み合わせることで、mod_rewriteと同様に複雑な処理も書くことができます。
URLの書き換えは、次の2つの処理に分類できます。
●条件判定
指定した条件に合うURLのみを書き換えるため、条件判定を付けます。条件にはホスト名
やパス名、ファイルやデイレクトリの有無などを指定します。
● URLの書き換え
URLの文字列を書き換えて変更し、変更後のURLにアクセスされたかのように振る舞い
ます。
nginxは、URLの書き換えが発生すると、書き換え後の新たなURLを対象に、条件判定とURL
の省き換えを再度行います。書き換えは、10回まで実行されます。つまり、条件判定が緩い場
合、何度も同じ書き換えをしてしまうことになります。10回以上書き換えても収束しない場合は
InternalS eiverE rror (HTTPレスポンスコード 500)になり、エラーログにエラーが出力されます。
URLの習き換えをする前に、条件によって習き換えるのか、書き換えないのか、場合分けをし
ましょう。nginxでは、条件判定の方法がいくつかあります。
■U RLのホスト部やポート番号での判定
URLのホスト部やポート番号など、バーチャルホスト単位で動作を変えたいときは、バーチャ
ルホストを定義するserverコンテキストを使って条件を指定します。あるURLへのアクセスに
対して、nginxのserverコンテキストが適用されるかどうかは、serverコンテキストの中に記述
される、listenデイレクテイプとserver_nameデイレクテイプによって決まります。
listenディレクティブは、第4章で紹介したように、ポート番号やTPアドレスでバーチャル
ホストを指定します
server_nameデイレクティブも、第4章で紹介しましたが、完全なサーバー名やワイルドカー
ドに加えて、正規表現によるパターンマッチもできるようになっており、柔軟にサーバー名を指
定することができます。正規表現の指定をURLの書き換えに生かすこともできます。
正規表現によるパターンマッチの場合、カッコで囲んだ部分を別の場所で参照することができ
ます。このことをキャプチャを呼びます。次のようにserver_nameを指定している場合を考えて
みましょう。
server _name --(www¥.)?(.+)$;
カッコで囲まれた部分は「www¥.」と「． ＋」の2つがあり、それぞれの部分が変数$1と$2に入り
ます。？は、直前の要素が0個か1個ある場合にマッチするため、この正規表現はホスト部がWWW.
で始まる場合もそうでない場合もマッチします。したがって、四w.example. comのようにホスト
部が匹w.で始まる場合は$1がWWW. になり、$2がexample.comになります。test.example.com
のようにサーバー名がwww.で始まらない場合は、$1が空文字列で$2がtest.example.comとな
ります。
次のように、キャプチャに名前を付ける書式もあります。$1や$2といったキャプチャは、
locationデイレクティブやrewriteデイレクティブなどで、他の正規表現を使った場合に上書
きされてしまいますが、名前を付けることで区別できます。
server _name --(www¥.)?(?<domain>.+)$;
2個目のカッコの先頭の「？く変数名＞」の部分が名前付きキャプチャです。この例では$1には先
ほど同様にWWW.もしくは空文字列、$2および$domainという変数に、ドメイン部分の文字列が
入ります。この変数はURLの書き換え動作や条件判定、その他のデイレクティブの引数にも指定
できます。名前付きキャプチャには以下のような書式があり、いずれも同じ意味になります。
□桓已（？ ＜変数名＞正規表現）
立（？変数名正規表現）
〔五(?P<変数名＞正規表現）
正規表現にカッコを使っても、キャプチャしたくないという場合は、「（？： 正規表現）」という書
式を使うことでキャプチャされなくなります。
nginxは、正規表現の処理にはPCREというPerl形式の正規表現ライブラリを使っています。
nginxで使える正規表現やキャプチャの書式については、PCREのドキュメントを参考にしてくだ
さい• l o
■バス名での判定
URLのパス名を条件に使いたいときは、第4章で説明した、locationディレクティブを使い
ます。locationコンテキストの中に、書き換えディレクテイプを記述することで、URLの書き
換えが特定のパス名にマッチする場合のみに限定できます。
locationディレクテイプも正規表現を使うことができ、server_nameと同様に、キャプチャや
名前付きキャプチャを使うことができます。
1:location --;pathl/(.+¥.(7<ext>gifljpe7glpng))$ {
2: # /pathl/test.gif
3: # ↓
4: # $1にtest.git
5: # $2と$extにgifが入る
6:}
■ファイルやテイレクトリの有無での判定
ファイルやデイレクトリの有無を条件にして書き換えをしたい場合は、try_filesデイレクティ
ブを使います。
try_filesデイレクテイプは、複数の引数を受け、前から順番にファイルの存在確認をしてい
きます。ファイルが見つかったところで、そのファイルの内容を返します。なければ最後の引数
の処理をします。
1: location -~;path1(?<subpath>/.+)$ {
2: try_files $subpath $subpath/ /newpath$subpath;
3: # /pathl/dir/file
4: # ↓
5: # /dir/file→ /dir/file/→ /newpath/dir/fileの順番で探す
6:}
■条件式による判定
ifデイレクティブは、さまざまな条件判定ができます。
1:if C条件）｛
2: #条件に合う場合
3:}
ifディレクテイプには、以下のような条件を指定することができます。
●変数名
変数が空文字列か「0」以外であれば真になります。
●変数や文字列の比較（＝と！＝ ）
「＝」は内容が一致する、「！＝ 」は一致しない場合に真になります。
●変数や文字列と正規表現のマッチ（～と～＊、！～と！～ ＊）
「1が大文字小文字を区別し、「～＊」は区別せずに正規表現にマッチするかどうかを評価
します。「！～」と「！～＊」はそれぞれマッチしないときに真になります。正規表現にはキャプ
チャを指定でき、変数に取り込んで参照することができます。
●ファイルが存在する(-f)/ファイルが存在しない(!-f)
「-f パス名」でファイルが存在する場合に真になり、「！ーf パス名」で存在しない場合に
真になります。ファイル名は絶対パスで指定します。
●ティレクトリが存在する(-d)/ディレクトリが存在しない(!-d)
「-d パス名」でディレクトリが存在する場合に真になり、11-d パス名」で存在しない場
合に真になります。
●ファイル／ディレクトリ！シンボリックリンクが存在する(e)/ファイル／ディレクトリ／シンボ
リックリンクが存在しない(!-e)
「-e パス名Jでファイルやディレクトリ、シンボリックリンクのいずれかが存在する場合
に真になり、「！ーe バス名」で存在しない場合に真になります。
●実行ファイルが存在する(-x)/実行ファイルがない(!-x)
「-x パス名」で実行ファイルが存在する場合に真になり、「!-x パス名」で存在しない場
合に真になります。
ifを使ったnginxの設定ファイルを見ていると、まるでプログラミング言語のようにも思えて
しまいますが、ifディレクティブにはさまざまな制約があり、複雑な条件判定をするのが難しく
なっています。たとえば、引数の条件は1つしか記述できず、ANDやORで複数の条件を単独の
ifディレクティブで指定することはできません。また、ifはserverコンテキストかlocation
コンテキストにしか記述できず、ネストして書くこともできません。elseやelseifといった書式
もないため、条件にマッチする場合とマ；；チしない場合の両方の設定を書きたい場合には、同じ
ような条件のifディレクテイプが並ぶことになります。
開発元も「IfIs Evil」と題した文書を出して、あまり推奨しない機能となっています•2 。実際に
ifを使ってみると、少し複雑な設定を書くだけで思ったとおりの動作をしなくなってしまうこと
も多いようです。
それでも、複数の条件で判定したい場合は、setデイレクティブで変数に文字列を追加してい
き、最後に文字列比較のifデイレクティブで処理するというテクニックがあります。
1:if C条件A) {
2: set $test A;
3:}
4: if C条件8) {
5: set $test "${test}B";
6:}
7:if C条件C) {
8: set $test "${test}C";
9:}
10: if ($test - [AB] C){
11 : #( A II B) &&C
12:}
■g eoディレクテイプによるアクセス元IPアドレスの判定
クライアントのIPアドレスを判定して変数に値を入れる場合は、geoデイレクティブを使うの
が便利です。geoという名前からは地理情報に関連するような印象を受けるかもしれませんが、地
理情報を扱うわけではなく、アクセス元IPアドレスをCIDR形式でマッチさせて変数に値を入れ
るデイレクティブです。geoデイレクティブはserverコンテキストの外側、httpコンテキスト
に書く必要があります。
1:g eo $from {
2: default external;
3: 192.168.0.0/16 internal;
4: 10.0.0.0/8 internal，・
5:}
6: server {
7: root /var/www/$from;
8: #内部用は/var/www/internal
9: #外部用は/var/www/external
10:}
■re turnティレクティフによるリダイレクト
Webサイトの移転などでURLが変わった場合、HTTPのリダイレクト機能でクライアントに移
転先のURLを通知することで、ブラウザは、自動的に移転先のURLにアクセスするようになり
ます。
リダイレクトには、returnディレクテイプを使います。
return 301 http://www.example.com/;
return http://www.example.com/;
returnディレクティブの第1引数はHTTPのレスポンスコードです。省略された場合のレス
ポンスコードは302(Moved Temporarily)です。指定されたレスポンスコードが301、302、303、
307といったリダイレクト用のものであれば、第2引数のURLにリダイレクトされます。それ以
外のレスポンスコードの場合は、レスポンスボデイのテキストになります。第2引数が省略され
た場合は、デフォルトのエラー文字列が使われます。
return 404 "not found.";
クライアントの挙動によりますが、HTTPのリダイレクトはGETメソッドで使うもので、POSTメ
ソッドに対してリダイレクトしようとすると、リダイレクト先にはGETメソッドに変換されてア
クセスします。307 (Temporary Redirect)というレスポンスコードを使うとPOSTメソッドやPUT
メソッドでもそのままリダイレクトされますが、レスポンスコード307への対応は比較的新しい
プラウザに限定されます。
HTTPの仕様にはない、nginxで使っている特別なレスポンスコードに、444があります。「return
444;」と書くと、nginxはHTTPヘッダも送信せずに接続を切ってしまいます。

### rewriteティレクテイプによる書き換え
rewriteディレクティブは、クライアントに見せるURLはそのままで、別のURLにアクセス
したかのような内容を返します。
```
rewrite 正規表現 置換文字列［フラグ］；
```
◎ フラクの指定
フラグの指定はredirect、permanent、last、breakと、フラグを付けない場合の5種類があります。redirectとpermanentは、それぞれ302(Moved Temporarily)と30I (Moved Permanently)
でリダイレクトを行います。残りの3種類は少々複雑です。
フラグなし
フラグなしの場合、URL書き換えの動作をそのまま続けます。
lastフラグ
lastフラグを使った場合、その回のURL書き換え動作を打ち切り、次の回のURL書き換えに進
みます。以下の例では、/lastが/a_lastに巻き換えられたところでlastフラグにより、/a_last
から/b_lastへの杏き換えが実行されません。次の回では/a_lastは後半のlocationの範囲に入るため、/a_lastから/c_lastに書き換えられ、/c_lastはこれ以上書き換えられないため、ア
クセス先は/c_lastになります。
1: # /last→ /a_last→ /c_lastに沓き換えられる
2: # (lb_lastには杏き換えられない）
3:l ocation /last {
4: rewrite "/last /a_last last;
5: rewrite "/a_last /b_last last;
6:}
7:
8:l ocation /a_last {
9: rewrite "/a_last /c_last last;
10:}
● breakフラグ
breakフラグを使うと、そこですべてのURL書き換え動作を打ち切ります。以下の例では、
/breakが/a_breakに書き換えられたところで書き換え動作が打ち切られるため、アクセス先
は/a_breakになります。
1: # /break→ /a_breakに翡き換えられる
2: # (/b_breakや/c_breakには湛き換えられない）
3: location /break {
4: rewrite -;break /a_break break;
5: rewrite ~;a_break /b_break break;
6:}
7:
8: location /a_break {
9: rewrite ~;a_break /c_break break;
10:}
locationディレクティフの＠プレフィックス

locationデイレクティブの特別な書式「location@名前｛ ．．．｝」は、名前付きlocationと
呼ばれており、パス名に直接マッチすることはありません。名前付きlocationは、コンテキストに
名前を付けておき、error_pageやpost_action、try_filesといったディレクティブの引数で、
醤き換え先の指定に使います。この書式のlocationデイレクテイプは、ネストすることはでき
ません。あくまでもパス名とは無関係に、コンテキストを定義するための書式です。
1:l ocation / {
2: #ファイルが見つからなければWebアプリケーションヘ
3: try_files $uri $uri/cfallback;
4:}
5: locationcfallback {
6: # Webアプリケーションに転送
7: proxy_pass http://backend;
8:}
5-3-4 internalティレクティフ
locationコンテキストの中に「internal;」というディレクティブを指定すると、＠ フ゜レフィッ
クスと同様にクライアントが指定したパス名に直接マッチしなくなり、rewriteやtry_filesと
いったデイレクテイブの、書き換え先で使われます。＠プレフィックスとの違いは、locationの
マッチが普通のlocationと同様で、rewriteによる書き換え先パス名に対してマッチさせられ
る点です。一方で、＠プレフィックスはerror_page、post_action、try_filesによる転送先以
外には使うことができません。

# PHP (PHP-FPM)でWordPressを動かす
Webアプリケーションの最初の事例として、WordPressの設定を紹介します。WordPressは、PHP
で書かれたブログサーバーで、プログを梢築するWebアプリケーションとしては最も人気があり
ます。
Apacheには、PHPの拡張モジュール(mod_php)がありますが、nginxにはPHPのモジュール
がないため、FastCGJのインターフェイスを使ってPHPのプログラムを動作させる、PHP-FPM
(FastCGJ Process Manager)と呼ばれるプログラムを使って接続します。PHP-FPMのデーモンを
設定して起動したうえで、nginxにはFastCGlで接続するように設定します（図5-2)。

![](2021-04-17-16-07-34.png)


```sh
yum install php-fpm php-mysql
```
### ■P HP-FPMの構造
PHP-FPMは、プールと呼ばれる、Webサーバーで言うバーチャルホストのようなかたまりを複
数作ることができます。プールごとに同時接続数やプロセスの数を指定でき、プロセスやソケッ
トは別のものを使います。使用するPHPアプリケーションごとにPHP-FPMのプールを作り、使
用する資源を分けるといった使い方をします。PHP-FPMは、nginxと同様にmasterとworkerプ
ロセスがおり、masterプロセスがworkerプロセスの起動や監視を行い、workerプロセスがリクエ
スト処理を実行します。

■P HP-FPMの設定ファイル
PHP-FPMの設定ファイルは、/etc/php-fpm.iniと/etc/php-fpm.d/*.confです。/etc/phpfpm.
iniにはログ出力先などの基本設定があり、/etc/php-fpm.d/*.confにはプールごとの動
作に関する設定があります。デフォルトで用意されているプールはWWWという名前のプールで、
/etc/php-fpm.d/www.confに設定があります。
■ WWWフールの設定
このWWWプールをnginx用に設定してみましょう。listenの項目でデフォルトのTCPソケッ
トの代わりにUnixドメインソケットを利用するように設定し、PHP-FPMのworkerプロセスを実
行するユーザー名を「nginx」に指定します。このように設定すると、PHP-FPMのworkerプロセ
スはnginxと同じユーザーの権限で動作するため、PHPプログラムとnginxの権限の違いによっ
てファイルにアクセスできたりできなかったりといったトラブルを起こしにくくなります。
```sh
vi /etc/php-fpm.d/www.conf

listen = /var/run/php-fpm.sock

user = nginx
group = nginx

```
### WordPressのインストール
Word Pressをインストールしてnginxを設定しましょう。WordPressの公式サイトから最新版の
WordPressをダウンロードして、デイレクトリに展開します。
● WordPressの公式サイト
https://ja.wordpress.org/
[userchost]$ sudo mkdir -p /var/www/php-fpm.example.com
[userchost]$ cd /var/www/php-fpm.example.com
[userchost]$ sudo tar xfz wordpress-X.Y.Z-ja.tar.gz (X.Y.Zは、WordPressのパージョン番号）
[userchost] $ sudo chown -R nginx. wordpress (ダウンロードしたファイル名の番号に置き換え



### nginxの設定
nginxの設定は、次のようになります。
```nginx
server {
	root /var/www/php-fpm.example.com/wordpress;
	index index.php;
	location ~ \.php$ {
		try_files $uri =404;
		include fastcgi_params; # FastCGIでよく使われる変数を設定したファイル/etc/nginx/fastcgi_paramsを読み込む
		fastcgi_index index.php;
		fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name; # FastCGIで使う変数を追加で設定
		fastcgi_pass unix:/var/run/php-fpm.sock; # FastCGIサーバーの待ち受けアドレス
	}
	location / {
	try_files $uri $uri/ /index.php?$args;　# .phpファイル以外のアクセスに対応しています。try_filesでファイルがあればファイルを返し、ディレクトリがあればディレクトリヘのアクセスの扱いになり、ファイルもデイレクトリもなければ/index.phpにアクセスします。?$argsは与えられたクエリ文字列を/index.phpにも渡すという意味
	}
}
```

9 Tips for Im proving WordPress P erformance
https://www.ngiruc.com/blog/9-tips-for-improving-wordpress-performance-with-nginx/


Mariadb

```sh
[userchost]$ sudo yum install mariadb-server
[userchost]$ sudo systemctl start mariadb
[userchost]$ sudo systemctl enable mariadb
[userchost]$ mysqladmin -uroot create wordpress
[userchost]$ mysql -uroot
MariaDB [(none)]> GRANT ALL PRIVILEGES ON wordpress.* TO (ユーザー名） clocalhost ¥
IDENTIFIED BY'(パスワード）＇ ・
Query OK, 0 rows affected (0.00 sec)
```
### PHPのPATH_INFO
PHPプログラムではPATH_INFOという変数
を使うことがよくあります。これは/dir/file.phpというスクリプトファイルがあるときに、
/dir/file.php/arg1のように、パス名で引数を指定するやりかたです。このようなパス名には
「location-¥.php$」という表現ではマッチしません。PATH_INFOに対応する場合は、以下のよ
うにもう少し複雑な正規表現で設定します。
1: server {
2: location - ["/]¥.php(/1$) {
3: fastcgi_split_path_info・(.+7 ¥. php) (/.*) $;
4: if (! -f $document_root$fastcgi_script_name) {
5: return 404;
6: }
7: include fastcgi_params;
8: fastcgi_index index.php;
9: fastcgi_param PATH_INFO $fastcgi_path_info;
1O : fastcgi_param SCRIPT_ FILENAME $document_root$fastcgi_script_name;
11: fastcgi_pass unix: /var /run/php-fpm. sock;
12: }
13:}
