import express from "express";
import Product from "../models/Products.js";

const router = express.Router();

// POST route for adding new Jerseys
router.post("/", async (req, res) => {
  try {
    const productData = req.body; //1. get the JSON data from the request (optional)
    const newJersey = new Product(productData); //2. create new Jersey data with the DB blueprint
    const savedJersey = await newJersey.save(); //3. save to MongoDB

    // 3. Send a success message back
    res.status(201).json({
      message: "Jersey added successfully !",
      product: savedJersey,
    });
  } catch (error) {
    console.log(`DATABASE ERROR : ${error.message}`);
    res.status(500).json({
      error: "Failed to add jersey",
      details: error.message,
    });
  }
});

// GET route to fetch all jerseys
router.get("/", async (req, res) => {
  try {
    const allJerseys = await Product.find({}); // // The empty object {} tells Mongoose to find ALL documents in the collection

    //Send a success message and data back
    res.status(201).json({
      success: true,
      data: allJerseys,
    });
  } catch (error) {
    console.log(`DATABASE ERROR : ${error.message}`);
    res.status(500).json({
      error: "Failed to fetch jersey",
      details: error.message,
    });
  }
});

// UPDATE route to edit a specific jersey
router.put("/:id", async (req, res) => {
  const { id } = req.params; // This grabs the unique ID from the end of the URL
  const jerseyUpdate = req.body; // This grabs the new JSON data we want to apply

  try {
    // findByIdAndUpdate needs 3 things: the ID, the new data, and an options object
    // { returnDocument: 'after' } forces MongoDB to hand us back the fresh, updated jersey instead of the old one

    const updatedJersey = await Product.findByIdAndUpdate(id, jerseyUpdate, {
      returnDocument: "after",
    });

    //GUARD CLAUSE If someone types in a random ID that doesn't exist in our database
    if (!updatedJersey) {
      return res
        .status(404)
        .json({ success: false, message: "Jersey not found" });
    }

    res.status(200).json({
      success: true,
      message: "Jersey updated successfully",
      data: updatedJersey,
    });
  } catch (error) {
    console.log(`DATABASE ERROR : ${error.message}`);
    res.status(500).json({
      error: "Failed to update jersey",
      details: error.message,
    });
  }
});

//DELETE route to delete any specific jersey
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteJersey = await Product.findByIdAndDelete(id);

    //GUARD CLAUSE : check if provided id matches
    if (!deleteJersey) {
      return res
        .status(404)
        .json({ success: false, message: "Jersey not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Jersey deleted successfully!",
    });
  } catch (error) {
    console.log(`DATABASE ERROR: ${error.message}`);
    return res.status(500).json({ success: false, message: "Sever error" });
  }
});

export default router;
