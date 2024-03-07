# Alerts Dashboard App

A table dashboard showing new alerts retrived from server endpoing.
All alerts data is saved after each change. data is saved and retrived from localstorage.

## Delivered Requirements:

* The application will pull an alert from the server every 15 sec.
* The dashboard shows the alerts with a color code based on severity.
* The dashboard will allow the user to sort the alerts by date/severity/source.
* The alerts dashboard is fully responsive from 720p to 4k resolutions.
* The application uses local storage to save users history of alerts and display a user his past alerts
* A user can dismiss the alert this will place it at the bottom of the alerts list and Mark it. changed

## Dependencies
  * Angular CLI: 16.2.12
  * Node: 18.18.2
  
## Getting Started

### Installing

1. Clone the repo
```
git clone https://github.com/ranlotan/alerts-dashboard.git
```
2. Install NPM
* Fronend:
```
cd alerts-dashboard/client
npm install
```
* Backend:
```
cd alerts-dashboard/server
npm install
```
3. Run
* Fronend:
```
cd blog-app/client
ng serve
```
* Backend:
```
cd blog-app/api
npm start
```

## picture from dashboard
![dashboard](https://github.com/ranLotan/alerts-dashboard/assets/152190030/e8d4152a-40af-455d-8de9-c35d7927e849)





