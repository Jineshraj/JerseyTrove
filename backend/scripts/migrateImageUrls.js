import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    const collection = mongoose.connection.db.collection("products");

    const result = await collection.updateMany(
      {
        $and: [
          { imageUrl: { $type: "string" } },
          {
            $or: [
              { images: { $exists: false } },
              { images: { $size: 0 } },
            ],
          },
        ],
      },
      [
        {
          $set: {
            images: ["$imageUrl"],
          },
        },
        {
          $unset: "imageUrl",
        },
      ],
    );

    console.log(
      `Migrated ${result.modifiedCount} products (added images[0] from imageUrl).`,
    );
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
