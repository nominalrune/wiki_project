# 機能設計
基本的にnamespaceで機能の切り分けをしていくべき。

バニラ
```php
<?php
nanespace gkpotal;
use gkpotal\Functions\ui\scroll\scroll
```
```php

<?php
nanespace gkpotal\Functions\ui\scroll

function scroll()
{
  /** do something about scrolling */;
};



```
