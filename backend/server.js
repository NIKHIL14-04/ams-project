import dotenv from "dotenv";

dotenv.config();

import app from "./SRC/app.js";

import connectDB from "./SRC/config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
