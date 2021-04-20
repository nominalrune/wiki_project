# WP
こｋにURLがたんまり入っている。
mysql> SHOW FIELDS FROM wp_options;
+--------------+---------------------+------+-----+---------+----------------+
| Field        | Type                | Null | Key | Default | Extra          |
+--------------+---------------------+------+-----+---------+----------------+
| option_id    | bigint(20) unsigned | NO   | PRI | NULL    | auto_increment |
| option_name  | varchar(191)        | NO   | UNI |         |                |
| option_value | longtext            | NO   |     | NULL    |                |
| autoload     | varchar(20)         | NO   | MUL | yes     |                |
+--------------+---------------------+------+-----+---------+----------------+



SELECT * FROM wp_options WHERE option_value LIKE '%https://hogehoge%';
であぶり出す。ALLinOneSEOがひどいことになっている。
UPDATE * FROM wp_options WHERE option_value LIKE '%https://hogehoge%' VALUE("https://127.0.0.1:2443");
