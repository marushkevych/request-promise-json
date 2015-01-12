# request-promise-json
Thin wrapper around [request](https://www.npmjs.com/package/request) module to provide simple JSON API wiht [q promises](http://documentup.com/kriskowal/q/).
All methods return promise resolving to json object.

## Install
```
npm install request-promise-json --save
```

## Usage:
```js
var http = require('request-promise-json');

http(method, url, [json]).then(function(resultJson){
    console.log(resultJson.id);
});

// or use shortcuts:
http.get(url);
http.post(url, json);
http.put(url, json);

// or provide options object directy to 'request' library 
// (see docs for 'request' module https://www.npmjs.com/package/request):
http.request({
    method: 'POST',
    url: url,
    body: json
});
```
 
## Error Handling:
If request fails with an error, promise will be rejected with that error.

If response status code is >= 400, reject Error will have following properties:
* statusCode
* request - request options (method, url, body)
* response - response body

```js
// Example of error handling:
http.get(url).fail(function(reason){
    if(reason.statusCode)
        console.log('failed with status code', reason.statusCode);
    else
        console.log('failed with error', reason);
});
```
