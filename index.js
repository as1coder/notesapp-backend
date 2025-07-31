const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// DB Connect
connectDB();

const allowedOrigins = [
  'https://notesapp-frontend-kappa.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
