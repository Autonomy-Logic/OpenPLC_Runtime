from flask import Blueprint, send_file, redirect, request
from flask_login import login_required
from database.modbus import addModbus, genCfg
import serial.tools.list_ports
import platform
import json

blueprint = Blueprint("modbusApi", __name__)


@blueprint.route("/modbus", methods=["GET", "POST"])
@login_required
def modbus():
    return send_file("static/html/modbus.html")


@blueprint.route("/addDevice", methods=["GET", "POST"])
@login_required
def addDevice():
    if request.method == "POST":
        device = request.form
        addModbus(dict(device))
        genCfg()
    return send_file("static/html/modbus/addDevice/addModbusDevice.html")


# Test URL
@blueprint.route("/genCfg", methods=["GET", "POST"])
# @login_required
def generateCfg():
    genCfg()
    return redirect("/dashboard")


@blueprint.route("/editDevice", methods=["GET", "POST"])
@login_required
def editDevice():
    return send_file("static/html/modbus/editDevice/editModbusDevice.html")


@blueprint.route("/modbus/deviceTypes", methods=["GET", "POST"])
@blueprint.route("/modbus/deviceTypes/<value>", methods=["GET", "POST"])
@login_required
def deviceTypes(value=None):
    if value:
        with open("static/json/deviceTypes.json") as file:
            content = json.loads(file.read())
            try:
                device = list(filter(lambda x: x["value"] == value, content))[0]
                return json.dumps(device)
            except:
                return ("Device not found", 404)
    return send_file("static/json/deviceTypes.json")


@blueprint.route("/modbus/comPorts", methods=["GET", "POST"])
@login_required
def comPorts():
    ports = [comport.device for comport in serial.tools.list_ports.comports()]
    portNames = []
    for port in ports:
        portNames.append(port)
    if platform.system().startswith("CYGWIN"):
        portNames = list(
            map(lambda x: "COM" + str(int(x.split("/dev/ttyS")[1]) + 1), portNames)
        )

    portNames = ["COM1", "COM2", "COM3"]

    return json.dumps(portNames)