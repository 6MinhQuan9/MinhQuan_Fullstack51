const express = require('express');
const app = express();
const mangaRouter = require('./Router/mangaRouter');
// const userRouter = require('./Router/userRouter');
app.use(express.json());

app.use('/api/manga', mangaRouter);
// app.use('/api/user', userRouter);

app.listen(8080, () => console.log('Server dang lang nghe tren cong 8080'));


