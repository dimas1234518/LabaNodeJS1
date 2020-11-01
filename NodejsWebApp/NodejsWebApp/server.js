'use strict';

const port = process.env.PORT || 7000;
const serverLogsPath = "server.log";
const dbLogsPath = "db.log";
const dbUri = "localhost:1521/xe";
const dbName = "Dimasik";

const express = require("express");
const OracleClient = require("oracledb");
const logger = require("./Modules/logger");
const app = express();
const oracleClient = OracleClient.getConnection(
    {
        user: "Dimasik",
        password: "Dimasik",
        connectString: dbUri
    },
    connExecute
);

app.use(function (request, response, next) {
    var data = `${request.method} ${request.url} ${request.get("user-agent")}`;

    logger.writeLog(data, serverLogsPath);

    next();
});

app.get("/", function (request, response) {
    response.end("Hello from Vacancy!");
});

app.get("/Vacancy", function (request, response) {
    oracleClient.connect(function (error, client) {

        if (error) {
            logger.writeLog(error, dbLogsPath);

            response.sendStatus(418);
        }
        else {
            const db = client.db(dbName);
            const collection = db.collection("Vacancy");

            collection.find().toArray(function (error, results) {

                if (error) {
                    logger.writeLog(error, dbLogsPath);
                }

                response.send(results);
                response.sendStatus(200);

                client.close();
            });
        }
    });
});

app.listen(port);
