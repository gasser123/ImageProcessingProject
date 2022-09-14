import express from "express";
import imageRoute from "./api/imageDisplay";
const route = express.Router();
route.get("/", (req: express.Request, res: express.Response): void => {
  res.send("please provide image name,width and height");
});
route.use("/images", imageRoute);

export default route;
