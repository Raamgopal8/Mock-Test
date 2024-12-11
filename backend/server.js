// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const examRoutes = require("./routes/exams");
app.use(cors());
app.use(express.json());
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection success!")
})

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
});

const User = mongoose.model('User ', userSchema);

// Register
app.post('/api/register', async (req, res) => {
    const { firstName, lastName, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser  = new User({ firstName, lastName, email, phone, password: hashedPassword });
    await newUser .save();
    res.status(201).send('User  registered');
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).send('User  not found');
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).send('Invalid credentials');
        }
    
        // Generate a token
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
      } catch (error) {
        res.status(500).send('Server error');
      }
    });
    const authMiddleware = (req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) return res.status(403).send('A token is required for authentication');
      
        jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
          if (err) return res.status(401).send('Invalid Token');
          req.user = decoded;
          next();
        });
      };
      
      // Protected route example
      app.get('/protected', authMiddleware, (req, res) => {
        res.send('This is a protected route');
      }); 
      
      // Sample Data
const exams = [
  { id: 1, title: "Math Exam", date: "2024-12-15" },
  { id: 2, title: "Science Exam", date: "2024-12-20" },
];

// Routes
app.get("/api/student/exams", (req, res) => {
  res.json(exams);
});

app.post("/api/admin/create-exam", (req, res) => {
  const { title, date } = req.body;
  exams.push({ id: exams.length + 1, title, date });
  res.json({ message: "Exam created successfully" });
});

app.use("/api/exams", examRoutes);

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});