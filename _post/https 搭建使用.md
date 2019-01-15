# https 搭建使用

https://certbot.eff.org/#centosrhel7-nginx

https://mozilla.github.io/server-side-tls/ssl-config-generator/



## 1.下载安装certbot

```
yum install epel-release
yum install certbot
```

## 2.创建配置

```
$ certbot certonly
```

执行该命令，certbot将会自动创建`/etc/letsencrypt/`目录，该目录将存放配置内容

```
$ certbot certonly --webroot -w /var/www/example -d example.com -d www.example.com
```

-w : 网站根目录

-d : 网站目录挂载的域名，几个域名就要几个-d参数

执行该命令时，终端会弹出一个窗体要求填写邮箱地址，填完后回车；

会有几秒的请求等待，勿着急

## 3.配置nginx

**注意：nginx 版本要求 1.9 以上, nginx 要加载 http_v2_module**

在nginx的配置文件中的`server`节点下加入以下内容：

    listen       443 ssl http2;
    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_dhparam /etc/nginx/ssl/dhparam.pem;
    ssl_trusted_certificate /etc/letsencrypt/live/example.com/root_ca_cert_plus_intermediates;
    resolver 223.5.5.5 223.6.6.6 114.114.114.114 8.8.8.8;


`/etc/letsencrypt/live/example.com/privkey.pem`

`/etc/letsencrypt/live/example.com/fullchain.pem`

以上2个文件由certbot生成



`ssl_dhparam`可通过以下命令生成

```
mkdir /etc/nginx/ssl
openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2048
```



`ssl_trusted_certificate`是CA的证书链，通过以下命令生成

```
$ cd /etc/letsencrypt/live/example.com
$ wget https://letsencrypt.org/certs/isrgrootx1.pem
$ mv isrgrootx1.pem root.pem
$ cat root.pem chain.pem > root_ca_cert_plus_intermediates
```



`resolver`的作用是解析ocsp服务器域名，建议填写供应商DNS

配置好之后现检测nginx配置文件的语法，正确之后再重启nginx

## 4.自动定期更新安全证书