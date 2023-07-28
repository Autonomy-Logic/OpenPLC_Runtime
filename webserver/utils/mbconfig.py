from os.path import dirname

cfg_folder = dirname(__file__) + "/config"
header_file = f"{cfg_folder}/header_base.cfg"
device_file = f"{cfg_folder}/device_base.cfg"


def generateConfig(dev_list, polling_period, timeout):
    with open(header_file, "r") as hf:
        header = hf.read()

    with open(device_file, "r") as df:
        device_model = df.read()

    devices = [d for d in dev_list]

    print(devices)

    header = (
        header.replace("{num_devices}", f"{len(devices)}")
        .replace("{polling_period}", f"{polling_period}")
        .replace("{timeout}", f"{timeout}")
    )

    for i, d in enumerate(devices):
        config = device_model.replace("{counter}", f"{i}")
        for key, value in d.items():
            config = config.replace(f"{{{key}}}", f"{value}")
        devices[i] = config

    with open(f"{cfg_folder}/mbconfig.cfg", "w") as mb:
        mb.write(header)
        mb.write("\n")
        for d in devices:
            mb.write("\n")
            mb.write(d)
