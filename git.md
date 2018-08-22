```javascript
git init // 初始化 git 仓库
git status // 查看当前 git 仓库状态
git add test.md // 提交文件到缓冲区
git commit -m "commit reason" // 提交文件到 git 仓库 commit
git log // 查看提交历史 SVN log
git branch // 显示当前分支状态
git branch a // 创建一个分支 a
git checkout filename // 撤销 add 以后的filename
git checkout a // 切换到分支 a
git checkout -b a // 创建一个分支 a 并切换到 a
git merge a // 先切换到 master 分支上，执行 git merge a，意思是把 a 分支的代码合并到 master
git branch -d a // 删除分支 a
git branch -D a // 有时分支代码没有合并，不让删除，这样可以强制删除 a 分支
git tag v1.0 // 创建当前代码状态下的标签
git tag // 查看当前的标签
git checkout v1.0 // 切换到 v1.0 tag 下的代码
git push origin master // 把本地代码推到远程 master 分支
git push -u origin master // 把本地代码推到远程并以本地为 master
git pull origin master // update 更新代码，push 之前先 pull
git clone git@github.com:zhang6223284/[文件名(没有外面中括号)] // clone 文件到本地
git remote add origin git@github.com:zhang6223284/PAT.git
/* 
就是添加一个远程仓库，他的地址是 git@github.com:zhang6223284/PAT.git ，
而 origin 是给这个项目的远程仓库起的名字，是的，名字你可以随便取，只不过大家公认的
只有一个远程仓库时名字就是 origin ，为什么要给远程仓库取名字？因为我们可能一个项目
有多个远程仓库？比如 GitHub 一个，比如公司一个，这样的话提交到不同的远程仓库就需要
指定不同的仓库名字了。
*/
git remote -v // 查看当前项目有哪些远程仓库
git push origin master // 向远程仓库进行代码提交
git pull --rebase origin master // 将远程内容合并到本地.
git mergetool // 查看冲突
git diff // 查看有什么不同，修改了哪些方面
git log // 查看提交日志
git reset --hard HEAD^ // 回到上一个提交版本
git reset --hard HEAD~100 // 回到上 100 个版本
// 回到前面的版本以后
git push -u origin master -f // 强制提交当前版本
```

