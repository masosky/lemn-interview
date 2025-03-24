import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json";
import path from "path";
import { RegisterRoutes } from "./routes/routes";

const app = express();
const PORT = 8080;

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Set default content type for all responses
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// Error handling for JSON parsing
app.use(((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ 
      status: 400,
      message: 'Invalid JSON payload',
      details: error.message
    });
  }
  next(error);
}) as express.ErrorRequestHandler);

// Add route logging middleware before registering routes
app.use((req, res, next) => {
  console.debug(`Request received: ${req.method} ${req.path}`);
  next();
});

// Register TSOA routes (with role-based access control)
RegisterRoutes(app);

// Add a catch-all route for debugging
app.use((req, res, next) => {
  console.warn(`No route matched: ${req.method} ${req.path}`);
  next();
});

// Swagger Documentation
app.get("/api-docs/json", (req, res) => {
  res.sendFile(path.join(__dirname, "swagger", "swagger.json"), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
});

// Swagger documentation route with content type override
app.use("/api-docs", (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.removeHeader('Content-Type');
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/prisma-schema", (req, res) => {
  const schemaPath = path.join(__dirname, "../prisma/schema.prisma");
  res.setHeader('Content-Type', 'text/plain');
  res.sendFile(schemaPath);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
