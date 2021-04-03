require("dotenv").config();
const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();

// MIDDLEWARE

const morgan = require("morgan");
const logger = morgan("dev");

const parser = require("express").Router();
parser.use(express.json());
parser.use(express.urlencoded({ extended: false }));

const staticServe = express.static(path.join(__dirname, "public"));

// Should be the last middleware before the error handler for a 404
function error404(req, res, next) {
    next({
        status: 404,
        message: `Could not ${req.method}/ on ${req._parsedUrl.pathname}`,
    });
}

// Error handling routine (send json response for our application)
function errorHandler(err, req, res, next) {
    console.log(err);

    const apiError = req.url.startsWith("/api");

    if (apiError) {
        if (err) err.error = err.error || true;
        res.status(err.status || 500).json(
            err || {
                error: true,
                message: "Server error",
            }
        );
    } else {
        res.status(err.status || 500)
            .render('docs-old/error',{error: err});
            // .redirect("/");
    }
}

function useRoutes(app, baseEndpoint, pathTo) {
    fs.readdirSync(pathTo).forEach(file => {
        app.use(baseEndpoint, require(path.join(pathTo, file)));
    });
}

// DATABASE

const { sequelize } = require("./models");

function setup(db) {
    if (process.env.DATABASE_LOAD === 'force') {
        return db.sync({ force: true });    
    } 
    
    if (process.env.DATABASE_LOAD === 'alter') {
        return db.sync({ alter: true });
    }
    
    return db.sync();
}

// VIEW ENGINE

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/////////

app.use(staticServe);
app.use(logger);
app.use(parser);

useRoutes(app, "/api", path.join(__dirname, "routes/api"));
useRoutes(app, "/", path.join(__dirname, "routes/docs"));
useRoutes(app, "/mobile", path.join(__dirname, "routes/docs"));

app.use(error404);
app.use(errorHandler);

const port = Number(process.env.PORT) || 3001;
setup(sequelize)
    .then(() => {
        app.listen(port, () => {
            console.log(`Started application on port ${port}`);
        });
    })
    .catch((err) => {
        console.log(`Did not start due to database error: ${err}`);
    });
