const express = require("express");

const app = express();



// Allows POST requests to have JSON body content
app.use(express.json());



app.get("/", (request, response, next) => {


    response.json({
        message: "Hello World!"
    });
});

const blogRouter = require("./controllers/BlogRouter");
app.use("/blogs", blogRouter);

const userRouter = require("./controllers/UserRouter");
app.use("/users", userRouter);

app.get("*", (request, response, next) => {
    response.status(404).json({
        message: "404 Page not found"
    });
});


app.use((error, request, response, next) => {
    response.status(error.status || 500).json({
        message: "Error occured!",
        error: error.message
    });
});

module.exports = {
    app
}

