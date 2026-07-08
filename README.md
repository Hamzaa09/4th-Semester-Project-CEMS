# CEMS - Cricket Equipment Management System

An inventory and order management system for warehouses, built as a 4th semester Advanced DBMS project - using a cricket equipment warehouse as the working example, though the system generalizes to any inventory-based business.

<p align="right">

[View Source Code](https://github.com/Hamzaa09/4th-Semester-Project-CEMS) &nbsp;|&nbsp; [Live Demo](https://cems-rose.vercel.app/)
</p>

## Demo

https://github.com/user-attachments/assets/137a59dc-0d6b-4fdf-8e82-29a5518ce31b

## Overview

CEMS supports three distinct roles, each with its own portal:

- **Admin:** views revenue, product, supplier, and booker statistics, and oversees all orders across the warehouse
- **Booker:** browses any store/warehouse and places orders through a dedicated booker portal
- **Supplier:** views orders assigned to them and tracks which ones have been delivered

## Key Features

- **Role-based access control:** separate JWT-authenticated portals for Admin, Booker, and Supplier, with tokens stored in secure cookies
- **Payment integration:** checkout and payments handled via Stripe
- **Database transaction processing:** order and payment operations use MongoDB transactions (via Mongoose sessions) to guarantee atomicity, so a failed step never leaves data in a partial state
- **Image uploads:** product images handled via Multer and stored on Cloudinary
- **Admin analytics dashboard:** revenue and order statistics visualized with ApexCharts

## Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-764ABC?style=flat-square&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

**Services**

![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white)

## Project Structure

```
└── 4th-Semester-Project-CEMS/
    ├── client     # React + Vite frontend
    │   ├── .gitignore
    │   ├── README.md
    │   ├── eslint.config.js
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   ├── src
    │   ├── store
    │   ├── utilities
    │   ├── vercel.json
    │   └── vite.config.js
    └── server     # Express backend, MongoDB
        ├── .gitignore
        ├── connection
        ├── controllers
        ├── middlewares
        ├── model
        ├── package-lock.json
        ├── package.json
        ├── routes
        ├── server.js
        ├── utilities
        └── vercel.json
```

## Setup & Run

**1. Clone the repo**
```bash
git clone https://github.com/Hamzaa09/4th-Semester-Project-CEMS.git
cd 4th-Semester-Project-CEMS
```

**2. Backend setup**
```bash
cd server
npm install
```
Create a `.env` file in `server/` with:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```
```bash
npm run dev
```

**3. Frontend setup**
```bash
cd client
npm install
```
Create a `.env` file in `client/` with:
```
VITE_API_BASE_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```
```bash
npm run dev
```

> **Note:** never commit real `.env` values. Keep them local and add `.env` to `.gitignore`.

## Author

Muhammad Hamza - [github.com/Hamzaa09](https://github.com/Hamzaa09) | [LinkedIn](https://www.linkedin.com/in/muhammad-hamza-109413300/)
