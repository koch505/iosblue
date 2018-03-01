---
id: build
title: Build Instructions
---

## Prerequisites

The building process for ISOBlue 2,0 is very customizable. If you do not have
similar experience, it is recommended that you read through some of the [Yocto
project documentations][1] to get started. If you do not have much experience in
Linux, you can still download a [prebuilt ISOBlue image][2] and follow the
[flashing instructions](flashing.md) to get yourself an ISOBlue.

### Machine Requirement

For building an ISOBlue image, a powerful, multi-core host machine is highly
recommended. There should be a minimum of 60GB of free disk place, 4GB of RAM
and a decent Internet connection. The build procedure is currently only tested
on Ubuntu 16.10.

<!--truncate-->

### Preparations
ISOBlue's image (which added a bunch of custom recipes on top of Toradex BSP)
build requires some additional packages, mainly 32-bit flashing utilities. You
need to do:
```
sudo dpkg --add-architecture i386
sudo apt-get update
sudo apt-get install g++-5-multilib
sudo apt-get install curl dosfstools gawk g++-multilib gcc-multilib lib32z1-dev \
libcrypto++9v5:i386 libcrypto++-dev:i386 liblzo2-dev:i386 lzop libsdl1.2-dev \
libstdc++-5-dev:i386 libusb-1.0-0:i386 libusb-1.0-0-dev:i386 uuid-dev:i386 \
texinfo chrpath

cd /usr/lib; sudo ln -s libcrypto++.so.9.0.0 libcryptopp.so.6
```
We would also need to install [repo][3] for source synnchronizations:
```
sudo apt-get install repo
```

### Source Synchronization
You need to simply do:
```
mkdir isoblue-core
cd isoblue-core
repo init -u https://github.com/ISOBlue/isoblue-image -b master
repo sync
```
After getting the ISOBlue image source, you can do:
```
. export
```
After sourcing `export`, you will be put into the `build` directory with the
following items configured for the **current** session:
* bitbake executable
* shell environment variables

You will need to source `export` again to have the right configurations.

### Editing isoblue.conf
Before building the image, edit `isoblue.conf` under `top-level-directory`,
i.e., `isoblue-core` in our instruction:

The settings you need to change is the `ID` and `MACHINEID`.

* For `ID`, please set your `ID` to be 5 or greater for now as we already have 5
  of them built and any id that is less than 5 will cause some grief on our end
(see [How ISOBlue 2.0 Works?](howitworks.md)). This is only a temporary solution
and will get changed in the future.
* For `MACHINEID`, you can append a string of your choice to the configured `ID`.
The string can only contain letters.


## Building
Given that you are in the `build` directory, run:
```
bitbake -r ../isoblue.conf console-isoblue-image
```
This command reads in the configuration you set in the `isoblue.conf` earlier
and use the settings to build an image. This first build usually takes of hours
(it involves a lot of downloading and compiling). **Be patient!**

After a successful build, you should have the following
directory structure for for your `deploy` directory:
```
isoblue-oe
└── deploy
│   └── images
│       └── apalis-imx6
│   └── ipk
│   └── licenses
```
`apalis-imx6` is the processor ISOBlue 2.0 is using. The image should be located
in the `apalis-imx6` folder. The image file we are looking for should be in the
format of `Isoblue2_apalis-imx6_image_2.7b2-YYYYMMDD.tar.bz2`. Copy this file
to a directory of your choice and follow the [flashing instructions](flashing.md)
to load the image onto your hardware.

[1]: http://www.yoctoproject.org/docs/2.4.1/mega-manual/mega-manual.html
[2]: https://drive.google.com/open?id=0B6AeE6Ne4z3aX0VFXzRVWGNSRjQ
[3]: https://source.android.com/setup/using-repo
