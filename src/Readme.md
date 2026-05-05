app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({extended: true , limit: '10mb'}));

Think of them as "translators" for your server. When a client sends data to your API, it arrives as a raw stream of text. These middlewares translate that text into a JavaScript object you can actually use (the req.body).
1. express.json()This is for modern web applications.
What it does: It looks for requests where the Content-Type is application/json.Usage: If a frontend (like a React app) sends data like {"name": "John"}, this middleware parses it so you can access req.body.name in your code.The limit: '10mb': By default, Express only allows tiny JSON payloads (around 100kb). By setting it to 10mb, you're allowing users to send much larger chunks of data (like a very long text post or a small base64 image).
2. express.urlencoded()This is not for static files; it's for HTML Form submissions.What it does: It looks for requests where the Content-Type is application/x-www-form-urlencoded. This is the format used by default when you use a standard HTML <form> tag.The extended: true: This allows you to parse nested objects (like user[name]=John). If it were false, it would use a simpler library that can't handle deep nesting.Usage: It turns a string like name=John&age=30 into { name: 'John', age: '30' }.Comparison at a glanceMiddlewareBest For...Common Sourceexpress.json()APIs and SPAs (React, Vue, etc.)fetch() or axios.post()express.urlencoded()Traditional websites<form action="/submit" method="POST">express.static()Images, CSS, JS filesA folder named /public

->10 MB limit in your configuration refers to the maximum allowed size of the request body that the server will process.

1. What it controlsRequest Body Size: It restricts the total amount of data a client can send in a single POST, PUT, or PATCH request.  Default Protection: By default, Express sets this limit to a much smaller 100 KB. By changing it to 10mb, you are allowing payloads that are 100 times larger than the default. 
2. Why it is usedSecurity (DoS Prevention): Setting a limit prevents "denial-of-service" (DoS) attacks where an attacker sends massive amounts of data to overwhelm your server's memory and CPU.  Resource Management: Parsing large JSON objects or long URL-encoded strings is memory-intensive. Large limits (anything above 5 MB) can lead to longer response times and higher memory usage.  Payload Support: You typically increase this limit if you expect users to send large amounts of data, such as long text descriptions or small files encoded as base64 strings.  
3. What happens if the limit is exceeded?If a client tries to send a request larger than the specified 10 MB:The server will automatically reject the request.The client will receive an HTTP 413 "Payload Too Large" error response.  


Q) Loggers vs console ??
Q) Why didn't we create object of Databaseconfig, (we used static ,like only easy access is purpose or something else)??


->In repository ,purpose of creating base repository is ,so that we can reuusable things related to repositories in the base repositories.