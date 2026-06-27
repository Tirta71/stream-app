import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authRoutes from "../modules/auth/auth.routes.js";
import contentRoutes from "../modules/contents/content.routes.js";
import episodeRoutes from "../modules/episodes/episode.routes.js";
import genreRoutes from "../modules/genres/genre.routes.js";
import myListRoutes from "../modules/my-lists/my-list.routes.js";
import orderRoutes from "../modules/orders/order.routes.js";
import packageRoutes from "../modules/packages/package.routes.js";
import paymentRoutes from "../modules/payments/payment.routes.js";
import subscriptionRoutes from "../modules/subscriptions/subscription.routes.js";
import uploadRoutes from "../modules/uploads/upload.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import watchProgressRoutes from "../modules/watch-progress/watch-progress.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({
    message: "API healthy",
    success: true,
  });
});

router.use("/auth", authRoutes);
router.use(authMiddleware);
router.use("/users", userRoutes);
router.use("/upload", uploadRoutes);
router.use("/movies", contentRoutes);
router.use("/genres", genreRoutes);
router.use("/episodes", episodeRoutes);
router.use("/my-lists", myListRoutes);
router.use("/watch-progress", watchProgressRoutes);
router.use("/packages", packageRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
router.use("/subscriptions", subscriptionRoutes);

export default router;
