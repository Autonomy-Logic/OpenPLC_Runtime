from utils.mbconfig import generateConfig
from . import db
from sqlite3 import connect, Row
from mirror.modbus import ModbusType, ModbusNullable
from sql.scripts import insert, select
from sql.utils import convertData


def addModbus(modbus):
    database = connect(db)
    database.row_factory = Row

    convertData(modbus, ModbusType, ModbusNullable)

    script = insert("Slave_Dev", modbus)

    try:
        c = database.execute(script)
        d = c.fetchone()
        k = d.keys()
        d = dict(zip(k, d))
        database.commit()
        return d
    except:
        raise Exception("Failed persisting slave device in database")


def genCfg(polling_period=5000, timeout=5000):
    database = connect(db)
    database.row_factory = Row

    script = select("Slave_dev")

    try:
        c = database.execute(script)
        d = c.fetchall()
        k = d[0].keys()
        dev_list = list(map(lambda x: dict(zip(k, x)), d))
        database.commit()
    except:
        raise Exception("Failed retrieving modbus to generate CFG")

    generateConfig(dev_list, polling_period, timeout)
