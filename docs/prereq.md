---
id: prereq
title: Prerequisites
---

Since the building process is very customizable, if you do not have similar
experience, it is recommended that you read through some of the [Yocto project
documentations][1] to get started. If you do not have much experience in Linux,
you can still download a [prebuilt ISOBlue image][2] and follow the [flashing
instructions](flashing.md) to get yourself an ISOBlue.

## Machine Requirement

For building an ISOBlue image, a powerful, multi-core host machine is highly
recommended. There should be a minimum of 60GB of free disk place and 4GB of
RAM. The build procedure is currently only tested on Ubuntu 16.10.

<!--truncate-->

## Preparations
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

[1]: http://www.yoctoproject.org/docs/2.4.1/mega-manual/mega-manual.html
[2]: https://drive.google.com/open?id=0B6AeE6Ne4z3aX0VFXzRVWGNSRjQ
