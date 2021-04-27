### Backend setup instructions
1. Change environment variables in **‘nodemon.json’**.
2. MySQL database clean-up and setup
```
Open MySQL workbench

Run ./SQL_database/grocery_drone_deliverym.sql

Run ./SQL_database/cs4400_phase3_shell.sql
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

Check out these articles if you run into some bugs
https://stackoverflow.com/questions/52815608/er-not-supported-auth-mode-client-does-not-support-authentication-protocol-requ
<br />

To initialize the database，run grocery_drone_delivery.mysql in the workbench
<br />


### Backend API

When sending request from frontend，put data in request body

1. **/user/register/customer**   POST
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
2. **/user/register/dronetech**  POST
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
3. **/user/register/manager**  POST
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

4. **/user/login**  POST
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
5. **admin/create/grocerychain**  POST
```json
{
    "chainName": "Wegmans"
}

successful response

{
    "success": true
}

```

6. **admin/create/store**   POST
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

7. **/admin/get/zipcode**  GET <br/>
This API will return all zipcodes of existing stores <br />
Especially for Screen 6 “Dropdown for zip codes should only display zip codes of existing store locations."
```json
successful response

{
    "result": [ "30332","30047","30313", "30022" ]
}

```

8. **/admin/get/usernameforstore**  GET <br />
Get all usernames of employees who work for a store in the given zipcode <br />
Especially for Screen 6 “Dropdown of store associate should only display the usernames of employees who work for a store in the previously selected zip code”
```json
input 

{
    "zipcode": "30332"
}

output

{
    "result": [
        "nshea230",
        "cforte58"
    ]
}
```
9. **/admin/get/droneid** GET
Get the (lastID+1) from the drone table. Might be helpful for Screen 6, Drone ID textfield
```json
{
    "id": 122
}
```

10 **/admin/create/drone** POST
```json
input
{
    "id": 121,
    "zipcode": "30363",
    "radius": 10,
    "dronetech": "hliu88"
}

output
{
    "success": true
}
```

Note:
For any of the above APIs, if there is a request failure，the response will be like this.
```json
{
    "message": "xxxxxxxxx"
}
the value in message depends on the reasons for failure (Wrong credentials, wrong input foramt, etc..)
```