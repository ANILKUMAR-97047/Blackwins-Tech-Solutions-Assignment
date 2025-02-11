require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db.config');
const contactRoutes = require('./src/routes/contact.routes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/contacts', contactRoutes);

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});