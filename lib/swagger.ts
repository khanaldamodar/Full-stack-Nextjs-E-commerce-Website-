import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Set Nepal Ecommerce API",
      version: "1.0.0",
      description: "API documentation for Set Nepal ecommerce website",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./app/api/**/*.ts"], // Path to your API route files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
