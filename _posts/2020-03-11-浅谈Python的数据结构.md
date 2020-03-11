---
layout: post
title: 浅谈Python的数据结构
tags: Python PHP 数据结构
categories: Python
---

## 背景

最近在学习Python，本文主要记录在学习Python时关于数据结构的一些心得。

## 数据结构

### 列表

```python
# 列表 demo
shopList = ['apple', 'mango', 'carrot', 'banana']

# len() 计算列表长度
print(len(shopList))

# 遍历列表
for item in shopList:
    print(item, end=' ')
    
# 追加元素
shopList.append('rice')
print('My shopping list is now', shopList)

# 排序
shopList.sort()
print('My shopping list is now', shopList)

# 删除元素
del shopList[0]
print('My shopping list is now', shopList)

# 列表中插入元素
shopList.insert(1, 'red')
print('My shopping list is now', shopList)

# 列表尾部移除元素
shopList.pop()
print('My shopping list is now', shopList)
```

> Python中的列表类似于PHP中的数值数组



### 元组

```python
# 元组 demo
zoo = ('python','elephant','penguin')

# len() 计算长度
print(len(zoo))

# 访问元组中的值
print(zoo[1])

```

> 元组和列表非常类似，但是元组初始化后值不可以修改。

### 字典

```python
# 字典的demo
ab = {
    'Swaroop': 'swaroop@swaroopch.com',
    'Larry': 'larry@wall.org',
    'Matsumoto': 'matz@ruby-lang.org',
    'Spammer': 'spammer@hotmail.com'
}

# 访问字典中的元素
print(ab['Swaroop'])
print(ab.get('Swaroop'))

# 赋值
ab['test'] = 'test'
print(ab)

# 删除元素
ab.pop('Larry')
print(ab)

del ab['Spammer']
print(ab)

# 遍历字典
for name, address in ab.items():
    print('Contact {} at {}'.format(name, address))
```

> Python中的字典类似于PHP的关联数组

### 集合

```python
# 集合demo
bri = set(['bra','rus','ind'])

# 新增元素
bri.add('test')
print(bri)

# 移除元素
bri.remove('rus')
print(bri)

# 判断元素是否存在集合中
print('bra' in bri)
```

## 总结

以上列举了Python中四大数据结构的简单用法。如有错误，欢迎指正。

趁着疫情期间，多学习学习~

