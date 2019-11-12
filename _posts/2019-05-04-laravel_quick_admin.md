---
layout: post
title: Laravel_quick_admin
tags: PHP Laravel RABC
categories: PHP
---

## 介绍

项目技术栈：基于laravel5.5 + H-ui开发的一款基础后台管理系统

项目地址：https://github.com/tsmliyun/laravel_quick_admin

项目图片：

![qa_role](https://tsmliyun.github.io/static/img/qa_role.png)

![qa_login](https://tsmliyun.github.io/static/img/qa_login.png)

## 背景

起这个项目的初衷是，对于一个后台管理系统，登陆、注销、权限管理等都是些公用的模块，完全可以封装成一个基础项目，每次新的项目基于基础项目上开发即可，节约时间，提高开发效率。

## 功能模块

- 登陆
- 找回密码
- 修改密码
- 注销
- 管理员管理
- 权限管理
- 角色管理
- 支持多语言

## 代码模块

- route
- controller
- service
- model
- log
- request
- Repository  (关于这个仁者见仁智者见智吧)

## 项目搭建

比较简单，主要以下几步

1. `composer install`
2. 修改`.env`文件相关配置
3. 执行`laravel_quick_admin/laravel_quick_admin.sql`文件中的sql语句
4. 登陆信息：账号：1234@qq.com 密码：1234

## 注意点
因为博主用的数据库是mariadb，创建时间和更新时间的默认值为current_timestamp(),如果你是mysql的话，应该修改为CURRENT_TIMESTAMP

## 感谢

Laravel -- 优雅的 PHP Web 开发框架

H-ui -- 轻量级前端框架