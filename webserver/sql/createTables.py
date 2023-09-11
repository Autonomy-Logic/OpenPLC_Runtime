# Creates User Table
User = """CREATE TABLE User
(id INTEGER not null,
name VARCHAR(255) not null,
username VARCHAR(255) not null,
email VARCHAR(255) not null,
password VARCHAR(255) not null,
profile_picture VARCHAR(255),
salt VARCHAR(255),
CONSTRAINT pk_user PRIMARY KEY (id),
CONSTRAINT uq_user UNIQUE (username));"""

# Creates Settings table
Settings = """CREATE TABLE Settings
(key VARCHAR(20) not null,
value VARCHAR(20) not null,
CONSTRAINT pk_settings PRIMARY KEY (key));"""

# Creates Slave_Dev Table
SlaveDev = """CREATE TABLE Slave_Dev
(dev_id INTEGER not null,
dev_name VARCHAR(256) not null,
dev_type VARCHAR(5) not null,
slave_id INTEGER not null,
com_port VARCHAR(10) not null,
baud_rate INTEGER not null,
parity VARCHAR(5) not null,
data_bits INTEGER not null,
stop_bits INTEGER not null,
ip_address VARCHAR(20) not null,
ip_port INTEGER not null,
di_start INTEGER not null,
di_size INTEGER not null,
coil_start INTEGER not null,
coil_size INTEGER not null,
ir_start INTEGER not null,
ir_size INTEGER not null,
hr_read_start INTEGER not null,
hr_read_size INTEGER not null,
hr_write_start INTEGER not null,
hr_write_size INTEGER not null,
pause INTEGER not null,
CONSTRAINT pk_dev PRIMARY KEY (dev_id));"""

allTables = [User, Settings, SlaveDev]
