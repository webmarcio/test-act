import { Request, Response } from "express";
import Server from "./config/Server";

const app = Server.app;
const PORT = process.env.PORT || 3000;

export default app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/test-api', (req: Request, res: Response) => {
  res.status(200).json({ status: `Server is running on port ${PORT}` });
});
