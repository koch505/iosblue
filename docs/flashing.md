---
id: flashing
title: Flashing an Image
---

## Things You Will Need

* An microSD card that is at least 4GB.
* An USB to serial adapter.
* An serial null modem. It would be the best if you get it from [Toradex][1]
since it needs a correct header to connect to the serial ports on the Ixora
module.
* Ixora board with Apalis iMX6 module properly installed.

<!--truncate-->

## Preparing a Flashable SD Card

After you follow through the [building instructions](building.md), you should
have an image tar ball. You would need to extract the tar
ball content first:
```
sudo tar xvf Isoblue2_apalis-imx6_image_2.7b2-YYYYMMDD.tar.bz2
```

Within the extracted folder, there should be a file called `update.sh`. You can
then do to make a flashable microSD card:
```
./update.sh -o /your/sd/card/mntpt
```

## Flashing

You can follow [Toradex's instructions][2] to flash an ISOBlue image for now.

After the flashing process is done, the device will automatically boot into the
ISOBlue image.

[1]: https://developer.toradex.com/products/carrier-board-accessory-kit
[2]: https://developer.toradex.com/knowledge-base/flashing-linux-on-imx6-modules#Apalis_iMX6
