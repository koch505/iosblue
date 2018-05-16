---
id: flashing
title: Flashing an Image
---

## Things You Will Need

* An microSD card that is at least 4GB.
* A USB to serial adapter.
* A 5 VDC power supply.
* A serial adapter. It would be the best if you get it from [Toradex][1]
since it needs a correct header to connect to the serial ports on the Ixora
module.
* An Ixora board with Apalis iMX6 module properly installed.

**Note: if you want to flash, configure and test your ISOBlue seamlessly, it is
highly recommended that you install the specified cellular module, SSD, and GPS
module before the flashing process.**

<!--truncate-->

## Preparing a Flashable SD Card

After you follow through the [building instructions](building.md) or download
the [prebuilt ISOBlue image][2], you should have an image tar ball. You would
need to extract the tar ball content:
```
sudo tar xvf Isoblue2_apalis-imx6_image_2.7b2-YYYYMMDD.tar.bz2
```

After extracting process, the extracted directory will look like the following:
```
extracted-dir
└── apalis-imx6_bin
└── imx_flash
└── mnt
└── rootfs
update.sh
```
* `apalis-imx6_bin` contains the kernel image `uImage` as well as the image
files for flashing purposes.
* `imx_flash` contains custom scripts from Toradex for flashing iMX modules.
* `rootfs` contains all the ISOBlue files that would be flashed onto the
flash memory.

### Editing `rootfs/etc/hosts`

The default `rootfs/etc/hosts` contains a hostname that would cause malfunction
of Kafka. To correct this, change the first line to:
```
127.0.0.1 localhost.localdomain   apalis-imx6
```
Save the changed file.

### Making a Flashable SD card

Use `update.sh` to make a flashable microSD card:
```
./update.sh -o /your/sd/card/mntpt
```
After the script finishes, you will have a flashable microSD card.

## Flashing

Please follow the listed steps:

* Connect the serial adapter to the corresponding serial header (X22) on Ixora
board. Bring up your favoriate serial terminal.
* Insert the flashable microSD card you have prepared to SD card slot (X19).
* Connect the power supply to the Ixora board.
* Apply power and hit any key to stop autobooting.

After interrupting the boot sequence, you will be put into U-Boot command line.

Then, for **Ixora V1.0A**, do:
```
Apalis iMX6 # setenv drive 2
Apalis iMX6 # setenv setupdate 'fatload mmc ${drive}:1 ${loadaddr} flash_mmc.img; source ${loadaddr}'
Apalis iMX6 # setenv fdt_file imx6q-apalis-ixora.dtb
Apalis iMX6 # saveenv
```
* Reset the board and hit any key to stop autobooting. In U-Boot command line,
do:
```
Apalis iMX6 # run setupdate
```
and
```
Apalis iMX6 # run update
```

For **Ixora V1.1A**, you can skip the `setenv` and `saveenv` commands. After
dropping into the U-Boot command line for the first time, do:
```
Apalis iMX6 # run setupdate
```
and
```
Apalis iMX6 # run update
```
If the flashing is successful, the device will automatically boot into the
ISOBlue image. At this point, you can proceed to configure the newly flashed
ISOBlue 2.0.

You can also take a look at [Toradex's instructions][3] for flashing an image as
this documentaion is referenced heavily upon this resource.

[1]: https://developer.toradex.com/products/carrier-board-accessory-kit
[2]: https://drive.google.com/open?id=0B6AeE6Ne4z3aX0VFXzRVWGNSRjQ
[3]: https://developer.toradex.com/knowledge-base/flashing-linux-on-imx6-modules#Apalis_iMX6
