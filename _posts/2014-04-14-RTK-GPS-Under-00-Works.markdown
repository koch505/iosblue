---
layout: post
title: RTK GPS for Under $200 Works!
date: 2014-04-14
excerpt: Open source, centimeter-level accuracy.
---
<div class="row" markdown="block">
<div class="span6" markdown="block">

We've been working on getting RTK GPS working on ISOBlue for about a year.  We finally had
some success a couple of weeks ago.  In the chart to the right, see the measured results.
The yellow points indicate the estimated position before RTK lock was achieved, and
the green points indicate the position after RTK lock was achieved.  Notice the scale has
each grid box as a 1x1 cm grid.  In this test, the box was sitting still.

We used an [NVS NV08C-CSM-BRD](http://www.nvs-gnss.com/products/receivers/item/36-nv08c-csm-brd.html) receiver,
an off-the-shelf cheap passive GPS antenna, and ISOBlue.  We setup a free account with the Indiana
Department of Transportation's CORS network to get the RTK base station corrections.  The output of the
NV08C and the streaming base station data were both fed into RTKLib running on ISOBlue.  ISOBlue did the
corrections in real-time And viola!  1-cm accuracy for under $200.

We were excited enough by this test, we ran another.  We found a survey location whose position is known extremely well,
and placed our antenna on that spot.  Pictures are below, and they are self-explanatory: the red dot is the known
true location and the blue dots are the locations computed by ISOBlue.  Only 1-cm away from the true
known location!  Testing is continuing...

</div>
<div class="span6" markdown="block">
![Measured RTK GPS Accuracy Graph](/images/measured_rtk_gps_accuracy1.png)
</div>
</div>

![Recorded positions vs. Actual Survey Location](/images/rtk_car_with_antenna.jpg)

![Surveyed location with our antenna sitting on it](/images/rtk_accuracy_surveyed.png)


