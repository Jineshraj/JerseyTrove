import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Products.js";

dotenv.config();

const sampleProducts = [
  {
    name: "Barcelona 2015 Retro Home",
    team: "FC Barcelona",
    price: 1499,
    quality: "Embroidery",
    fitType: "Normal",
    collarType: "Round Neck",
    categories: ["Retro", "Club"],
    sizes: ["S", "M", "L", "XL"],
    imageUrl:
      "https://images.unsplash.com/photo-1519356162333-4d49b21f1c58?auto=format&fit=crop&w=800&q=80",
    lastVerifiedDate: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
    description: "Classic Barca stripes with 2015-era detailing.",
  },
  {
    name: "Liverpool 1996 Retro Home",
    team: "Liverpool",
    price: 1299,
    quality: "Embroidery",
    fitType: "Normal",
    collarType: "Collar",
    categories: ["Retro", "Club"],
    sizes: ["M", "L", "XL"],
    imageUrl:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80",
    lastVerifiedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    description: "Iconic red retro with classic collar finish.",
  },
  {
    name: "Argentina 2022 Winners",
    team: "Argentina",
    price: 2199,
    quality: "Sublimation",
    fitType: "Normal",
    collarType: "Round Neck",
    categories: ["National Team", "Current"],
    sizes: ["S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80",
    lastVerifiedDate: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    description: "World champions kit with crisp blue-white panels.",
  },
  {
    name: "Real Madrid 2023 Home",
    team: "Real Madrid",
    price: 1999,
    quality: "Embroidery",
    fitType: "Normal",
    collarType: "Round Neck",
    categories: ["Club", "Current"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    imageUrl:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80",
    lastVerifiedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    description: "Modern white kit with subtle gold accents.",
  },
  {
    name: "Brazil 2002 Retro",
    team: "Brazil",
    price: 1599,
    quality: "Sublimation",
    fitType: "Normal",
    collarType: "Round Neck",
    categories: ["Retro", "National Team"],
    sizes: ["S", "M", "L", "XL"],
    imageUrl:
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80",
    lastVerifiedDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    description: "Classic Brazil colors from the 2002 era.",
  },
  {
    name: "AC Milan 2004 Retro",
    team: "AC Milan",
    price: 1399,
    quality: "Embroidery",
    fitType: "Oversize",
    collarType: "Collar",
    categories: ["Retro", "Club"],
    sizes: ["M", "L", "XL"],
    imageUrl:
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80",
    lastVerifiedDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    description: "Red and black stripes with retro collar.",
  },
  {
    name: "Manchester United 1999 Retro",
    team: "Manchester United",
    price: 1499,
    quality: "Embroidery",
    fitType: "Normal",
    collarType: "Collar",
    categories: ["Retro", "Club"],
    sizes: ["S", "M", "L", "XL"],
    imageUrl:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=800&q=80",
    lastVerifiedDate: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    description: "Treble-era inspired red with classic detailing.",
  },
  {
    name: "Germany 2024 Away",
    team: "Germany",
    price: 1899,
    quality: "Sublimation",
    fitType: "Normal",
    collarType: "Round Neck",
    categories: ["National Team", "Current"],
    sizes: ["S", "M", "L"],
    imageUrl:
      "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=800&q=80",
    lastVerifiedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    description: "Clean away kit with bold color blocking.",
  },
];

const run = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`Seeded ${inserted.length} products.`);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

run();
