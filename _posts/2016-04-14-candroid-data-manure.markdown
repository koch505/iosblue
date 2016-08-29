---
layout: post
title: Testing CANdroid During a Manure Spreading Session
date: 2016-04-14
excerpt: We utilized CANdroid to collect ISOBUS data and performed some simple analytics with data.
---
<div class="row" markdown="block">
<div class="span6" markdown="block">
We utilized CANdroid to collect ISOBUS data during a manure spreading session.
The session lasted for about 2 hours with a total of 6 passes of manure
spreading in the field.

CANdroid sitting in the back of the tractor:
![CANdroid-in-tractor](/images/CANdroid_in_field.jpg)

CANdroid collecting ISOBUS data while the tractor is running.
![CANdroid-running](/images/CANdroid_running.jpg)

After the data collection, we parsed the some useful data out using the stored
ISOBUS data and plotted them.

![fuel-rate-vs-speed](/images/fr_vs_speed.png) ![fuel-rate-vs-rpm](/images/fr_vs_rpm.png)
![fuel-rate-vs-ptorpm](/images/fr_vs_ptorpm.png) ![fuel-rate-vs-intantaneous-fuel-rate](/images/fr_vs_ife.png)

Some observations:

- if you look at the fuel rate for all 4 plots, we can observe that the fuel
rate went up and down. This pattern lasted 6 times which matches the total
number of passes we mentioned earlier.
- the engine RPM (PGN 61444) went up in a slope as fuel rate went down. This
makes since as the manure was depleting, the weight of the manure tank reduced
and thus resulted in better fuel rate and slightly higher RPM.
- the same patten happened for the PTO RPM.

We will continue testing CANdroid for its data collection and the Cloud
integration. Stay tuned!
