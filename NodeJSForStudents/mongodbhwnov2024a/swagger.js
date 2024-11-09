import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mongo DB Hello World',
      version: '1.0.0',
      description: "A simple web API that works with mongo db",
      contact: {
        name: "Jay (Vijayasimha BR)",
        url: "https://github.com/Jay-study-nildana",
      },
    },
    externalDocs: {
        description: "Personal Site",
        url: "https://stories.thechalakas.com/"
      }
  },
  apis: ['./index.js'], // Specify your route file here
};

const swaggerSpec = swaggerJsdoc(options);

export default function(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

//apis: ['./routes/*.js'], // Adjust the path according to your route files
