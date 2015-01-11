# request-promise-json
Simple JSON API with 'q' promises on top of amazing 'request' module.

## Usage:
```js
var http = require('./HTTPClient');
http(method, url, [json]);

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
If response status code is >= 400, promise will be rejected with node's http.IncomingMessage
See http://nodejs.org/api/http.html#http_http_incomingmessage
```js
// Example of error handling:
http.get(url).fail(function(reason){
    if(reason.statusCode)
        console.log('failed with status code', reason.statusCode);
    else
        console.log('failed with error, reason);
});
```
