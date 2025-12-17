const swaggerJSDoc = require('swagger-jsdoc');

const port = process.env.PORT || 4000;
const baseUrl = process.env.SWAGGER_BASE_URL || `http://localhost:${port}`;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notes API',
      version: '1.0.0',
      description: 'A minimal Notes API built with Express and Prisma'
    },
    servers: [
      {
        url: baseUrl,
        description: 'Local server'
      }
    ],
    components: {
      schemas: {
        Note: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Buy milk' },
            content: { type: 'string', example: '2 liters' },
            createdAt: { type: 'string', format: 'date-time' }
          },
          required: ['title']
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        },
        ValidationError: {
          type: 'object',
          properties: {
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  msg: { type: 'string' },
                  param: { type: 'string' },
                  location: { type: 'string' }
                }
              }
            }
          }
        }
      }
    }
  },
  // Files containing annotations for the OpenAPI spec
  apis: ['./src/routes/*.js', './src/controllers/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;