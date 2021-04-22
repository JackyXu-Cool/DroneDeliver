## CS4400 Phase 4 Team 35
The repository for Phase 4
<br/>

### Backend API
<br/>
<br/>

### Backend setup instructions
1. Change environment variables in **‘nodemon.json’**.
2. MySQL database clean-up and setup
```
打开 MySQL workbench

// 这个SQL file是Phase3 TA提供给我们的
运行 grocery_drone_delivery.sql

// 这个SQL file是我们写的procedure
运行 cs4400_phase3_shell.sql
```
3. run backend
```
cd node_backend

// Install all the dependencies
npm install

npm start
```

如果遇到bug的话，可以参考这个文章：
https://stackoverflow.com/questions/52815608/er-not-supported-auth-mode-client-does-not-support-authentication-protocol-requ
<br />

如果需要初始化database，直接在workbench里，再把grocery_drone_delivery.mysql 跑一遍就好了。
<br />

### Developers
Yulai Cui <br/>
Jiayu Lu <br/>
Shiyi Wang <br/>
Junqi Xu <br/>