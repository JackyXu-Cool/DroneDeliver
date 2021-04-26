### Backend setup instructions
1. Change environment variables in **‘nodemon.json’**.
2. MySQL database clean-up and setup
```
打开 MySQL workbench

打开./SQL_database底下grocery_drone_delivery，并运行。
// 这个SQL file是Phase3 TA提供给我们用来create database的

打开./SQL_database底下cs4400_phase3_shell，并运行。
// 这个file是我们所有的procedure
```
3. run backend
```
cd node_backend

// Install all the dependencies
npm install

// Start the server
npm start
```
Note:

如果遇到bug的话，可以参考这个文章：
https://stackoverflow.com/questions/52815608/er-not-supported-auth-mode-client-does-not-support-authentication-protocol-requ
<br />

如果需要初始化database，直接在workbench里，再把grocery_drone_delivery.mysql 跑一遍就好了。
<br />


### Backend API

需要前端send request时，将data放在request body里面

1. /user/register/customer   POST
```json
sample input format:
{
    "username": "testcustomers", 
    "password": "password42", 
    "fname": "Jacky",
    "lname": "Xu",
    "street": "930 Spring street",
    "city": "Atlanta",
    "state": "GA",
    "zipcode": "30309",
    "ccnumber": "2254 7787 8856 4990",
    "cvv": "863",
    "exp_date": "2023-06-01"
}

successful output format
{
    "success": true
}

```
2. /user/register/dronetech  POST
```json
sample input format
{
    "username": "testdronetech", 
    "password": "password42", 
    "fname": "test",
    "lname": "dronetech",
    "street": "930 Spring street",
    "city": "Boston",
    "state": "MA",
    "zipcode": "20119",
    "storeName": "College Park",
    "chainName": "Moss Market"
}

successful output
{
    "success": true
}

```
3. /user/register/manager  POST
```json
{
    "username": "testmanager", 
    "password": "password42", 
    "fname": "test",
    "lname": "manager",
    "street": "930 Spring street",
    "city": "Boston",
    "state": "MA",
    "zipcode": "20119",
    "chainName": "Moss Market"
}

{
    "success": true
}

```

4. /user/login  POST
```json
sample input format
{
    "username": "testcustomers", 
    "password": "password4"
}

successful output format
{
    "success": true
}

```
5. admin/create/grocerychain
```json
{
    "chainName": "Wegmans"
}

successful response

{
    "success": true
}

```

6. admin/create/store
```json
{
    "storeName": "Cumberland",
    "chainName": "Moss Market",
    "street": "2860 Cumberland Mall SE",
    "city": "Atlanta",
    "state": "GA",
    "zipcode": "30334"
}

{
    "success": true
}
```

Note:
对于任意以上的API，如果遇到request failure了，返回的response是这样子的
```json
{
    "message": "xxxxxxxxx"
}
具体message的信息却决于真正失败的原因 (Wrong credentials, wrong input foramt, etc..)
```