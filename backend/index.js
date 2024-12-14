import app from "./app.js";
import "dotenv/config";
import connectDB from "./config/connectDB.js";

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`App is running at port ${port}`);
  await connectDB();
});
