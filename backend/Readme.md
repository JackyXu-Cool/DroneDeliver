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

1. **/user/register/customer** POST

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

2. **/user/register/dronetech** POST

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

3. **/user/register/manager** POST

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

4. **/user/login** POST

```json
sample input format
{
    "username": "rgreen97",
    "password": "password23"
}

Successful output will differ according to the identity of the users (customer or drone_tech or manager)
{
    "success": true,
    "information": {
        "identity": "Manager",
        "chainname": "Kroger"
    }
}

examples for customer:
{
    "username": "mscott845",
    "password": "password30"
}

{
    "success": true,
    "information": {
        "identity": "Customer",
        "ccnumber": "6518 5559 7446 1663",
        "cvv": 551,
        "exp_date": "2024-02-01T05:00:00.000Z"
    }
}

----
example for drone_tech
{
    "username": "lchen27",
    "password": "password3"
}

{
    "success": true,
    "information": {
        "identity": "Drone Tech",
        "chainName": "Moss Market",
        "storeName": "KSU Center"
    }
}


```

5. **admin/create/grocerychain** POST

```json
{
    "chainName": "Wegmans"
}

successful response

{
    "success": true
}

```

6. **admin/create/store** POST

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

7. **/admin/get/zipcode** GET <br/>
   This API will return all zipcodes of existing stores <br />
   Especially for Screen 6 “Dropdown for zip codes should only display zip codes of existing store locations."

```json
successful response

{
    "result": [ "30332","30047","30313", "30022" ]
}

```

8. **/admin/get/usernameforstore** GET <br />
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

11. **/admin/create/item** POST

```json
{
    "itemName": "Dog Shampoo",
    "type": "Personal Care",
    "organic": "No",
    "origin": "New Jersey"
}

output

{
    "success": true
}
```

12. **/admin/view/customers** GET

```json
input (Should always have lastName and firstName sent as request body. If the user
does not enter firstName or lastName, just leave it as empty string)

// To select all the customers
{
    "lastName": "",
    "firstName": ""
}

// to select customers whose last name is "Allman"
{
    "firstName": "",
    "lastName": "Allman"
}

sample output
{
    "result": [
        {
            "Username": "aallman302",
            "FullName": "Aiysha Allman",
            "Address": "420 Austerlitz Rd, Atlanta, GA 30318"
        }
    ]
}

```

13. **/manager/create/chainItem** POST

```json
{
    "chainName": "Moss Market",
    "itemName": "Navel Orange",
    "quantity": 500,
    "orderLimit": 20,
    "PLU": 10098,
    "price": 0.88
}

{
    "success": true
}
```

14. **/manager/get/items** GET <br/>
    Get all items created by admin. Useful for Screen 9

```json
output
{
    "items": [ "2% Milk", "4-1 Shampoo", "Almond Milk"]
}
```

15. **/manager/get/plu** GET <br />
    Get the (plu of last created item) + 1.

```json
output
{
    "plu": 10099
}
```

16. **/manager/view/technicians** GET <br />
    Manager view drone technicians

```json
sample input
{
    "chainName": "Moss Market",
    "droneTech": "fdavenport49",
    "storeName": "College Park"
}

sample output
{
    "result": [
        {
            "Username": "fdavenport49",
            "FullName": "Felicia Devenport",
            "StoreName": "College Park"
        },
        {
            "Username": "mgeller3",
            "FullName": "Monica  Geller",
            "StoreName": "College Park"
        },
        {
            "Username": "lchen27",
            "FullName": "Liang Chen",
            "StoreName": "KSU Center"
        }
    ]
}
```

17. **/manager/view/drones** GET <br />
    Manager view drones

```json
sample input
{
    "userName": "cbing101",
    "droneID": null,
    "droneRadius": null
}

sample output
{
    "result": [
        {
            "ID": 110,
            "DroneTech": "hliu88",
            "Radius": 5,
            "Zip": "30363",
            "DroneStatus": "Available"
        },
        {
            "ID": 120,
            "DroneTech": "rgeller9",
            "Radius": 7,
            "Zip": "30363",
            "DroneStatus": "Available"
        },
        {
            "ID": 104,
            "DroneTech": "dmcstuffins7",
            "Radius": 8,
            "Zip": "30303",
            "DroneStatus": "Busy"
        },
        {
            "ID": 114,
            "DroneTech": "jhilborn97",
            "Radius": 8,
            "Zip": "30303",
            "DroneStatus": "Available"
        },
        {
            "ID": 105,
            "DroneTech": "jhilborn98",
            "Radius": 4,
            "Zip": "30309",
            "DroneStatus": "Available"
        },
        {
            "ID": 115,
            "DroneTech": "mgrey91",
            "Radius": 7,
            "Zip": "30309",
            "DroneStatus": "Available"
        }
    ]
}
```

18. **/manager/manage/stores** GET <br />
    Manager manage store

```json
sample input
{
    "userName": "rgreen97",
    "storeName": null,
    "minTotal": 10,
    "maxTotal": 120
}

sample output
{
    "result": [
        {
            "StoreName": "Midtown",
            "Address": "725 Ponce De Leon Ave Atlanta, GA 30332",
            "Orders": 1,
            "Employees": 2,
            "Total": 13.98
        },
        {
            "StoreName": "Norcross",
            "Address": "650 Singleton Road Duluth, GA 30047",
            "Orders": 1,
            "Employees": 2,
            "Total": 111.5
        }
    ]
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
