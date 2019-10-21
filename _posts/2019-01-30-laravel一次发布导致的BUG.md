---
layout: post
title: Laravel一次发布导致的bug
tags: PHP Laravel
categories: PHP
---


## 背景

laravel项目的某一次发布后，项目中连接数据库突然报错，而用同样的数据库账号密码在机器上连接是可以的。

## 临时解决方案

经过短暂时间的排查，没找到原因，原数据库密码`DB_PASSWORD=abcde#142!*`,修改数据库密码为`DB_PASSWORD=abcde2019`后，恢复正常。

## 排查思路

变更密码后，数据库能正常连接，可见是密码问题，同时同样的密码在项目中访问数据库失败而在机器上可以访问成功，可判断是环境问题导致的密码问题。

在项目中打印数据库连接配置的日志,如下：

```
Array
(
    [driver] => mysql
    [host] => xxx
    [port] => xxx
    [database] => xxx
    [username] => xxx
    [password] => abcde
    [unix_socket] => 
    [charset] => utf8mb4
    [collation] => utf8mb4_unicode_ci
    [prefix] => 
    [strict] => 1
    [engine] => 
)
```

可见密码配置在env中为`DB_PASSWORD=abcde#142!*`，但是在PHP代码中读取的数据库密码配置为`abcde`，可见#后面的内容代码中认为是注释，从而忽略了。

继续查看jenkins发布日志，发现了有一段日志输出：

```php
Package operations: 0 installs, 3 updates, 0 removals
  - Updating vlucas/phpdotenv (v2.5.2 => v2.6.0): Downloading (connecting...)Downloading (0%)           Downloading (15%)Downloading (100%)
```

发布过程中，有一个依赖包的升级。

查看`vlucas/phpdotenv`的文档，看到以下说明：

### Comments

You can comment your `.env` file using the `#` character. E.g.

```php
# this is a comment
VAR="value" # comment
VAR=value # comment
```

## 解决方案

.env文件中，对密码字段加上双引号,如`DB_PASSWORD="abcde#142!*"`，然后一切恢复正常。

建议.env文件中，环境变量的配置，最好都加上""，避免出现意外的灾难。

# 