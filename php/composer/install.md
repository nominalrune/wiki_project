https://getcomposer.org/download/

# win
win has installer. just download it.

# linux
- check if you already have one.
	```sh
	composer --version
	```
- you shouldn't yum or apt.
	- if you did, just `apt remove composer`

- do this. (set your path with `--install-dir`)
	```sh
	php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
	php composer-setup.php --filename=composer --install-dir=/usr/local/bin
	php -r "unlink('composer-setup.php');"
	```
