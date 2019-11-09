---
layout: post
title: Elasticsearch的安装和简单配置
tags: Elasticsearch 搜索引擎 Java 数据库 Linux
categories: Elasticsearch
---

# 安装

## 下载地址

https://www.elastic.co/cn/downloads/elasticsearch

## 安装

下载好安装包之后，解压缩文件：

```shell
tar -zxvf elasticsearch-7.4.2-linux-x86_64.tar.gz
```

# 文件目录结构

| 目录    | 配置文件          | 描述                                       |
| ------- | ----------------- | ------------------------------------------ |
| bin     |                   | 脚本文件，包括启动elasticsearch,安装插件等 |
| config  | elasticsearch.yml | 集群配置文件，user ,role based相关配置     |
| JDK     |                   | JAVA运行环境                               |
| data    | path.data         | 数据文件                                   |
| lib     |                   | Java类库                                   |
| logs    | path.log          | 日志文件                                   |
| modules |                   | 包含所有ES模块                             |
| plugins |                   | 包含已安装的插件                           |

# 启动ES

## 报错提示

```shell
future versions of Elasticsearch will require Java 11; your Java version from [/usr/local/java/jdk1.8/jdk1.8.0_171/jre] does not meet this requirement
[2019-11-09T00:47:38,667][WARN ][o.e.b.ElasticsearchUncaughtExceptionHandler] [izbp12hdvl4ksivp63qmfrz] uncaught exception in thread [main]
org.elasticsearch.bootstrap.StartupException: java.lang.RuntimeException: can not run elasticsearch as root
	at org.elasticsearch.bootstrap.Elasticsearch.init(Elasticsearch.java:163) ~[elasticsearch-7.4.2.jar:7.4.2]
	at org.elasticsearch.bootstrap.Elasticsearch.execute(Elasticsearch.java:150) ~[elasticsearch-7.4.2.jar:7.4.2]
... ...
```

以上信息提示，有2点：

1. 提示本地为jdk8,而当前版本的ES需要jdk11版本，新版的ES是内置的java环境，所以此提示可以忽略

2. elasticsearch不能以root用户启动的

## 解决方法

### 添加用户组和用户

```shell
groupadd elsearch
useradd elsearch -g elsearch
```

### 修改es文件夹所属用户和用户组

```shell
chown -R elsearch:elsearch  /usr/local/webserver/elasticsearch-7.4.2
```

### 切换用户

```shell
su elsearch
```

### 启动es

```shell
bin/elasticsearch
```

## 验证

请求自己的IP地址:9200，就会出现下面的结果:

```shell
[root@iZuf6b8f6yfdzu95aqolkcZ ~]# curl 127.0.0.1:9200
{
  "name" : "iZuf6b8f6yfdzu95aqolkcZ",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "bD_B1QMnRDqXgbNCG-wKxw",
  "version" : {
    "number" : "7.4.2",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "2f90bbf7b93631e52bafb59b3b049cb44ec25e96",
    "build_date" : "2019-10-28T20:40:44.881551Z",
    "build_snapshot" : false,
    "lucene_version" : "8.2.0",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

即表示启动成功。

# 外网访问

如果要使用外网访问，需要配置以下内容

## 修改配置

```shell
vim config/elasticsearch.yml
```

修改以下配置

```shell
network.host: 0.0.0.0
http.port: 9200
network.publish_host: 要发布的IP地址
```

## 阿里云开放端口

安全组配置9200端口即可

## 防火墙问题

如果还不能访问则需要配置防火墙端口

```shell
firewall-cmd --zone=public --add-port=9200/tcp

防火墙相关命令

查看防火墙已经开放的端口
firewall-cmd --list-ports 

启动 
systemctl start firewalld  

查看状态
systemctl status firewalld   

停止
systemctl disable firewalld 

禁用
systemctl stop firewalld

```

## 重新启动

### 报错

做了以上修改之后，重新启动ES，发现启动报错了，信息如何：

```shell
ERROR: [2] bootstrap checks failed
[1]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]

[2]: the default discovery settings are unsuitable for production use; at least one of [discovery.seed_hosts, discovery.seed_providers, cluster.initial_master_nodes] must be configured
```

### 解决方案

1. 切换root用户，修改` /etc/sysctl.conf`配置

   ```shell
   vim /etc/sysctl.conf 
   
   # 添加配置
   vm.max_map_count = 655360
   
   # 执行以下命令
   sysctl -p
   ```

2. 切换root用户

   ```shell
   vim /etc/security/limits.conf
   # 添加
   * soft nofile 65535
   * hard nofile 65535
   
   vim /etc/security/limits.d/20-nproc.conf
   #修改
   *          soft    nproc     4096
   
   vim config/elasticsearch.yml
   
   # 取消注释 保留一个节点
   cluster.initial_master_nodes: ["node-1"]
   
   ```

3. 重启es,成功，即大功告成。现在即可以通过外网成功访问。

   ![](/Users/yunli/liyun.github.io/static/img/es_success.png)

# 插件安装

## 查看插件

```shell
bin/elasticsearch-plugin list
```

## 安装插件

```shell
bin/elasticsearch-plugin install 插件名
```

如安装 `analysis-icu`

```shell
[root@iZuf6b8f6yfdzu95aqolkcZ elasticsearch-7.4.2]# bin/elasticsearch-plugin install analysis-icu
-> Downloading analysis-icu from elastic
[=================================================] 100%   
-> Installed analysis-icu
[root@iZuf6b8f6yfdzu95aqolkcZ elasticsearch-7.4.2]# bin/elasticsearch-plugin list
analysis-icu
```

## 页面查看安装的插件

`http://外网IP:9200/_cat/plugins`



