import supertest from "supertest";
import app from "../index";
import sizeOf from "image-size";
import { resize } from "../routes/api/imageProcessing";

const request = supertest(app);
describe("Test endpoint responses", (): void => {
  it("tests app endpoint", async (): Promise<void> => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });

  it("tests api endpoint", async (): Promise<void> => {
    const response = await request.get("/api");
    expect(response.status).toBe(200);
  });

  it("tests image display endpoint", async (): Promise<void> => {
    const response = await request.get("/api/images");
    expect(response.status).toBe(200);
  });
});

describe("Test resizing an image", (): void => {
  it("tests if the resize function works", (): void => {
    expect(async (): Promise<void> => {
      const name = "santamonica";
      const width = 300;
      const height = 200;
      await resize(name, width, height);
    }).not.toThrow();
  });

  it("tests if image is resized", async (): Promise<void> => {
    const name = "santamonica";
    const width = 300;
    const height = 200;
    let flag = false;
    await resize(name, width, height);
    const dimensions = sizeOf(`./images/thumb/${name}-${width}x${height}.jpg`);
    if (dimensions.width == width && dimensions.height == height) {
      flag = true;
    }

    expect(flag).toBe(true);
  });
});
