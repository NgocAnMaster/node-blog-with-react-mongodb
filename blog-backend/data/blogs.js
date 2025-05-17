const blogs = [
  {
    id: 1,
    slug: 'intro-to-node',
    title: 'Introduction to Node.js',
    summary: 'Learn the basics of Node.js and why it’s so popular for backend development.',
    content: `Node.js is a runtime environment that allows you to run JavaScript on the server side. 
It uses Google Chrome’s V8 engine under the hood, which makes it fast and efficient. 
With Node.js, you can build scalable network applications, and it’s especially well-suited for building RESTful APIs. 
Its non-blocking I/O model and single-threaded event loop are what make Node.js powerful.`
  },
  {
    id: 2,
    slug: 'express-routing',
    title: 'Understanding Express Routing',
    summary: 'A guide to how routing works in Express.js, one of the most popular Node frameworks.',
    content: `Routing in Express is how your application responds to client requests to specific endpoints. 
You define routes with different HTTP methods like GET, POST, PUT, and DELETE. 
A route in Express consists of a path and a callback function. 
For example, \`app.get('/users', (req, res) => {...})\` handles GET requests to the /users path.`
  },
  {
    id: 3,
    slug: 'why-react',
    title: 'Why Choose React for Your Frontend?',
    summary: 'Explore what makes React a favorite library among frontend developers.',
    content: `React is a component-based JavaScript library developed by Facebook. 
It allows developers to build interactive and dynamic UIs efficiently. 
The concept of components makes it easy to reuse code, manage state, and keep your UI predictable. 
React’s virtual DOM and one-way data binding contribute to great performance. 
Additionally, the React ecosystem, including tools like React Router and Redux, provides everything needed for complex apps.`
  },
  {
    id: 4,
    slug: 'css-flex-vs-grid',
    title: 'CSS Flexbox vs Grid: When to Use What?',
    summary: 'Flexbox and Grid are two powerful layout systems in CSS — here’s how to choose between them.',
    content: `Flexbox and Grid are modern CSS modules for layout design. 
Flexbox is one-dimensional (either row or column), making it ideal for small components or navigation bars. 
Grid, on the other hand, is two-dimensional and is great for full-page layouts. 
Use Flexbox when you're aligning items in a single row or column. 
Use Grid when you need a complex layout with rows and columns. They can even be combined for powerful effects.`
  },
  {
    id: 5,
    slug: 'async-await-js',
    title: 'Mastering Async/Await in JavaScript',
    summary: 'Async/await makes asynchronous code in JavaScript much more readable. Here’s how to use it right.',
    content: `Async/await is syntax sugar built on top of Promises in JavaScript. 
It allows you to write asynchronous code that looks synchronous, making it easier to understand and maintain. 
An \`async\` function always returns a promise, and inside it, you can use \`await\` to pause the execution until the promise resolves. 
This greatly simplifies error handling using \`try/catch\`, and avoids deeply nested callbacks or then-chains.`
  }
];

module.exports = blogs;