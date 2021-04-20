# install.md


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
