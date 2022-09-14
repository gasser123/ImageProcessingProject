import sharp from "sharp";
import express, { NextFunction } from "express";
import fs from "fs";

const errors: string[] = [];

export const resize = function (
  name: string,
  width: number,
  height: number
): Promise<sharp.OutputInfo> {
  const image = sharp(`./images/full/${name}.jpg`);
  const imageResize = image.resize(width, height);
  return imageResize.toFile(`./images/thumb/${name}-${width}x${height}.jpg`);
};

const imageResize = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
): void => {
  const fileName: string = req.query.filename as unknown as string;
  const width: number = parseInt(req.query.width as unknown as string);
  const height: number = parseInt(req.query.height as unknown as string);

  const validate = function (): boolean {
    const exists: boolean = fs.existsSync(`./images/full/${fileName}.jpg`);

    if (!exists) {
      errors.push("image not found");
    }

    if (isNaN(width) || width < 50) {
      errors.push("invalid width value");
    }

    if (isNaN(height) || height < 50) {
      errors.push("invalid height value");
    }

    if (errors.length > 0) {
      return false;
    }

    return true;
  };

  if (!validate()) {
    res.send(errors);
    while (errors.length > 0) {
      errors.pop();
    }
  } else {
    fs.exists(
      `./images/thumb/${fileName}-${width}x${height}.jpg`,
      (exists: boolean): void => {
        if (exists) {
          next();
        } else {
          resize(fileName, width, height).then((): void => {
            next();
          });
        }
      }
    );
  }
};

export default imageResize;
