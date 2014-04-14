---
layout: post
title: We Have Yield!
date: 2013-11-19
excerpt: We can now get yield from a Case (Ag Leader) mass flow sensor over ISOBUS.
---

+-- {.row}
|+-- {.span6}
||The Holy Grail for ISOBlue has been to get yield and moisture data in
||real-time, and forward it over Bluetooth.  We are partially there: we have
||yield!  Using a calibrated yield monitor on the Case 6088, we logged data 
||for several runs and kept track of the wet bushels of corn that the monitor
||tallied for each run.
||
||The yield messages come through in PGN 65488.  The first two bytes represent
||the mass flow (yield), and can be interpreted as little-endian integers.
||We summed them up for each run, and then divided the monitor's wet bushel 
||total by this sum to get a scaling factor.  We then used the same scaling 
||factor for subsequent runs and compared the results to the monitor's wet 
||bushel total for each run. The scaling factor for that particular combine 
||turned out to be 1.895e-05. 
||
||The resulting numbers are very close as you can see in the graph to the right:
||
||-   0.6%, 
||-   0.8%, 
||-   and -0.3%
||
||difference from the monitor tally.
|+--
|+-- {.span6}
||![Yield Scaling Factor](/images/yield_scaling_factor.png)
|+--
+--
We're not sure exactly why we're getting such a small deviation, but for now
we're happy to get less than 1% error from a calibrated yield.

In order to figure out which messages are from the yield sensor, we collected
data with the yield sensor plugged in, then collected messages after unplugging
it.  We did the same for the moisture sensor. The elevator speed was apparently
in the same message as the yield, since it remained at 0 while the sensor was
unplugged.  Unplugging the yield sensor triggered no alarms in the combine, but
unplugging the moisture sensor resulted in an error about grain temperature
being out of range.

Our next steps are to figure out the moisture messages, and geolocate the
mass-flow numbers using the GNSS messages from the ISOBUS, and compare our yield
map to the monitor's yield map to identify which points in particular it is
altering non-linearly.  The monitor lists a standard delay of 12 seconds for
grain flow, so we'll be using the same metric.  Achieving accurate points at the
end of each row will be tricky, and we'll likely need to find the header
position ISOBUS message in order to know when the header is picked up and put
down.

The NAME of the yield sensor lists the manufacturer as Ag Leader, even though
the part number on the sensor is a CNH number.  I understand from industry
sources that Ag Ledaer is the standard manufacturer of mass flow sensors, so
there is a good chance that the same yield message format exists on other
manufacturers as well, but we'll need some volutneers to upload other trace
files in order to verify this.
