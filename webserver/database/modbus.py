from utils.mbconfig import generateConfig


def genCfg():
    # MOCKED DATA DEVICE

    mock_polling_period = 5000
    mock_timeout = 5000

    mocked_dev = {
        "device_name": "Device 1",
        "device_slave_id": 3,
        "device_protocol": "TCP",
        "device_address": "192.168.56.7",
        "device_ip_port": 5321,
        "device_rtu_baud_rate": 20000,
        "device_rtu_parity": 1,
        "device_rtu_data_bits": 20,
        "device_rtu_stop_bits": 2,
        "device_rtu_tx_pause": 32,
        "device_di_start": 52,
        "device_di_size": 30,
        "device_coils_start": 10,
        "device_coils_size": 30,
        "device_ir_start": 32,
        "device_ir_size": 50,
        "device_rrr_start": 111,
        "device_rrr_size": 11,
        "device_rr_start": 151,
        "device_rr_size": 15,
    }

    generateConfig([mocked_dev] * 3, mock_polling_period, mock_timeout)
