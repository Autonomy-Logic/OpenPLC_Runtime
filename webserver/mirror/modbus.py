from .classes import Integer, String

ModbusType = {
    "dev_name": String,
    "slave_id": Integer,
    "dev_type": String,
    "com_port": String,
    "ip_address": String,
    "ip_port": Integer,
    "baud_rate": Integer,
    "parity": String,
    "data_bits": Integer,
    "stop_bits": Integer,
    "pause": Integer,
    "di_start": Integer,
    "di_size": Integer,
    "coil_start": Integer,
    "coil_size": Integer,
    "ir_start": Integer,
    "ir_size": Integer,
    "hr_read_start": Integer,
    "hr_read_size": Integer,
    "hr_write_start": Integer,
    "hr_write_size": Integer,
}

ModbusNullable = ["ip_address"]
