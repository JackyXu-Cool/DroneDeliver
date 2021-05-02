/*
CS4400: Introduction to Database Systems
Spring 2021
Phase III Template
Team ##35
Jiayu Lu (jlu394)
Shiyi Wang (swang793)
Yulai Cui (ycui96)
Junqi Xu (jxu477)
Directions:
Please follow all instructions from the Phase III assignment PDF.
This file must run without error for credit.
*/
-- ID: 2a
-- Author: asmith457
-- Name: register_customer
DROP PROCEDURE IF EXISTS register_customer;
DELIMITER //
CREATE PROCEDURE register_customer(
	   IN i_username VARCHAR(40),
       IN i_password VARCHAR(40),
	   IN i_fname VARCHAR(40),
       IN i_lname VARCHAR(40),
       IN i_street VARCHAR(40),
       IN i_city VARCHAR(40),
       IN i_state VARCHAR(2),
	   IN i_zipcode CHAR(5),
       IN i_ccnumber VARCHAR(40),
	   IN i_cvv CHAR(3),
       IN i_exp_date DATE
)

BEGIN
-- Type solution below
	if length(i_zipcode) = 5 then
		insert into users values (i_username, MD5(i_password), i_fname, i_lname, i_street, i_city, i_state, i_zipcode);
		insert into customer values (i_username, i_ccnumber, i_cvv, i_exp_date);
    end if;
-- End of solution
END //
DELIMITER ;


-- ID: 2b
-- Author: asmith457
-- Name: register_employee
DROP PROCEDURE IF EXISTS register_employee;
DELIMITER //
CREATE PROCEDURE register_employee(
	   IN i_username VARCHAR(40),
       IN i_password VARCHAR(40),
	   IN i_fname VARCHAR(40),
       IN i_lname VARCHAR(40),
       IN i_street VARCHAR(40),
       IN i_city VARCHAR(40),
       IN i_state VARCHAR(2),
       IN i_zipcode CHAR(5)
)
BEGIN
-- Type solution below
	if length(i_zipcode) = 5 then
		insert into users values (i_username, MD5(i_password), i_fname, i_lname, i_street, i_city, i_state, i_zipcode);
		insert into employee values (i_username);
	end if;
-- End of solution
END //
DELIMITER ;

-- ID: 4a
-- Author: asmith457
-- Name: admin_create_grocery_chain
DROP PROCEDURE IF EXISTS admin_create_grocery_chain;
DELIMITER //
CREATE PROCEDURE admin_create_grocery_chain(
        IN i_grocery_chain_name VARCHAR(40)
)
BEGIN
-- Type solution below
	insert into chain values (i_grocery_chain_name);
-- End of solution
END //
DELIMITER ;

-- ID: 5a
-- Author: ahatcher8
-- Name: admin_create_new_store
DROP PROCEDURE IF EXISTS admin_create_new_store;
DELIMITER //
CREATE PROCEDURE admin_create_new_store(
    	IN i_store_name VARCHAR(40),
        IN i_chain_name VARCHAR(40),
    	IN i_street VARCHAR(40),
    	IN i_city VARCHAR(40),
    	IN i_state VARCHAR(2),
    	IN i_zipcode CHAR(5)
)
BEGIN
-- Type solution below
	if i_zipcode in (select zipcode from store where chainName = i_chain_name) then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'A chain cannot have two stores in the same zip code';
	else
		insert into store values (i_store_name, i_chain_name, i_street, i_city, i_state, i_zipcode);
	end if;
-- End of solution
END //
DELIMITER ;


-- ID: 6a
-- Author: ahatcher8
-- Name: admin_create_drone
DROP PROCEDURE IF EXISTS admin_create_drone;
DELIMITER //
CREATE PROCEDURE admin_create_drone(
	   IN i_id INT,
       IN i_zip CHAR(5),
       IN i_radius INT,
       IN i_drone_tech VARCHAR(40)
)
BEGIN
-- Type solution below
	if (i_zip in (select Zipcode from store) and i_drone_tech in
		(select username from drone_tech where (storename, chainname) in
		(select storename, chainname from store where zipcode = i_zip))) then 
        insert into drone values (i_id, "Available", i_zip, i_radius, i_drone_tech);
	else
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Wrong zipcode or dronetech information';
	end if;
-- End of solution
END //
DELIMITER ;


-- ID: 7a
-- Author: ahatcher8
-- Name: admin_create_item
DROP PROCEDURE IF EXISTS admin_create_item;
DELIMITER //
CREATE PROCEDURE admin_create_item(
        IN i_item_name VARCHAR(40),
        IN i_item_type VARCHAR(40),
        IN i_organic VARCHAR(3),
        IN i_origin VARCHAR(40)
)
BEGIN
-- Type solution below
	if (i_item_type in ("Dairy", "Bakery", "Meat", "Produce", "Personal Care", "Paper Goods", "Beverages", "Other") and i_organic in ("Yes", "No"))
		then insert into item values (i_item_name, i_item_type, i_origin, i_organic); end if;
-- End of solution
END //
DELIMITER ;


-- ID: 8a
-- Author: dvaidyanathan6
-- Name: admin_view_customers
DROP PROCEDURE IF EXISTS admin_view_customers;
DELIMITER //
CREATE PROCEDURE admin_view_customers(
	   IN i_first_name VARCHAR(40),
       IN i_last_name VARCHAR(40)
)
BEGIN
-- Type solution below
	-- SELECT CUSTOMER.Username, 
    if i_first_name is not null and i_last_name is not null
		then DROP TABLE IF EXISTS admin_view_customers_result;
			CREATE TABLE admin_view_customers_result as
			select username as "Username", concat(firstName, ' ', lastName) as "FullName", concat(street, ', ', city, ', ', state, ' ', zipcode) as "Address"
			from users
			where binary i_first_name = binary FirstName and binary i_last_name = binary lastName and username in (select username from customer);
		end if;
	if i_first_name is null
		then DROP TABLE IF EXISTS admin_view_customers_result;
			CREATE TABLE admin_view_customers_result as
			select username as "Username", concat(firstName, ' ', lastName) as "FullName", concat(street, ', ', city, ', ', state, ' ', zipcode) as "Address"
			from users
			where binary i_last_name = binary lastName and username in (select username from customer);
		end if;
	if i_last_name is null
		then DROP TABLE IF EXISTS admin_view_customers_result;
			CREATE TABLE admin_view_customers_result as
			select username as "Username", concat(firstName, ' ', lastName) as "FullName", concat(street, ', ', city, ', ', state, ' ', zipcode) as "Address"
			from users
			where binary i_first_name = binary firstName and username in (select username from customer);
		end if;
	if i_first_name is null and i_last_name is null
		then DROP TABLE IF EXISTS admin_view_customers_result;
			CREATE TABLE admin_view_customers_result as
			select username as "Username", concat(firstName, ' ', lastName) as "FullName", concat(street, ', ', city, ', ', state, ' ', zipcode) as "Address"
			from users
            where username in (select username from customer);
		end if;
-- End of solution
END //
DELIMITER ;


-- ID: 9a
-- Author: dvaidyanathan6
-- Name: manager_create_chain_item
DROP PROCEDURE IF EXISTS manager_create_chain_item;
DELIMITER //
CREATE PROCEDURE manager_create_chain_item(
        IN i_chain_name VARCHAR(40),
    	IN i_item_name VARCHAR(40),
    	IN i_quantity INT, 
    	IN i_order_limit INT,
    	IN i_PLU_number INT,
    	IN i_price DECIMAL(4, 2)
)
BEGIN
-- Type solution below
	insert into chain_item values (i_item_name, i_chain_name, i_PLU_number, i_order_limit, i_quantity, i_price); 
-- End of solution
END //
DELIMITER ;

-- ID: 10a
-- Author: dvaidyanathan6
-- Name: manager_view_drone_technicians
DROP PROCEDURE IF EXISTS manager_view_drone_technicians;
DELIMITER //
CREATE PROCEDURE manager_view_drone_technicians(
	   IN i_chain_name VARCHAR(40),
       IN i_drone_tech VARCHAR(40),
       IN i_store_name VARCHAR(40)
)
BEGIN
-- Type solution below

	DROP TABLE IF EXISTS manager_view_drone_technicians_result;
    
  CREATE TABLE manager_view_drone_technicians_result
  select DRONE_TECH.Username, CONCAT(FirstName, ' ', LastName) as FullName, STORE.StoreName 
	from DRONE_TECH join USERS join STORE 
  on DRONE_TECH.Username = USERS.Username and (DRONE_TECH.StoreName = i_store_name or i_store_name is null) 
  and DRONE_TECH.ChainName = i_chain_name and STORE.ChainName = i_chain_name and STORE.StoreName = DRONE_TECH.StoreName
  and (STORE.StoreName = i_store_name or i_store_name is null) and (DRONE_TECH.Username = i_drone_tech or i_drone_tech is null);
-- End of solution
END //
DELIMITER ;

-- CALL manager_view_drone_technicians('Moss Market','fdavenport49','College Park');
-- SELECT * FROM grocery_drone_delivery.manager_view_drone_technicians_result;

-- ID: 11a
-- Author: vtata6
-- Name: manager_view_drones
DROP PROCEDURE IF EXISTS manager_view_drones;
DELIMITER //
CREATE PROCEDURE manager_view_drones(
	   IN i_mgr_username varchar(40), 
	   IN i_drone_id int, drone_radius int
)
BEGIN
-- Type solution below	   

	DROP TABLE IF EXISTS manager_view_drones_result;
	CREATE TABLE manager_view_drones_result
		select ID, DroneTech, Radius, Zip, DroneStatus 
        from DRONE join DRONE_TECH join STORE join MANAGER
        on DRONE.DroneTech = DRONE_TECH.Username and DRONE_TECH.StoreName = STORE.StoreName and DRONE_TECH.ChainName = STORE.ChainName
        and MANAGER.ChainName = STORE.ChainName 
        where MANAGER.Username = i_mgr_username and (DRONE.ID = i_drone_id or i_drone_id is null) 
        and (DRONE.Radius >= drone_radius or drone_radius is null);
-- End of solution
END //
DELIMITER ;

-- ID: 12a
-- Author: vtata6
-- Name: manager_manage_stores
DROP PROCEDURE IF EXISTS manager_manage_stores;
DELIMITER //
CREATE PROCEDURE manager_manage_stores(
	   IN i_mgr_username varchar(50), 
	   IN i_storeName varchar(50), 
	   IN i_minTotal int, 
	   IN i_maxTotal int
)
BEGIN
-- Type solution below
    
    set @chain_name = (select ChainName from MANAGER where Username = i_mgr_username);
    
    drop table if exists manager_manage_stores_address;
    create table manager_manage_stores_address
		select STORE.StoreName, concat(Street, " ", City, ", ", State, " ", Zipcode) as Address from STORE
        where STORE.ChainName = @chain_name;
        
    drop table if exists manager_manage_stores_orders;
    create table manager_manage_stores_orders
		select DRONE_TECH.StoreName, count(ORDERS.ID) as Orders from ORDERS join DRONE right join DRONE_TECH on
        ORDERS.DroneID = DRONE.ID and DRONE.DroneTech = DRONE_TECH.username where DRONE_TECH.ChainName = @chain_name
        group by Drone_Tech.StoreName;
    
    drop table if exists manager_manage_stores_employees;
    create table manager_manage_stores_employees
		select DRONE_TECH.StoreName, count(drone_tech.username) + 1 as Employees from drone_tech where drone_tech.chainname = @chain_name
        group by (drone_tech.storeName);
        
	drop table if exists manager_manage_stores_order_total;
	create table manager_manage_stores_order_total
		select DRONE_TECH.StoreName, ORDERS.ID, sum(CONTAINS.quantity*price) as OrderTotal
        from ORDERS join CONTAINS join CHAIN_ITEM join DRONE join DRONE_TECH on
        ORDERS.DroneID = DRONE.ID and DRONE_TECH.Username = DRONE.DroneTech and
        ORDERS.ID = CONTAINS.OrderID and CONTAINS.ItemName = CHAIN_ITEM.ChainItemName and 
        CONTAINS.ChainName = CHAIN_ITEM.ChainName and CONTAINS.PLUNumber = CHAIN_ITEM.PLUNumber
        where DRONE_TECH.ChainName = @chain_name
        group by ORDERS.ID;

	drop table if exists manager_manage_stores_store_total;
	create table manager_manage_stores_store_total
		select StoreName, sum(OrderTotal) as StoreTotal from manager_manage_stores_order_total group by StoreName;
        
	drop table if exists manager_manage_stores_temp;
    create table manager_manage_stores_temp
		select manager_manage_stores_address.StoreName, address, ifnull(StoreTotal, 0) as total from 
        manager_manage_stores_address left join manager_manage_stores_store_total on
        manager_manage_stores_address.StoreName = manager_manage_stores_store_total.StoreName;
    
    drop table if exists manager_manage_stores_result;
    create table manager_manage_stores_result
		select manager_manage_stores_temp.StoreName, address, Orders, Employees, Total from 
		manager_manage_stores_temp join manager_manage_stores_orders
		on manager_manage_stores_temp.StoreName = manager_manage_stores_orders.StoreName
		join manager_manage_stores_employees on manager_manage_stores_orders.StoreName = manager_manage_stores_employees.StoreName
        where (manager_manage_stores_temp.StoreName = i_storeName or i_storeName is null)
        and (total >= i_minTotal or i_minTotal is null) and (total <= i_maxtotal or i_maxTotal is null);
        
	drop table if exists manager_manage_stores_address;
	drop table if exists manager_manage_stores_orders;
	drop table if exists manager_manage_stores_employees;
	drop table if exists manager_manage_stores_order_total;
	drop table if exists manager_manage_stores_store_total;
	drop table if exists manager_manage_stores_temp;
-- End of solution
END //
DELIMITER ;

call manager_manage_stores('cbing101', null, null, null);
select * from manager_manage_stores_result;

-- ID: 13a
-- Author: vtata6
-- Name: customer_change_credit_card_information
DROP PROCEDURE IF EXISTS customer_change_credit_card_information;
DELIMITER //
CREATE PROCEDURE customer_change_credit_card_information(
	   IN i_custUsername varchar(40), 
	   IN i_new_cc_number varchar(19), 
	   IN i_new_CVV int, 
	   IN i_new_exp_date date
)
BEGIN
-- Type solution below
	if i_new_exp_date > current_date() and (select Username from CUSTOMER where Username = i_custUsername) is not null then
		update CUSTOMER set CcNumber = i_new_cc_number, CVV = i_new_CVV, EXP_DATE = i_new_exp_date 
		where Username = i_custUsername;
    end if;
    
-- End of solution
END //
DELIMITER ;

-- select * from CUSTOMER where Username = 'dsmith102';
-- CALL customer_change_credit_card_information('dsmith102','1247 0598 9213 1562', 173,'2021-05-02');
-- select * from CUSTOMER where Username = 'dsmith102';

-- ID: 14a
-- Author: ftsang3
-- Name: customer_view_order_history
DROP PROCEDURE IF EXISTS customer_view_order_history;
DELIMITER //
CREATE PROCEDURE customer_view_order_history(
	   IN i_username VARCHAR(40),
       IN i_orderid INT
)
BEGIN
-- Type solution below

	drop table if exists customer_view_order_history_result;

	set @temp_total_item = (select sum(Quantity) from CONTAINS where OrderID = i_orderid);
	set @temp_total_amount = (select sum(CONTAINS.Quantity * Price) from CONTAINS join CHAIN_ITEM on 
	ItemName = ChainItemName and CONTAINS.ChainName = CHAIN_ITEM.ChainName and CONTAINS.PLUNumber = CHAIN_ITEM.PLUNumber
	where OrderID = i_orderid);
	
	create table customer_view_order_history_result
		select round(@temp_total_amount, 2) as total_amount, round(@temp_total_item) as total_items, 
		OrderDate as orderdate, DroneID as droneID, concat(FirstName, " ", LastName) as dronetech, OrderStatus as orderstatus
		from ORDERS join DRONE join USERS on DRONE.ID = DroneID and USERS.username = DRONE.DroneTech 
		where ORDERS.ID = i_orderid and (select CustomerUsername from ORDERS where ID = i_orderid) = i_username and (select Username from CUSTOMER where Username = i_username) is not null;

-- End of solution
END //
DELIMITER ;

-- CALL customer_view_order_history('hpeterson55', 10001);
-- SELECT * FROM grocery_drone_delivery.customer_view_order_history_result;

-- ID: 15a
-- Author: ftsang3
-- Name: customer_view_store_items
DROP PROCEDURE IF EXISTS customer_view_store_items;
DELIMITER //
CREATE PROCEDURE customer_view_store_items(
	   IN i_username VARCHAR(40),
       IN i_chain_name VARCHAR(40),
       IN i_store_name VARCHAR(40),
       IN i_item_type VARCHAR(40)
)
BEGIN
-- Type solution below
	set @userZipcode = (select Zipcode from USERS where Username = i_username);
    -- check chainName validity given same zipCode, storeName, and ChainName
    set @validChainName = (select ChainName from STORE where StoreName = i_store_name and zipcode = @userZipcode and ChainName = i_chain_name);
    if i_item_type = "ALL" 
		then drop table if exists customer_view_store_items_result;
			 create table customer_view_store_items_result
			select ChainItemName, Orderlimit from CHAIN_ITEM join ITEM on ItemName = ChainItemName where ChainName = @validChainName; 
	else
		drop table if exists customer_view_store_items_result;
			 create table customer_view_store_items_result
			 select ChainItemName, Orderlimit 
			 from CHAIN_ITEM join ITEM on ItemName = ChainItemName 
			 where ChainName = @validChainName and ItemType = i_item_type;
		end if;
-- End of solution
END //
DELIMITER ;

-- ID: 15b
-- Author: ftsang3
-- Name: customer_select_items
DROP PROCEDURE IF EXISTS customer_select_items;
DELIMITER //
CREATE PROCEDURE customer_select_items(
	    IN i_username VARCHAR(40),
    	IN i_chain_name VARCHAR(40),
    	IN i_store_name VARCHAR(40),
    	IN i_item_name VARCHAR(40),
    	IN i_quantity INT
)
BEGIN
-- Type solution below
	set @userZip = (select Zipcode from USERS where Username = i_username);
    set @targetZip = (select Zipcode from STORE where StoreName = i_store_name and ChainName = i_chain_name);
	set @orderLimit = (select Orderlimit from CHAIN_ITEM where ChainItemName = i_item_name and ChainName = i_chain_name);
    
    if (@userZip = @targetZip) and (i_quantity <= @orderLimit) then 
		set @lastusername = (SELECT customerusername FROM orders ORDER BY ID DESC LIMIT 1);
        set @lastOrderID = (select ID from orders order by ID desc limit 1);
        set @creatingOrder = (select count(*) from orders where orderstatus = "Creating");
        if @creatingOrder = 1 then 
			set @PLU = (select PLUNumber from CHAIN_ITEM where i_chain_name = ChainName and i_item_name = ChainItemName);
			insert into CONTAINS values (@lastOrderID, i_item_name, i_chain_name, @PLU, i_quantity);
		else
			insert into ORDERS values (@lastOrderID + 1, "Creating", current_date(), i_username, null);
			set @PLU = (select PLUNumber from CHAIN_ITEM where i_chain_name = ChainName and i_item_name = ChainItemName);
			insert into CONTAINS values (@lastOrderID + 1, i_item_name, i_chain_name, @PLU, i_quantity);
		end if;
    end if;
-- End of solution
END //
DELIMITER ;

-- ID: 16a
-- Author: jkomskis3
-- Name: customer_review_order
DROP PROCEDURE IF EXISTS customer_review_order;
DELIMITER //
CREATE PROCEDURE customer_review_order(
	   IN i_username VARCHAR(40)
)
BEGIN
-- Type solution below
	set @orderID = (select ID from ORDERS where CustomerUsername = i_username and OrderStatus = "Creating");
    drop table if exists customer_review_order_result;
	create table customer_review_order_result
    select ItemName, CONTAINS.Quantity, Price from CONTAINS join CHAIN_ITEM on ItemName = ChainItemName where OrderID = @orderID;
-- End of solution
END //
DELIMITER ;

-- ID: 16b
-- Author: jkomskis3
-- Name: customer_update_order
DROP PROCEDURE IF EXISTS customer_update_order;
DELIMITER //
CREATE PROCEDURE customer_update_order(
	   IN i_username VARCHAR(40),
       IN i_item_name VARCHAR(40),
       IN i_quantity INT
)
BEGIN
-- Type solution below
	set @orderID = (select ID from ORDERS where CustomerUsername = i_username and OrderStatus = "Creating");
    set @ChainName = (select ChainName from CONTAINS where OrderID = @orderID and i_item_name = ItemName);
    set @orderLimit = (select Orderlimit from CHAIN_ITEM where ChainItemName = i_item_name and ChainName = @ChainName);
    set @expDate = (select EXP_DATE from CUSTOMER where Username = i_username);
    
    if (i_quantity <= @orderLimit) and (current_date() <= @expDate) then
		if i_quantity > 0 then
			update CONTAINS set Quantity = i_quantity where OrderID = @orderID and i_item_name = ItemName;
		end if;
		if i_quantity = 0 then
			delete from contains where OrderID = @orderID and i_item_name = ItemName;
		end if;
    end if;
-- End of solution
END //
DELIMITER ;

-- ID: 17a
-- Author: jkomskis3
-- Name: customer_update_order
DROP PROCEDURE IF EXISTS drone_technician_view_order_history;
DELIMITER //
CREATE PROCEDURE drone_technician_view_order_history(
        IN i_username VARCHAR(40),
    	IN i_start_date DATE,
    	IN i_end_date DATE
)
BEGIN
-- Type solution below
    set @storeName = (select StoreName from DRONE_TECH where Username = i_username);
	set @chainName = (select chainName from DRONE_TECH where Username = i_username);
    drop table if exists drone_technician_view_order_history_result;
			 create table drone_technician_view_order_history_result
    select temp4.ID, CONCAT(firstName, LastName) as Operator, Date, DroneID, Status, Total from (select ID, OrderDate as Date, DroneID, OrderStatus as Status, Total  from (select * from ORDERS where (OrderDate between '2021-01-01' and '2021-12-31') and DroneID in
	(select ID from DRONE where DroneTech in 
	(select Username from DRONE_TECH 
	where StoreName = @storeName
	and ChainName = @chainName))) as temp join (select OrderID, sum(CONTAINS.Quantity * Price) as Total from CONTAINS join CHAIN_ITEM on ItemName = ChainItemName and CHAIN_ITEM.ChainName = CONTAINS.ChainName where OrderID in (select ID from ORDERS where (OrderDate between '2021-01-01' and '2021-12-31') and DroneID in
	(select ID from DRONE where DroneTech in 
	(select Username from DRONE_TECH 
	where StoreName = @storeName
	and ChainName = @chainName))) group by OrderID) as temp2 on ID = OrderID) as temp4 join (select FirstName, LastName, ID from (select * from USERS natural join DRONE_TECH where Username in (select Username from DRONE_TECH 
	where StoreName = @storeName
	and ChainName = @chainName)) as temp3 join Drone on Username = DroneTech) as temp5 on DroneID = temp5.ID; 
    
-- End of solution
END //
DELIMITER ;

-- ID: 17b
-- Author: agoyal89
-- Name: dronetech_assign_order
DROP PROCEDURE IF EXISTS dronetech_assign_order;
DELIMITER //
CREATE PROCEDURE dronetech_assign_order(
	   IN i_username VARCHAR(40),
       IN i_droneid INT,
       IN i_status VARCHAR(20),
       IN i_orderid INT
)
BEGIN
-- Type solution below
	if i_username = (select dronetech from drone where id = i_droneid) then
		if (select droneid from orders where id = i_orderid) is null or i_droneid = (select droneid from orders where id = i_orderid) then
			update ORDERS set OrderStatus = i_status, DroneID = i_droneid where ID = i_orderid;
			if i_status = "Drone Assigned" then 
				update DRONE set DroneStatus = "Busy" where ID = i_droneid and DroneTech = i_username;
			end if;
			if i_status = "Delivered" then 
				update DRONE set DroneStatus = "Available" where ID = i_droneid and DroneTech = i_username;
			end if;
		end if;
	end if;
-- End of solution
END //
DELIMITER ;


-- ID: 18a
-- Author: agoyal89
-- Name: dronetech_order_details
DROP PROCEDURE IF EXISTS dronetech_order_details;
DELIMITER //
CREATE PROCEDURE dronetech_order_details(
	   IN i_username VARCHAR(40),
       IN i_orderid VARCHAR(40)
)
BEGIN
-- Type solution below
drop table if exists dronetech_order_details_result;
create table dronetech_order_details_result
select distinct CONCAT(ctmr.FirstName, ' ', ctmr.LastName) as Customer_name, 
	ORDERS.ID as OrderID,
    temp1.total_amount as Total_Amount,
    temp2.total_items as Total_Items,
	ORDERS.OrderDate as Date_Of_Purchase,
	ORDERS.DroneID as Drone_ID,
	CONCAT(temp3.FirstName, ' ', temp3.LastName) as Store_Associate,
	ORDERS.OrderStatus as Order_Status,
	CONCAT(ctmr.Street, ', ', ctmr.City, ', ', ctmr.State, ' ', ctmr.Zipcode) as Address
from USERS as ctmr, USERS as dt, ORDERS, CONTAINS, CHAIN_ITEM, 
	(select CONTAINS.OrderID, SUM(Price * CONTAINS.Quantity) as total_amount
		from CHAIN_ITEM join CONTAINS on CONTAINS.PLUNumber = CHAIN_ITEM.PLUNumber 
		and CONTAINS.ItemName = CHAIN_ITEM.ChainItemName 
		and CONTAINS.ChainName = CHAIN_ITEM.ChainName
		group by OrderID) as temp1,
	(select OrderID, SUM(Quantity) as total_items
		from CONTAINS
		group by OrderID) as temp2,
	(select ORDERS.ID as OrderID, dt.FirstName, dt.LastName 
		from ORDERS left outer join (select DRONE.ID as drone_id, USERS.FirstName, USERS.LastName 
		from DRONE join USERS 
		on DRONE.DroneTech = USERS.Username) as dt
		on ORDERS.DroneID = dt.drone_id) as temp3
    
where ctmr.Username in (select CustomerUsername from ORDERS where ID = i_orderid) and 
	ORDERS.ID = i_orderid and
    dt.Username = i_username and 
    CONTAINS.OrderID = i_orderid and
	temp1.OrderID = i_orderid and
    temp2.OrderID = i_orderid and
    temp3.OrderID = i_orderid;

-- End of solution
END //
DELIMITER ;

-- select ORDERS.ID, dt.FirstName, dt.LastName 
-- from ORDERS left outer join (select DRONE.ID as drone_id, USERS.FirstName, USERS.LastName 
-- from DRONE join USERS 
-- on DRONE.DroneTech = USERS.Username) as dt
-- on ORDERS.DroneID = dt.drone_id;

-- ID: 18b
-- Author: agoyal89
-- Name: dronetech_order_items
DROP PROCEDURE IF EXISTS dronetech_order_items;
DELIMITER //
CREATE PROCEDURE dronetech_order_items(
        IN i_username VARCHAR(40),
    	IN i_orderid INT
)
BEGIN
-- Type solution below
drop table if exists dronetech_order_items_result;
create table dronetech_order_items_result
select ItemName as Item, Quantity as Count from DRONE_TECH, CONTAINS where i_orderid = CONTAINS.OrderID and DRONE_TECH.username = i_username;
-- End of solution
END //
DELIMITER ;

-- ID: 19a
-- Author: agoyal89
-- Name: dronetech_assigned_drones
DROP PROCEDURE IF EXISTS dronetech_assigned_drones;
DELIMITER //
CREATE PROCEDURE dronetech_assigned_drones(
        IN i_username VARCHAR(40),
    	IN i_droneid INT,
    	IN i_status VARCHAR(20)
)
BEGIN
-- Type solution below
drop table if exists dronetech_assigned_drones_result;
if i_droneid is null and (i_status = 'All' or i_status is null)
	then create table dronetech_assigned_drones_result select DRONE.ID as Drone_ID, DRONE.DroneStatus as Drone_Status, DRONE.Radius
		from DRONE
		where DroneTech = i_username;
elseif i_droneid is null
	then create table dronetech_assigned_drones_result select DRONE.ID as Drone_ID, DRONE.DroneStatus as Drone_Status, DRONE.Radius
		from DRONE
		where DroneTech = i_username and DRONE.DroneStatus = i_status;
elseif (i_status = 'All' or i_status is null)
	then create table dronetech_assigned_drones_result select DRONE.ID as Drone_ID, DRONE.DroneStatus as Drone_Status, DRONE.Radius 
		from DRONE 
		where DRONE.ID = i_droneid and DroneTech = i_username;
else
	create table dronetech_assigned_drones_result select DRONE.ID as Drone_ID, DRONE.DroneStatus as Drone_Status, DRONE.Radius 
		from DRONE
		where DroneTech = i_username and DRONE.DroneStatus = i_status;
end if;
-- End of solution
END //
DELIMITER ;


-- Login Procedure
DROP PROCEDURE IF EXISTS user_login;
DELIMITER //
CREATE PROCEDURE user_login(
        IN i_username VARCHAR(40),
    	IN i_password VARCHAR(40)
)
BEGIN
	set @hashedpassword = MD5(i_password);
	if (select count(*) from users where username = i_username and pass = @hashedpassword) = 0 then
		select count(*) as count from users where username = i_username and pass = @hashedpassword;
	else
		if (select count(*) from customer where username = i_username) = 1 then
			select count(*) as count, ccnumber, cvv, exp_date from customer where username = i_username;
		end if;
        if (select count(*) from manager where username = i_username) = 1 then
			select count(*) as count, chainname from manager where username = i_username;
		end if;
		if (select count(*) from drone_tech where username = i_username) = 1 then
			select count(*) as count, chainName, storeName from drone_tech where username = i_username;
		end if;
        if (select count(*) from admin where username = i_username) = 1 then
			select count(*) as count from admin where username = i_username;
        end if;
    end if;
END //
DELIMITER ;

-- Register drone technician
DROP PROCEDURE IF EXISTS register_drone_technician;
DELIMITER //
CREATE PROCEDURE register_drone_technician(
	   IN i_username VARCHAR(40),
       IN i_password VARCHAR(40),
	   IN i_fname VARCHAR(40),
       IN i_lname VARCHAR(40),
       IN i_street VARCHAR(40),
       IN i_city VARCHAR(40),
       IN i_state VARCHAR(2),
       IN i_zipcode CHAR(5),
       IN i_storeName CHAR(50),
       IN i_chainName CHAR(50)
)
BEGIN
-- Type solution below
	if i_chainName in (select chainName from chain) and i_storeName in (select storeName from store) then
		insert into users values (i_username, MD5(i_password), i_fname, i_lname, i_street, i_city, i_state, i_zipcode);
		insert into employee values (i_username);
        insert into drone_tech values (i_username, i_storeName, i_chainName);
	else
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Input chainName or storeName does not exist';
	end if;
-- End of solution
END //
DELIMITER ;

-- Register manager
DROP PROCEDURE IF EXISTS register_manager;
DELIMITER //
CREATE PROCEDURE register_manager(
	   IN i_username VARCHAR(40),
       IN i_password VARCHAR(40),
	   IN i_fname VARCHAR(40),
       IN i_lname VARCHAR(40),
       IN i_street VARCHAR(40),
       IN i_city VARCHAR(40),
       IN i_state VARCHAR(2),
       IN i_zipcode CHAR(5),
       IN i_chainName CHAR(50)
)
BEGIN
-- Type solution below
	if i_chainName in (select chainName from chain) and (select count(*) from manager where chainName = i_chainName) = 0 then
		insert into users values (i_username, MD5(i_password), i_fname, i_lname, i_street, i_city, i_state, i_zipcode);
		insert into employee values (i_username);
        insert into manager values (i_username, i_chainName);
	else
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Incorrect chain name or chainname has already been assigned a manager';
	end if;
-- End of solution
END //
DELIMITER ;
