# 🏆 JerseyTrove

A full-stack MERN e-commerce web application built for a custom football jersey reselling business. This platform transitions the business from manual WhatsApp operations to an automated, scalable online storefront.

## 🚀 Tech Stack

- **Frontend:** React.js, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas, Mongoose ODM

## 📖 Product Overview & Business Logic

JerseyTrove is designed with a highly specific, time-based inventory management system to handle the unique fast-paced nature of the jersey reselling market.

### The 3-Tier Inventory Lifecycle

Every jersey uploaded to the database automatically enters a strict 60-day lifecycle based on its `lastVerifiedDate`:

- **Phase 1: Active Stock (Days 0 - 30)**
  - The item is fully available.
  - Users see **"Add to Cart"** and **"Pay Now"** buttons.
  - Full seamless checkout is enabled.
- **Phase 2: Unverified Stock (Days 31 - 60)**
  - If the admin has not verified the stock after 30 days, the platform assumes the item might be sold out through other channels.
  - The "Pay Now" button is removed.
  - The primary call-to-action changes to an **"Enquire"** button, directing the customer to message the business to manually confirm availability.
- **Phase 3: Archived (Day 61+)**
  - If an item reaches 60 days without an admin stock check, the system automatically removes/hides the listing from the public storefront to prevent dead inventory buildup.

### 🛒 Checkout & Authentication Architecture

To maximize conversion rates, the platform supports two types of buyers:

1. **Registered Users:** Customers can create an account (tracked via MongoDB `ObjectId`) to save their details and view order history.
2. **Guest Checkout:** Frictionless purchasing system where users are not forced to register. The database securely handles orders using just an email and shipping address (bypassing the User ID requirement).

##
