---
id: setup
title: Setting It Up
---

There are a few steps to perform before ISOBlue 2.0 can send data to the Cloud.
The following sections assume that you have already flashed an ISOBlue image to
the ISOBlue hardware. They also serve as a basic debugging steps for anyone who
cannot get ISOBlue running as expected.

<!--truncate-->

ISOBlue 2.0 manages the scripts and programs using [systemd][1]. You can view all the
services running by using this command:
```shell
root@localhost:~# systemctl status
```
You can replace `status` with `enable`, `disable`, `start` and `stop` plus a
service name to perform different actions on a service.

You can check the status and view the log of a service by running:
```shell
root@localhost:~# journalctl -u name-of-service
```

## Check Internet Connectivity

ISOBlue 2.0 uses [qmicli][5] to setup the Internet connections. The network
device is specified as `wwan0`. There are two ways to check for Internet
connectivity:

1. `ping`
```shell
ping google.com
```
Check if you could get any responses.

2. `ifconfig`

After you run `ifconfig`, you should be able to see that `wwan0` is already
associated with an IP address.

In our testing, sometimes an ISOBlue 2.0 could try multiple IPs and then settle
down to one. This process sometimes takes up to several minutes.

Once you are certain that your ISOBlue 2.0 has Internet, move on to the next
section.

## Setup SSH Connections

[SSH][6] plays a critical role for debugging and data streaming to Cloud in
ISOBlue 2.0. We have provided two default SSH related `systemd` services:

1. *ssh-forward.service*

This service performs SSH port forwarding from your ISOBlue 2.0's local SSH port
to a port on a remote machine. By default, the remote machine username and
domain is `isoblue2@vip4.ecn.purdue.edu`.

2. *tunnel.service*

This service provides SSH tunneling for mirroring Kafka clusters between ISOBlue
2.0 and the remote cluster. By default, the remote cluster username and domain is
`yang@cloudradio39.ecn.purdue.edu`.

You can change the remote machine and cluster any time.

### Generate SSH Keys

Run the following command to generate a SSH public key and a private key (**use
default location and use no password**):
```shell
root@localhost:~# ssh-keygen
```
Once the keys are generated, they will be located in `~/.ssh`. We would need
the content in `id_rsa.pub`.

### Setup SSH Forward

Add the content of `id_rsa.pub` on ISOBlue 2.0 to your remote machine's
`authorized_keys`.

Then you will run this on ISOBlue:
```shell
root@localhost:~# ssh -NR *:SSHPORT:localhost:22 username@domain1
```
You will be prompt to type yes or no. Type yes to add the remote host to your
`known_hosts`. You only need to do it manually once.

Note: `SSHPORT` is specified when you are building your image.

### Setup SSH Tunnel

Add the content of `id_rsa.pub` on ISOBlue 2.0 to your remote machine's
`authorized_keys`.

Then you will run this on ISOBlue:
```shell
root@localhost:~/# ssh -NL localhost:BROKERPORT:domain2:9092 -L \
                  localhost:ZKPORT:domain2:2181 \
                  username@domain2
```
You will be prompt to type yes or no. Type yes to add the remote host to your
`known_hosts`. You only need to do it manually once.

Notes:

* `BROKERPORT`, `ZKPORT` are also specified when you build your image.
* `domain1` and `domain2` can be the same machine but `domain2` needs to have
Kafka broker and a zookeeper running.

## Check Running Services

There are a few key `systemd` services that will be running after flashing
process is completed and after each boot:

1. *gpsd.service*

This service connects to the USB GPS module and enables clients to fetch GPS
related data. When you use `journalctl -u gpsd` to check its logs, you usually
see useful on whether this service is working or not. Typically, if it is
working, you will be see some words like `time to report a fix ...` or something
along the line.

2. *broker.service* and *zookeeper.service*

The combination of these two services is the **heart** of ISOBlue 2.0. **No
broker/zookeeper, no logging.** The *broker* and *zookeeper* bring up and
handle the overall logging of CAN messages, GPS data and other debugging data.
We uses the prepackaged broker and zookeeper binaries provided by the [Apache
Kafka][2] project. You can also use `journalctl` to check the statuses of these
two services. The settings for *broker* and *zookeeper* are located in
`/opt/kafka/config`. The details for the settings can be found [here][3].

A quick way to verify that the two services  are running is to check the folders
in `kafka-logs` in `/media/sda1`. Within this directory, you will see a
structure that is familiar to this:
```shell
kafka-logs
└── remote-0
└── tra-0
└── imp-0
└── gps-0
└── ...
```
The folder name `xxxx-0` represents the Kafka topic name and within each of these
folders, you should be able see things like this after you run `ls -alh`:
```shell
-rw-rw-r-- 1 root root  84K Nov 30 00:13 00000000000011544725.index
-rw-r--r-- 1 root root  43M Nov 30 00:14 00000000000011544725.log
-rw-rw-r-- 1 root root  74K Nov 30 00:14 00000000000011544725.timeindex
```
The file ends with `.log` is the Kafka log that stores all the collected data.
You can keep checking whether the size of the file changes or not. This will
quickly tell you statuses of the *broker*, *zookeeper* and other logging
services.

3. *mirror.service*

This service uses the SSH tunnel setup to forward `debug` and `remote` topic
Kafka message to a remote Kafka cluster residing in an OATS cluster. It requires
network connectivity for this service to work.

4. *can-watchdog.service*

This service watches the presence of CAN activities. It is **not** enabled by
default. You can keep it disabled when you are configuring an ISOBlue 2.0 for
the first time. Remember to enable it once you are done setting up the ISOBlue.
Otherwise, the device will keep running until you cut the power (or the power
runs out).

You can also check the statuses and perform actions on all the other ISOBlue 2.0
specified services. The name and all `systemd` service file can be found
[here][4].

[1]: https://www.freedesktop.org/wiki/Software/systemd/
[2]: https://kafka.apache.org/
[3]: https://kafka.apache.org/documentation/#configuration
[4]: https://github.com/ISOBlue/meta-isoblue/tree/master/recipes-core/systemd/systemd
[5]: https://www.freedesktop.org/software/libqmi/man/1.8.0/qmicli.1.html
[6]: https://www.ssh.com/ssh/
