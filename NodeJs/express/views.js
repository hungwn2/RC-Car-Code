function myMiddleware(req, res, next) {
    // Perform some operations
    console.log("Middleware function called");
  
    // Modify the request object
    req.customProperty = "Hello from myMiddleware";
  
    // Call the next middleware/route handler
    next();
  }
  
  app.use(myMiddleware);
  