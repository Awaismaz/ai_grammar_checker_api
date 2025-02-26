require('dotenv')
	.config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const sessionConfig = require('./config/session');
const authRoutes = require('./routes/authRoutes');
const checkGrammarRoutes = require('./routes/grammerCheckRoutes');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

connectDB();

// Middleware
app.use(cors({
	             origin: ['http://localhost:3000', 'https://ai-grammar-checker-rouge.vercel.app'],
	             credentials: true
             }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session(sessionConfig));
app.use(morgan('dev'));
app.set('trust proxy', 1);

app.use('/api/auth', authRoutes);
app.use('/api/grammar-check', checkGrammarRoutes);

app.get('/', (req, res) => {
	res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
