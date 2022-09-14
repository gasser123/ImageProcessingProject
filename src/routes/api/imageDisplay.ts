import express from "express";
import imageResize from "./imageProcessing";
import fs from "fs";

const imageRoute = express.Router();
imageRoute.get(
  "/",
  imageResize,
  (req: express.Request, res: express.Response): void => {
    const fileName: string = req.query.filename as unknown as string;
    const width: number = parseInt(req.query.width as unknown as string);
    const height: number = parseInt(req.query.height as unknown as string);
    const sendFile = (): void => {
      res.sendFile(`${fileName}-${width}x${height}.jpg`, {
        root: "./images/thumb",
      });
    };

    const checkThumb: boolean = fs.existsSync(
      `./images/thumb/${fileName}-${width}x${height}.jpg`
    );
    if (checkThumb) {
      sendFile();
    } else {
      res.send("can't send image");
    }
  }
);

export default imageRoute;
