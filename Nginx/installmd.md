# INSTALL

For CentOS7
```sh
echo SELINUX=disabled >> /etc/selinux/semanage.conf
echo \
"[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/mainline/centos/7/$basearch/
gpgcheck=l
enabled=l
gpgkey=http://nginx.org/keys/nginx_signing.key
[nginx-source]
name=nginx source
baseurl=http://nginx.org/packages/mainline/centos/7/SRPMS/
gpgcheck=1
enabled=O
gpgkey=http://nginx.org/keys/nginx_signing.key
" |>/mnt/c/Users/nominalrune0000008.txt /etc/yum.repos.d/nginx.repo
yum install -y nginx yum-cron
```
