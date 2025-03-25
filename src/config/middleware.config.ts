import bodyParser from "body-parser";
import express, { Express, Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import bullAdminUI from "../config/bullmq-ui.config";
import helmet from "helmet";
import morgan from "morgan";
import hpp from "hpp";
import compression from "compression";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";
import { ERROR_MESSAGE } from "../common/constants/message.constant";
import * as swaggerDocument from "../../swagger.json";
import swaggerUi from "swagger-ui-express";

// CORS configuration
const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];
const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error(ERROR_MESSAGE.INVALID_ORIGIN));
        }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
};

// Rate limiting (prevent brute-force attacks)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
    message: ERROR_MESSAGE.TOO_MANY_REQUESTS,
});

// JWT Authentication Middleware
const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Bearer Token

    if (!token) {
        return res.status(401).json({ error: ERROR_MESSAGE.UNAUTHORIZED });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
    (req as any).user = decoded; // Attach user data to request
    next();
};

export default function useMiddleware(app: Express) {
    // Swagger UI
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Security Headers
    app.use(helmet());

    // Enable logging
    app.use(morgan(process.env.LOG_LEVEL || "dev"));

    // Prevent HTTP Parameter Pollution
    app.use(hpp());

    // Enable Compression
    app.use(compression());

    // Apply rate limiting
    app.use(limiter);

    // Enable CORS
    app.use(cors(corsOptions));

    // Enable JSON & URL Encoded Middleware
    app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // BullMQ Admin UI
    app.use("/admin/queues", bullAdminUI);

    // Apply authentication middleware globally if required
    // app.use(authenticateJWT); // Uncomment to protect all routes by default
}
