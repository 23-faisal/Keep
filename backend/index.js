import app from "./app.js";
import "dotenv/config";
import connectDB from "./config/connectDB.js";

const port = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB(); // Connect to the database
    app.listen(port, () => {
      console.log(`App is running at port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1); // Exit the process if the database connection fails
  }
})();
