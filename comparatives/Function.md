# PHP
## 概要
- 基本的に、`［"文字列"+()］`という成り立ち方をしている。
	- `"文字列"();`でも呼べる。まじで。
	   ```php
	   function exponentiate(int $num):int {return $num**$num;};
	   
	   exponentiate(3);
	   // => 27
	   "exponentiate"(3);
	   // => 27
	   // => What????
	   ```
- 関数を定義した文字列と同じ文字列を`define`で定数定義しても、エラーにならず、平行的に機能する。
	```php
	function Hello(){return "Hello func";};
	hello();
	// => "Hello func"
	define("hello","hello CONST");
	// => true
	hello;
	// => "hello CONST"
	hello();
	// => "Hello func"
	```





## 定義する
### 引数
### スコープ
### 型宣言の詳細
## 呼ぶ
### 構文
```php
// Psy Shell v0.10.8 (PHP 8.0.7 — cli) by Justin Hileman
$a=function($num){return $num**$num;};
// => Closure($num) {#2611 …2}
$a(3);
// => 27
$a='alice';
// => "alice"
$a(3);
// PHP Error:  Call to undefined function alice() in Psy Shell code on line 1
function alice($num){return $num**$num;};
alice(3);
// => 27
$a(3);
// => 27
// => What??
"alice"(3);
// => 27
// => What????
```
### 場所
## 渡す
### 構文
### 場所

> - All functions and classes in PHP have the global scope - they can be called outside a function even if they were defined inside and vice versa.
> https://www.php.net/manual/en/functions.user-defined.php
> - PHP does not support function overloading, nor is it possible to undefine or redefine previously-declared functions.
> https://www.php.net/manual/en/functions.user-defined.php
> - Note: Function names are case-insensitive for the ASCII characters A to Z, though it is usually good form to call functions as they appear in their declaration.
> https://www.php.net/manual/en/functions.user-defined.php

> - PHP supports the concept of variable functions. This means that if a variable name has parentheses appended to it, PHP will look for a function with the same name as whatever the variable evaluates to, and will attempt to execute it. Among other things, this can be used to implement callbacks, function tables, and so forth.
> https://www.php.net/manual/en/functions.variable-functions.php

# Typescript(JS)


# Python
