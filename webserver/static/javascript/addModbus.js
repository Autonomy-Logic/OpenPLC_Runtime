var parityTypes = [
  {
    id: 1,
    value: "none",
    text: "None",
  },
  {
    id: 2,
    value: "even",
    text: "Even",
  },
  {
    id: 3,
    value: "odd",
    text: "Odd",
  },
];

var deviceTypes = [];

function getParityValue(id) {
  var parity = parityTypes.find((p) => p.id === id);
  return parity ? parity.value : parityTypes[0].value;
}

function populateDropdown() {
  var tcp_stuff = document.getElementById("tcp-stuff");
  var rtu_stuff = document.getElementById("rtu-stuff");
  fetch("/modbus/deviceTypes")
    .then((response) => {
      return response.json();
    })
    .then((jsondata) => {
      var selectedType = "rtu";
      var selected = "generic_rtu";
      jsondata.forEach((e) => {
        if (e.isSelected) {
          selectedType = e.type;
          selected = e.value;
        }
      });
      switch (selectedType) {
        case "rtu":
          populateCOM();
          tcp_stuff.style.display = "none";
          rtu_stuff.style.display = "block";
          break;
        case "tcp":
          tcp_stuff.style.display = "block";
          rtu_stuff.style.display = "none";
          break;
        default:
          break;
      }
      var e = document.getElementById("dev_protocol");
      var tcp = document.createElement("optgroup");
      tcp.label = "TCP";
      var rtu = document.createElement("optgroup");
      rtu.label = "RTU";
      for (let hardware of jsondata) {
        deviceTypes.push(hardware);
        var option = document.createElement("option");
        option.value = hardware.value;
        option.selected = hardware.isSelected;
        option.innerHTML = hardware.label;
        if (hardware.type === "tcp") {
          tcp.appendChild(option);
        } else {
          rtu.appendChild(option);
        }
      }
      e.appendChild(rtu);
      e.appendChild(tcp);
      refreshSelector();
    });
}

async function getDevice(value) {
  var type = deviceTypes.find((i) => i.value === value);
  if (!type) {
    type = await fetch(`/modbus/deviceTypes/${value}`).then((response) => {
      return response.json();
    });
  }
  return type || null;
}

function populateCOM() {
  fetch("/modbus/comPorts")
    .then((response) => {
      return response.json();
    })
    .then((jsondata) => {
      var e = document.getElementById("dev_cport");
      e.innerHTML = "";
      for (let port of jsondata) {
        var option = document.createElement("option");
        option.value = port.toLowerCase();
        option.innerHTML = port;
        e.appendChild(option);
      }
    });
}

function populateParity() {
  var e = document.getElementById("dev_parity");
  e.innerHTML = "";
  for (let p of parityTypes) {
    var option = document.createElement("option");
    option.value = p.value;
    option.innerHTML = p.text;
    e.appendChild(option);
  }
}

async function refreshSelector() {
  var drop_down = document.getElementById("dev_protocol");
  var selected = [...drop_down.options].find((o) => o.selected);
  var tcp_stuff = document.getElementById("tcp-stuff");
  var rtu_stuff = document.getElementById("rtu-stuff");
  setupPageContent(selected.value);
}

window.onload = async function () {
  populateDropdown();
  populateParity();
  LoadValuesFromDB();
};

function turnElementOn(element) {
  element.readOnly = false;
  element.value = "";
  element.style.backgroundColor = "white";
  element.style.color = "black";
}

function turnElementOff(element) {
  element.readOnly = true;
  element.style.backgroundColor = "#F8F8F8";
  element.style.color = "#9C9C9C";
}

async function setupPageContent(value) {
  var dropmenu = document.getElementById("dev_protocol");
  var tcpdiv = document.getElementById("tcp-stuff");
  var rtudiv = document.getElementById("rtu-stuff");

  var devport = document.getElementById("dev_port");
  var devid = document.getElementById("dev_id");

  var devbaud = document.getElementById("dev_baud");
  var devparity = document.getElementById("dev_parity");
  var devdata = document.getElementById("dev_data");
  var devstop = document.getElementById("dev_stop");
  var devpause = document.getElementById("dev_pause");

  var distart = document.getElementById("di_start");
  var disize = document.getElementById("di_size");
  var dostart = document.getElementById("do_start");
  var dosize = document.getElementById("do_size");
  var aistart = document.getElementById("ai_start");
  var aisize = document.getElementById("ai_size");
  var aorstart = document.getElementById("aor_start");
  var aorsize = document.getElementById("aor_size");
  var aowstart = document.getElementById("aow_start");
  var aowsize = document.getElementById("aow_size");

  if (value == "generic_tcp") {
    tcpdiv.style.display = "block";
    rtudiv.style.display = "none";

    turnElementOn(devport);
    turnElementOn(devid);
    turnElementOn(distart);
    turnElementOn(disize);
    turnElementOn(dostart);
    turnElementOn(dosize);
    turnElementOn(aistart);
    turnElementOn(aisize);
    turnElementOn(aorstart);
    turnElementOn(aorsize);
    turnElementOn(aowstart);
    turnElementOn(aowsize);
  } else if (value == "generic_rtu") {
    tcpdiv.style.display = "block";
    rtudiv.style.display = "none";

    tcpdiv.style.display = "none";
    rtudiv.style.display = "block";

    turnElementOn(devid);
    turnElementOn(devbaud);
    turnElementOn(devparity);
    devparity.value = "None";
    turnElementOn(devdata);
    turnElementOn(devstop);
    turnElementOn(devpause);
    devpause.value = "0";
    turnElementOn(distart);
    turnElementOn(disize);
    turnElementOn(dostart);
    turnElementOn(dosize);
    turnElementOn(aistart);
    turnElementOn(aisize);
    turnElementOn(aorstart);
    turnElementOn(aorsize);
    turnElementOn(aowstart);
    turnElementOn(aowsize);
  } else if (dropmenu.options[dropmenu.selectedIndex].value == "Uno") {
    tcpdiv.style.display = "none";
    rtudiv.style.display = "block";

    turnElementOff(devid);
    devid.value = "0";
    turnElementOff(devbaud);
    devbaud.value = "115200";
    turnElementOff(devparity);
    devparity.value = "None";
    turnElementOff(devdata);
    devdata.value = "8";
    turnElementOff(devstop);
    devstop.value = "1";
    turnElementOff(devpause);
    devpause.value = "0";
    turnElementOff(distart);
    distart.value = "0";
    turnElementOff(disize);
    disize.value = "5";
    turnElementOff(dostart);
    dostart.value = "0";
    turnElementOff(dosize);
    dosize.value = "4";
    turnElementOff(aistart);
    aistart.value = "0";
    turnElementOff(aisize);
    aisize.value = "6";
    turnElementOff(aorstart);
    aorstart.value = "0";
    turnElementOff(aorsize);
    aorsize.value = "0";
    turnElementOff(aowstart);
    aowstart.value = "0";
    turnElementOff(aowsize);
    aowsize.value = "3";
  } else if (dropmenu.options[dropmenu.selectedIndex].value == "Mega") {
    tcpdiv.style.display = "none";
    rtudiv.style.display = "block";

    turnElementOff(devid);
    devid.value = item.slaveId;
    turnElementOff(devbaud);
    devbaud.value = item.baudRate;
    turnElementOff(devparity);
    devparity.value = getParityValue(item.parity);
    turnElementOff(devdata);
    devdata.value = item.dataBits;
    turnElementOff(devstop);
    devstop.value = item.stopBits;
    turnElementOff(devpause);
    devpause.value = item.transmissionPause;
  }

  turnElementOff(distart);
  distart.value = item.discreteInputs.startAddress;
  turnElementOff(disize);
  disize.value = item.discreteInputs.size;
  turnElementOff(dostart);
  dostart.value = item.coils.startAddress;
  turnElementOff(dosize);
  dosize.value = item.coils.size;
  turnElementOff(aistart);
  aistart.value = item.inputRegisters.startAddress;
  turnElementOff(aisize);
  aisize.value = item.inputRegisters.size;
  turnElementOff(aorstart);
  aorstart.value = item.holdingRegistersRead.startAddress;
  turnElementOff(aorsize);
  aorsize.value = item.holdingRegistersRead.size;
  turnElementOff(aowstart);
  aowstart.value = item.holdingRegistersWrite.startAddress;
  turnElementOff(aowsize);
  aowsize.value = item.holdingRegistersWrite.size;
}

function validateForm() {
  var devname = document.forms["uploadForm"]["dev_name"].value;
  var devid = document.forms["uploadForm"]["dev_id"].value;

  var devip = document.forms["uploadForm"]["dev_ip"].value;
  var devport = document.forms["uploadForm"]["dev_port"].value;

  var devbaud = document.forms["uploadForm"]["dev_baud"].value;
  var devdata = document.forms["uploadForm"]["dev_data"].value;
  var devstop = document.forms["uploadForm"]["dev_stop"].value;
  var devpause = document.forms["uploadForm"]["dev_pause"].value;

  var distart = document.forms["uploadForm"]["di_start"].value;
  var disize = document.forms["uploadForm"]["di_size"].value;
  var dostart = document.forms["uploadForm"]["do_start"].value;
  var dosize = document.forms["uploadForm"]["do_size"].value;
  var aistart = document.forms["uploadForm"]["ai_start"].value;
  var aisize = document.forms["uploadForm"]["ai_size"].value;
  var aorstart = document.forms["uploadForm"]["aor_start"].value;
  var aorsize = document.forms["uploadForm"]["aor_size"].value;
  var aowstart = document.forms["uploadForm"]["aow_start"].value;
  var aowsize = document.forms["uploadForm"]["aow_size"].value;

  if (
    devname == "" ||
    devid == "" ||
    distart == "" ||
    disize == "" ||
    dostart == "" ||
    dosize == "" ||
    aistart == "" ||
    aisize == "" ||
    aorstart == "" ||
    aorsize == "" ||
    aowstart == "" ||
    aowsize == ""
  ) {
    alert("Please fill out all the fields before saving!");
    return false;
  }

  var dropmenu = document.getElementById("dev_protocol");
  var device_type = dropmenu.options[dropmenu.selectedIndex].value;
  if (
    device_type == "TCP" ||
    device_type == "ESP32" ||
    device_type == "ESP8266"
  ) {
    if (devip == "" || devport == "") {
      alert("Please fill out all the fields before saving!");
      return false;
    }
  } else {
    if (devbaud == "" || devdata == "" || devstop == "") {
      alert("Please fill out all the fields before saving!");
      return false;
    }
  }

  return true;
}
