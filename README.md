## Test environment:
- simulate a backend rest service to deliver mock data in json format with `Json Server`

 `data.json` : contains the data which should be exposed by the rest api
- a server-side `proxy` is used to call the json server instead of the backend server

 `proxy.conf.js`: contains the proxy rules

### Precondition:

- install json server (if it is not already done) 
```
npm install -g json-server
```

#### Steps:

- run json server in terminal

```
json-server mock/data.json --port 3010
```

- set `API_URL`  in environment.ts to `http://localhost:4200/`

- run the angular dev server (with the proxy config) in terminal

```
ng serve -c local
```

## Build and deploy the app in local:

- compile the application to the dist folder

```
ng build
```
add --prod with the production settings
```
ng build --prod
```
- install a web server `lite-server` (globally, if preferred)

```
npm install --global lite-server
```
- run the web server in local

```
lite-server --baseDir="dist/enreg"
```
