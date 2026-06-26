import cors from "cors";
import express from "express";
import helmet from "helmet";
import env from "./config/env.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import routes from "./routes/index.js";
import ApiError from "./utils/ApiError.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: env.clientUrl,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.json({
    message: "CHILL App API is running",
    success: true,
  });
});

app.use("/api/v1", routes);

app.use((req, _res, next) => {
  next(
    new ApiError(
      404,
      `Route ${req.originalUrl} tidak ditemukan`,
      null,
      "ROUTE_NOT_FOUND",
    ),
  );
});

app.use(errorMiddleware);

export default app;
