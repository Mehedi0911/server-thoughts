import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();
app.use(cors());


app.use(express.json({limit:"30mb", extended: true}));
app.use(express.urlencoded({limit:"30mb", extended: true}));

app.use('/posts', postRoutes);

//  const CONNECTION_URL = 'mongodb+srv://mehedi91:Raaj_091@cluster0.3unof.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const CONNECTION_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qkyg0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000;

 mongoose.connect(CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
 .then(() => app.listen(PORT, ()=> console.log(`Server is Running on port ${PORT}`)))
 .catch((error) => console.log(error.message));

 mongoose.set('useFindAndModify', false);