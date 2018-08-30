---
id: data
title: How to Read Data
---

This tutorial assumes you are running Linux and know your way around it.

## Prerequisites

### Install the Java Run Time Envrionment (JRE)

For installing the JRE, please consult [this webpage][1] as it provides an easy,
step-by-step process to install JRE.

To verify the JRE has been installed correctly, run:
```
java -version
```
This should output something along the line with these:
```
java version "1.8.0_181"
Java(TM) SE Runtime Environment (build 1.8.0_181-b13)
Java HotSpot(TM) 64-Bit Server VM (build 25.181-b13, mixed mode)
```

### Install libraries and dependencies

* Install kafka-python

[kafka-python][2] is the python client for Apache Kafka. For the consumer
scripts we wrote, it uses the library's [KafkaConsumer][3] to consume the
message from a broker. To install, run:
```shell
pip install kafka-python
```

To verify the library has been installed correctly, start python shell and run:
```python
from kafka import KafkaConsumer
```
If no error pop up, that means the library is all set.

* Install avro

We use [Apache Avro][4] for packing our data into binary format using schemas
we defined for CAN, GPS and other messages. To install avro, please follow the
[tutorial][5] from the official webpage.

To verify the library has been installed correctly, run this in a python
shell:
```python
import avro
```
This should not raise any error if the library is installed correctly.

### Download and setup system path for Kafka

We are using an older version of Apache Kafka. It can be downloaded from [this
link][6].

After download is complete, extract the content into a directory of your
choice. The directory will have `bin` that has all the executables and `config`
that contains all the configuration files for the executables.

We need to add the needed executables into system path. To do so, add
this line to the end of your `~/.profile`:
```shell
export PATH=/somewhere/on/your/filesystem/kafka_2.11-0.10.1.0/bin:$PATH
```
Save and exit and do:
```shell
source ~/.profile
```
Then this path will be added to your system path **ONLY** for this terminal
session. To make this permanent, you have to log back out and in again.

To make sure the executables are in the path, try typing in `kafka` in the
terminal and tab-completing, it should have a number of options. Try
tab-completing `zookeeper` as well as it should give you a number of options
too. Make sure you have these executables:
* `zookeeper-server-start.sh`
* `kafka-server-start.sh`
* `kafka-server-stop.sh`
* `zookeeper-server-stop.sh`

### Download custom scripts and schemas

First off, download the custom scripts from [here][7] and extract the contents.
Let's go through the contents one by one.

1. `kafka_preps.sh`

This script starts off an instance of zookeeper and a Kafka broker. There are
several variables to specify for it to run correctly. The specifications will
be discussed in the *Setup a zookeeper and a Kafka broker* section.

2. `kafka_stop.sh`

You can use this script to stop the zookeeper and the broker instance you
created.

3. `kafka_can_consumer.py` and `kafka_gps_consumer.py`

These two scripts use the `python-kafka` and the `avro` library you just
installed. One consumes the CAN messages and the other consumes the gps
messages from the broker you set up. The details on how to use these two scripts
will be discussed in later sections.

4. `schema` directory

This directory contains the avro schemas we defined for different message types.

### Have your data ready

You can transfer the `kafka-logs` directory from your ISOBlue 2.0 device to a
local directory of your choice. Alternatively, you can download some `kafka-logs`
from the *Public Data* section from this site to test.

## Setup a zookeeper and a Kafka broker

For this part, you will need the `kafka_preps.sh` script.

There are two parameters you need to change in this script.

1. `cfgdir`

This directory specifies the configuration files directory for the zookeeper and
the broker. It usually should be changed to a absolute path of where you put you
extracted the Kafka directory.

2. `kflogdir`

This directory should contain the absolute path that point to whereever you
store your `kafka-logs` directory.

After these two parameters are set, run this in your terminal:
```
./kafka_preps.sh
```
If no error pop up, then an instance of a zookeeper and a broker should be up.

## Consume Kafka messages

Once you have the zookeeper and broker up, we can start consuming messages from
them. **Make sure** the `schema` directory is in the same directory as where
the scripts reside.

### Consume CAN messages

To consume the CAN messages, you will use the `kafka_can_consumer.py` script.
You will need to specify a `topic` and an `auto_offset_reset` parameter. The
available `topic`s for consuming CAN messages are:
* `tra`
* `imp`

And the available `auto_offset_reset` parameters are:
* `earliest`
* `latest`

For consuming the CAN messages from the start of the tractor bus log, you will
run:
```
./kafka_can_consumer.py -t tra -a earliest
```
Or simply:
```
./kafka_can_consumer.py -t tra
```
As the script defaults to consume from the beginning of the log from a given
topic.

The script will then output the consumed logs that has timestamp, pgn, and the
data payload bytes and these fields are space-separated.

You can use `>` to redirect the script output to a file, i.e.:
```shell
./kafka_can_consumer.py -t tra > tra.log
```
The script will exit once it consumes all the messages.

### Consume GPS messages

The `kafka_gps_consumer.py` is not written as rigorous as
`kafka_can_consumer.py`. The topic is set to `gps` and the `auto_offset_reset`
parameter is already set to `earliest` in the script. To consume the GPS
messages and store them in a file, just run:
```
./kafka_gps_consumer.py > gps.log
```

## Stop zookeeper and broker

After you think you are done using the zookeeper and broker, you can start them
by running the custom script:
```
./kafka_stop.sh
```

[1]: https://medium.com/coderscorner/installing-oracle-java-8-in-ubuntu-16-10-845507b13343
[2]: https://pypi.org/project/kafka-python/
[3]: https://kafka-python.readthedocs.io/en/master/apidoc/KafkaConsumer.html
[4]: https://avro.apache.org/docs/1.8.1/index.html
[5]: https://avro.apache.org/docs/1.8.1/gettingstartedpython.html
[6]: http://cloudradio39.ecn.purdue.edu/kafka_2.11-0.10.1.0.tar.gz
[7]: http://cloudradio39.ecn.purdue.edu/scripts_and_schemas.tar.gz
