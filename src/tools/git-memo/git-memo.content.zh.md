## 配置

设置全局配置

```shell
git config --global user.name "[姓名]"
git config --global user.email "[邮箱]"
```

## 开始使用

创建一个git仓库

```shell
git init
```

克隆一个已存在的git仓库

```shell
git clone [url]
```

## 提交

提交所有已跟踪的更改

```shell
git commit -am "[提交信息]"
```

将新修改添加到上次提交中

```shell
git commit --amend --no-edit
```

## 我搞砸了

修改上次提交的信息

```shell
git commit --amend
```

撤销最近一次提交并保留更改

```shell
git reset HEAD~1
```

撤销最近N次提交并保留更改

```shell
git reset HEAD~N
```

撤销最近一次提交并丢弃更改

```shell
git reset HEAD~1 --hard
```

将分支重置为远程状态

```shell
git fetch origin
git reset --hard origin/[分支名]
```

## 其他

将本地master分支重命名为main

```shell
git branch -m master main
```
