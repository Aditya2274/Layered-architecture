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

_Database Indexing_:
Think of an index in MongoDB exactly like the Index/Glossary at the back of a massive textbook.

If you want to find "Photosynthesis" in a 1,000-page book, you don't read every page from the start (that's a Collection Scan). You go to the Index, find "P," see the page number, and jump straight there (that's an Index Scan).

1. The Single Field Index
toolSchema.index({ name: 1 })

What it does: It creates a sorted list of all tool names.

The 1: This means Ascending order (A to Z). If you used -1, it would store them in Descending order (Z to A).

Why use it? If you have 1,000,000 tools and you run Tool.find({ name: 'VS Code' }), MongoDB doesn't have to look at all 1,000,000 documents. It looks at the sorted index and finds it instantly.

2. The Compound Index
toolSchema.index({ category: 1, isPopular: -1 })

This is a Compound Index because it involves multiple fields. This is like a phone book that is sorted first by Last Name and then by First Name.

category: 1: Sorts all documents by category (API_TOOL, DATABASE, etc.) in alphabetical order.

isPopular: -1: Within each category, it sorts the tools by popularity (True/1 comes before False/0 because it's descending).

Why use it? This perfectly matches your static method findByCategory. It makes queries that filter by category and sort by popularity incredibly fast.

Why should you care?
FeatureWithout IndexesWith IndexesSearch SpeedSlow (checks every document)Lightning fast (jumps to the result)Resource UsageHigh CPU & MemoryLow CPUWrite SpeedSlightly fasterSlightly slower (DB has to update the index too)

Mongoose Query Builder
"What does this let query = this.model.find(filter); mean?"

This line does not fetch data from the database immediately. Instead, it creates a Query Object.

Think of this.model as a specific database collection (like Users or Products). When you call .find(filter), Mongoose starts drafting a database request. By saving it to the variable let query, you are holding onto that draft.

This allows you to conditionally "chain" more instructions onto the draft before sending it off:

JavaScript
let query = this.model.find({ status: 'active' }); // Draft started

if (limit) query = query.limit(10); // Draft updated: only get 10
if (sort) query = query.sort({ age: -1 }); // Draft updated: sort by age
It’s only when you hit return await query.exec(); at the very end that the query is actually sent to MongoDB to get the results.

1. The JSDoc Comments
JavaScript
/**
 * This method returns Tool by Tool Name
 * @param {*} name - Tool name
 * @returns 
 */
This special type of comment block (starting with / instead of /*) is called JSDoc. It is the standard way to document JavaScript code.

Because JavaScript doesn't have strict types like Java, developers use JSDoc to explain what a function expects and what it returns. The biggest benefit is IntelliSense:

@param {*} name: This tells the code editor, "This function takes a parameter called 'name'." The {*} means it can be of any data type (though we know it should be a string). If it were TypeScript, you wouldn't need this as much.

@returns: This explains what the function gives back. (It looks like the developer forgot to finish writing the description here!).

If you hover your mouse over the findByName function elsewhere in your code editor, VS Code will pop up a little window showing this exact description, helping other developers know how to use your method without having to open this file.