const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

// Middleware (Form & JSON data parse karne ke liye)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const filePath = path.join(__dirname, 'student.json');

let students = [];

if (fs.existsSync(filePath)) {
    students = JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// 1. Root Route - HTML Page Serve Karega
app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 2. REGISTER ENDPOINT
app.post('/api/students/register', (req, res) => {
    const { name, email, phone, password } = req.body;

    const existingUser = students.find(s => s.email === email);
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    students.push({ name, email, phone, password });
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
    res.json({ success: true, message: 'Student registered successfully' });
});

// 3. LOGIN ENDPOINT
app.post('/api/students/login', (req, res) => {
    const { email, password } = req.body;

    const student = students.find(s => s.email === email && s.password === password);
    if (student) {
        res.json({
            success: true,
            student: { name: student.name, email: student.email }
        });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// Server Listener
const PORT = process.env.PORT || 80;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});