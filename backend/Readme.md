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

8. **/admin/get/usernameforstore**  POST <br />
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

12. **/admin/view/customers** POST
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

17. **/customer/view/store/items/?type={type}&chainName={chainName}&storeName={stosreName}&username={username}**  GET <br />
(Get the information needed to display screen 15)

```
For any query parameter input, replace space with "-". For example:

localhost:5000/customer/view/store/items/?type=ALL&chainName=Moss-Market&storeName=Bobby-Dodd&username=dkim99

Also, do not support type = null
```
```json
output:
{
    "result": [
        {
            "ChainItemName": "Gala Apple",
            "Orderlimit": 8
        },
        {
            "ChainItemName": "Fuji Apple",
            "Orderlimit": 2
        },
        {
            "ChainItemName": "Campbells Soup",
            "Orderlimit": 8
        }
    ]
}
```

18. **/customer/preplace/order** POST (When click place order on Screen 15)<br /> 
```json
input 
{
    "username": "dkim99",
    "chainName": "Moss Market",
    "storeName": "Bobby Dodd",
    "quantity": 1,
    "itemName": "Fuji Apple"
}

output
{
    "success": true
}
```

19. **/customer/review/order/?username={username}** (Screen 16 information)
```json
{
    "result": [
        {
            "ItemName": "Fuji Apple",
            "Quantity": 1,
            "Price": 1.99
        },
        {
            "ItemName": "Gala Apple",
            "Quantity": 6,
            "Price": 15.32
        }
    ]
}
```
20. **/customer/update/order** POST <br />
```json
input 
{
    "username": "dkim99",
    "quantity": 3,
    "itemName": "Gala Apple"
}

output
{
    "success": true
}
```

21.**/customer/confirm/order** POST <br /> (When user clicks place order on Screen 16)
```json
input
{
    "username": "dkim99"
}

output
{
    "success": true
}
```

22. **/dronetech/view/store** GET (For screen 17 table information) <br />
```
pass in input as query parameters:

localhost:5000/dronetech/view/store/drones?username={username}&startDate={yyyy-mm-dd}&endDate={yyyy-mm-dd}
```
```json
{
    "result": [
        {
            "ID": 10003,
            "Operator": "KermitFrog",
            "Date": "2021-01-13T05:00:00.000Z",
            "DroneID": 117,
            "Status": "Delivered",
            "Total": 64.22
        },
        {
            "ID": 10011,
            "Operator": "KermitFrog",
            "Date": "2021-02-05T05:00:00.000Z",
            "DroneID": 117,
            "Status": "Delivered",
            "Total": 31.68
        }
    ]
}
```

23. **/dronetech/assign/drontech** POST <br />
```json
input
{
    "username": "sstrange11",
    "droneid": 113,
    "orderid": 10015,
    "status": "Drone Assigned"
}

output
{
    "success": true
}
```

24. **/dronetech/get/available/drones?username={username}** GET <br /> 
(Get availabe drones of the logged in drone technician. Screen 17)
```json
output
{
    "dronesId": [
        113
    ]
}
```

25. **/manager/manage/stores** GET <br />
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

26. **/dronetech/get/order/details/?id={orderId}&username={username}** GET (For Screen 18) <br />
sample url: localhost:5000/dronetech/get/order/details/?id=10015&username=akarev16
```json

output: 
{
    "Details": {
        "Customer_name": "Leroy Piper",
        "OrderID": 10015,
        "Total_Amount": 83.28,
        "Total_Items": 8,
        "Date_Of_Purchase": "2021-02-24T05:00:00.000Z",
        "Drone_ID": null,
        "Store_Associate": null,
        "Order_Status": "Pending",
        "Address": "262 Stonecliffe Aisle, Kennesaw, GA 30144",
        "Items": [
            {
                "Item": "Black Tea",
                "Count": 2
            },
            {
                "Item": "Earl Grey Tea",
                "Count": 2
            }
        ]
    }
}
```

27. **/dronetech/view/drones/?username={username}&id={droneid}&status={status}** GET (For screen 19) <br />
If id or status is null, just don't put them in the query paramters. <br />
Sample: 
- localhost:5000/dronetech/view/drones/?username=lchen27
- localhost:5000/dronetech/view/drones/?username=hliu88&status=All
```json
output:
{
    "result": [
        {
            "Drone_ID": 103,
            "Drone_Status": "Available",
            "Radius": 3
        }
    ]
}
```

**Note:** <br />
For any of the above APIs, if there is a request failure，the response will be like this.

```json
{
    "message": "xxxxxxxxx"
}
the value in message depends on the reasons for failure (Wrong credentials, wrong input foramt, etc..)
```
