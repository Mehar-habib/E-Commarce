import { Router } from "express";
import * as addressController from "../controller/addressController";
import { authenticatedUser } from "../middleware/authMiddleware";

const router = Router();
router.post(
  "/create-or-update",
  authenticatedUser,
  addressController.createOrUpdateAddressByUserId
);
router.get("/", authenticatedUser, addressController.getAddressByUserId);

export default router;
