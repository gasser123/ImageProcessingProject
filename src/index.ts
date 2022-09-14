import express from "express";
import route from "./routes/index";
const app = express();
const port = 3000;

//define a route handler for the default homepage
app.get("/", (req: express.Request, res: express.Response): void => {
  res.send("main page");
});

// middleware for route

app.use("/api", route);

//start the express server
app.listen(port, (): void => {
  console.log(`server started at http://localhost:${port}`);
});

export default app;
