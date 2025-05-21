const express = require('express');
const cors = require('cors');
const http = require('http');

const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const surveyRoutes = require('./routes/surveyRoutes');

dotenv.config();
const app = express();

app.use(cors({
   origin : process.env.FRONTEND_URL,
   credentials : true                // allow cookies
}));

app.use(cookieParser());
app.use(express.json());

connectDB();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

const io = new Server(server, {
    cors : {
        origin : '*',
        methods : ['GET', 'POST']
    }
});


// socket connection
io.on('connection', (socket) => {  
    console.log('Client connected:', socket.id);

    // join frontend
    socket.on('join_survey_room', (surveyId) => {
      socket.join(surveyId);                        // room join
      // console.log(`Joined room : ${surveyId}`);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
  

// make io availbale in routes
app.set('io',io); 
app.use('/api/surveys', surveyRoutes);

// Start server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});