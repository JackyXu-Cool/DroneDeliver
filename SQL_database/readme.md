### SQL file changelog
如果需要加新的procedure, 在./SQL_database/cs4400_phase3_shell.sql 里面改

目前的新增的procedure： 
- Line 672 user_login （Will check Wrong credentials）
- Line 685 register_drone_technician （Will check if Input chainName or storeName exist or not）
- Line 713 register_manager （Will check if input chainName has been assigned a manager or not)

如果需要对initial database进行修改，在./SQL_database/grocery_drone_delivery.sql 里面改
- Line 494 Update all users' password to hashed password with MD5