# pi-home-dashboard

Web server to display info about time, weather, trafic and other news into a screen at home.  
Tested on Windows (dev) and Raspbian Jessy (using pm2 and behind nginx).  

## Install

sudo npm i -g gulp  
git clone https://github.com/nicoschmitt/pi-home-dashboard.git  
cd pi-home-dashboard  
npm i  
gulp prod

## Start with pm2 (using cluster)

sudo npm i -g pm2  
pm2 start start.json

## Update

git checkout client/index.html && git pull && gulp prod && pm2 reload dashboard

Example of refreshing Chromium through ssh: DISPLAY=":0" sudo -u kiosk xdotool getactivewindow key F5
