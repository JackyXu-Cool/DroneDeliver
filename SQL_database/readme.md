### SQL file changelog
If you have to add new procedures, put it in ./SQL_database/cs4400_phase3_shell.sql

./cs4400_phase3_shell.sql CHANGELOG： 
- Line 672 user_login （Will check Wrong credentials）
- Line 685 register_drone_technician （Will check if Input chainName or storeName exist or not）
- Line 713 register_manager （Will check if input chainName has been assigned a manager or not)

./SQL_database/grocery_drone_delivery.sql CHANGELOG
- Line 494 Update all users' password to hashed password with MD5