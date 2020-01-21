# weather-pi
Weather station for a Raspberry Pi

I repurposed a spare LCD screen into a custom weather monitor with the help of a Raspberry Pi, and I thought I'd share the details to help others.

[Front of the weather station](http://i.imgur.com/qk75S03.jpg)

[Back of the weather station](http://i.imgur.com/ysYeL1V.jpg)

Many people have done variants of this before, e.g.:

http://www.raspberryweather.com/

https://www.raspberrypi.org/blog/school-weather-station-project/

Main differences are:

1. I wanted professional weather report, not to take my own measurements
2. I wanted to format the information in a custom way -- just the stats, no Doppler radars, advertising, etc.

# Note
The below walks through the details but if using this repo _make sure_ to enter your API key from Dark Sky in dark-sky.php.

## Parts
* 1 19" LG LCD monitor
* 1 USB keyboard
* 1 USB mouse
* 1 [Swingarm wall mount for monitor](https://www.amazon.com/gp/product/B003O1UYHG) - ($22)
* 1 [Raspberry Pi 3 Model B](https://www.amazon.com/gp/product/B01CD5VC92) - ($40)
* 1 [Official RPI 3 Case](https://www.amazon.com/gp/product/B01F1PSFY6) - ($10)
* 1 [CanaKit 5V 2.5A RPI 3 Power supply](https://www.amazon.com/gp/product/B00MARDJZ4) - ($12)
* 1 [SanDisk 64GB microSD card, plus adapter](https://www.amazon.com/gp/product/B010Q588D4) - ($17)
* 1 [Bag of zipties](https://www.amazon.com/Plastic-Cable-Ties-100-Pack-Black/dp/B002C0SKBW) - ($7)
* 1 [Stud finder](https://www.amazon.com/Zircon-StudSensor-e50-Electronic-Finder/dp/B002R5AVVY) - ($20)

## Total cost: $128

Monitor normally is the biggest expense.

## Step 1: Download and install Raspbian onto microSD card

Countless guides on how to do this: e.g. https://www.raspberrypi.org/documentation/installation/installing-images/

## Step 2: Install Apache, PHP, Chromium

Tunnel into your Pi via SSH (https://www.raspberrypi.org/documentation/remote-access/ssh/) and run

```bash
sudo apt-get update && sudo-apt upgrade -y
```

Then install apache:

```bash
sudo apt-get install apache2 -y
```

Then PHP:

```bash
sudo apt-get install php5 libapache2-mod-php5 -y
```

Then the Chromium browser, so you can use the full-screen kiosk mode to display only the content:

Via http://raspberrypi.stackexchange.com/questions/41603/installing-chrome-on-raspbian:
```bash
sudo apt-get install chromium
```

## Step 3: Disable monitor dimming

Raspian will turn off the monitor after a certain period of inactivity. To disable this feature:

Via http://raspberrypi.stackexchange.com/questions/2059/disable-screen-blanking-in-x-windows-on-raspbian:

Edit the autostart file by typing in `sudo nano /etc/xdg/lxsession/LXDE-pi/autostart` and add these 3 lines:

```bash
@xset s off
@xset -dpms
@xset s noblank
```

## Step 4: Register with Dark Sky for developer API access

To get the actual weather data, you'll need access to an API. There are several but I recommend The Dark Sky Forecast API, if for no other reason it's free for < 1000 queries/day.

Go to [Dark Sky](https://developer.forecast.io/) and register.

## Step 5: Write PHP to grab the weather data

There are many examples of this, such as https://github.com/guhelski/forecast-php. See https://developer.forecast.io/docs/v2 for more details. Write the PHP code you need and save it to `/var/www/html/somefile.php`

Remember to get your coordinates for your location, which can be obtained easily through Google and many other utilities. The default example uses Times Square NY 40.758377, -73.985597.

## Step 6: Code a webpage to display the data

You could write the entire thing in the PHP file in Step 5, but it's better to keep the raw data separate from the presentation.

Easiest way to implement this is to write an AJAX request to pull in the data from the PHP file you just created, then display it. You can see my example here:

It's also a good idea to use free weather glyphs, preferably loaded as web fonts, to display the icons for the weather. 

## Step 7: Configure the Pi to auto-boot into "kiosk" mode for Chromium and load your webpage:

For me what worked was http://raspberrypi.stackexchange.com/questions/38515/auto-start-chromium-on-raspbian-jessie-11-2015:

Create a new .desktop file in ~/.config/autostart/, e.g.

```bash
sudo nano ~/.config/autostart/autoChromium.desktop
```

Then add the following:

```bash
[Desktop Entry]
Type=Application
Exec=/usr/bin/chromium-browser --noerrdialogs --disable-session-crashed-bubble --disable-infobars --kiosk http://www.website.com
Hidden=false
X-GNOME-Autostart-enabled=true
Name[en_US]=AutoChromium
Name=AutoChromium
Comment=Start Chromium when GNOME starts
```

Then reboot. 

## Step 8: Install the monitor wall mount

The kit comes with instructions, key thing is to ensure you use a stud finder first so you're mounting this in wood, not empty drywall, where it will just fall out.

Then use zipties to clean up the wires.

Viola! Done. Hope this helps someone else.