const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI) 
  .then(() => console.log("MongoDB Connected!"))
  .catch(err => console.log("Connection Error:", err));


const itemRoutes = require('./routes/items');
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});