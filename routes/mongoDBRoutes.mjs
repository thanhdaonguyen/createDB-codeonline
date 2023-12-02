import * as mongoController from "../controllers/mongoControllers.mjs"
import express from "express"

const router = express.Router()

router.route("/").post(mongoController.createMongoDBDatabase);

export default router