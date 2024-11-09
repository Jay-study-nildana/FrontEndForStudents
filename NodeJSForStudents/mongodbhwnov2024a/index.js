// require('dotenv').config();

// const express = require("express");
// const { MongoClient, ObjectId } = require("mongodb");
// const { body, param, validationResult } = require("express-validator");
// const app = express();

import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import { body, param, validationResult } from 'express-validator';
import { config } from 'dotenv';
import swaggerSetup from './swagger.js';
import open from 'open';

// Load environment variables
config();

const app = express();

// Initialize Swagger
swaggerSetup(app);

app.use(express.json());

//const url =
  "mongodb+srv://dbuserreadwrite1:N351mcH301xaTZjE@clusterhw.r2wa4.mongodb.net/?retryWrites=true&w=majority&appName=ClusterHW";
const url = process.env.MONGODB_URI;
const dbName = "sample_mflix";


// Error-handling middleware
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}

//MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//I get some weird warning in the terminal if I use the above options
MongoClient.connect(url)
  .then((client) => {
    console.log("Connected to MongoDB. Nodemon Working");
    const db = client.db(dbName);
    const moviesCollection = db.collection("movies");

/**
 * @openapi
 * /api/movies:
 *   get:
 *     summary: Retrieve a list of movies
 *     responses:
 *       200:
 *         description: A list of movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 507f191e810c19729de860ea
 *                   title:
 *                     type: string
 *                     example: The Matrix
 *                   year:
 *                     type: integer
 *                     example: 1999
 *                   # Add other movie properties as needed
 *       500:
 *         description: Server error
 */


    app.get("/api/movies", async (req, res, next) => {
      try {
        const movies = await moviesCollection.find({}).limit(20).toArray();
        res.status(200).json(movies);
      } catch (error) {
        next(error);
      }
    });

/**
 * @openapi
 * /api/movies/{id}:
 *   get:
 *     summary: Retrieve a movie by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the movie to retrieve, must be a MongoDB ObjectId
 *     responses:
 *       200:
 *         description: A movie object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 507f191e810c19729de860ea
 *                 title:
 *                   type: string
 *                   example: The Matrix
 *                 year:
 *                   type: integer
 *                   example: 1999
 *                 # Add other movie properties as needed
 *       400:
 *         description: Invalid ID supplied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       value:
 *                         type: string
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *                       location:
 *                         type: string
 *       404:
 *         description: Movie not found
 */

    // Get a single movie by ID
    app.get(
      "/api/movies/:id",
      param("id").isMongoId().withMessage("Invalid movie ID"),
      async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        try {
          const movie = await moviesCollection.findOne({
            _id: new ObjectId(req.params.id),
          });
          movie
            ? res.status(200).json(movie)
            : res.status(404).send("Movie not found");
        } catch (error) {
          next(error);
        }
      }
    );

    /**
     * @openapi
     * /movies:
     *   post:
     *     summary: Add a new movie
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: Inception
     *               year:
     *                 type: integer
     *                 example: 2010
     *             required:
     *               - title
     *               - year
     *     responses:
     *       201:
     *         description: Movie created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 _id:
     *                   type: string
     *                   example: 507f191e810c19729de860ea
     *                 acknowledged:
     *                   type: boolean
     *                   example: true
     *       400:
     *         description: Validation error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 errors:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       value:
     *                         type: string
     *                         example: ""
     *                       msg:
     *                         type: string
     *                         example: "Title is required"
     *                       param:
     *                         type: string
     *                         example: "title"
     *                       location:
     *                         type: string
     *                         example: "body"
     *       500:
     *         description: Server error
     */    

    // Create a new movie
    app.post(
      "/movies",
      body("title").isString().notEmpty().withMessage("Title is required"),
      body("year")
        .isInt({ gt: 1800 })
        .withMessage("Year must be a valid number greater than 1800"),
      async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        console.log(`inside app.post( "/movies",`);
        console.log(req.body);

        try {
          const newMovie = req.body;
          const result = await moviesCollection.insertOne(newMovie);
          console.log(`inside app.post( "/movies", try after insert`);
          console.log(result);
          //res.status(201).json(result.ops[0]);  //this gives error. 
          res.status(201).json({
            "_id" : result.insertedId,
            "acknowledged": result.acknowledged,
          });  //this gives error. 
        } catch (error) {
          next(error);
        }
      }
    );

    /**
     * @openapi
     * /movies/{id}:
     *   put:
     *     summary: Update a movie by its ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the movie to update, must be a valid MongoDB ObjectId
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               title:
     *                 type: string
     *                 example: Interstellar
     *               year:
     *                 type: integer
     *                 example: 2014
     *     responses:
     *       200:
     *         description: Movie updated successfully
     *       400:
     *         description: Validation error or invalid ID provided
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 errors:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       value:
     *                         type: string
     *                         example: ""
     *                       msg:
     *                         type: string
     *                         example: "Year must be a valid number greater than 1800"
     *                       param:
     *                         type: string
     *                         example: "year"
     *                       location:
     *                         type: string
     *                         example: "body"
     *       404:
     *         description: Movie not found
     *       500:
     *         description: Server error
     */    
    // Update a movie by ID
    app.put(
      "/movies/:id",
      param("id").isMongoId().withMessage("Invalid movie ID"),
      body("title")
        .optional()
        .isString()
        .notEmpty()
        .withMessage("Title should be a string"),
      body("year")
        .optional()
        .isInt({ gt: 1800 })
        .withMessage("Year must be a valid number greater than 1800"),
      async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        try {
          const updates = req.body;
          const result = await moviesCollection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updates }
          );
          result.matchedCount > 0
            ? res.status(200).send("Movie updated")
            : res.status(404).send("Movie not found");
        } catch (error) {
          next(error);
        }
      }
    );

    /**
     * @openapi
     * /movies/{id}:
     *   delete:
     *     summary: Delete a movie by its ID
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: The ID of the movie to delete, must be a valid MongoDB ObjectId
     *     responses:
     *       200:
     *         description: Movie deleted successfully
     *       400:
     *         description: Invalid ID provided
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 errors:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       value:
     *                         type: string
     *                         example: "507f191e810c19729de860ea"
     *                       msg:
     *                         type: string
     *                         example: "Invalid movie ID"
     *                       param:
     *                         type: string
     *                         example: "id"
     *                       location:
     *                         type: string
     *                         example: "params"
     *       404:
     *         description: Movie not found
     *       500:
     *         description: Server error
     */


    // Delete a movie by ID
    app.delete(
      "/movies/:id",
      param("id").isMongoId().withMessage("Invalid movie ID"),
      async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        try {
          const result = await moviesCollection.deleteOne({
            _id: new ObjectId(req.params.id),
          });
          result.deletedCount > 0
            ? res.status(200).send("Movie deleted")
            : res.status(404).send("Movie not found");
        } catch (error) {
          next(error);
        }
      }
    );

    app.use(errorHandler);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      const swaggerURL = `http://localhost:${PORT}/api-docs`;
      console.log(`Swagger docs available at ${swaggerURL}`);

      // Automatically open the Swagger docs URL in the default browser
      //open(swaggerURL);

      if(process.env.LAUNCH_BROWSER_AUTOMATICALLY == true)
      {
        open(swaggerURL, { app: { name: 'chrome' } });
      }

    });
  })
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Ensure the errorHandler is set up to catch any errors not handled within routes
app.use(errorHandler);
