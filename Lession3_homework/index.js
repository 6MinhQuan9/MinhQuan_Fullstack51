const Joi = require('joi');
const express = require('express');

const app = express();

app.use(express.json())


//Danh sach khoa hoc

const courses = [
    {
        id:'1',
        name: 'Javascript',
        member: 25,
        price: 1000000
    },
    {
        id:'2',
        name: 'Python',
        member: 31,
        price: 3000000
    },
    {
        id:'3',
        name: 'PHP',
        member: 15,
        price: 1500000
    }
];

app.get('/api/courses', function (req, res) {
    res.send(courses);
});



app.post('/api/courses',  (req, res) => {
    const {error, value } =  validateLesson(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name,
        member: req.body.member,
        price: req.body.price
    };
    courses.push(course);

    res.send(courses);
});

// app.put('');

// app.delete('');
const validateLesson = (course) => {
    const schema = Joi.object(
        {
            name: Joi.string().min(3).required(),
            member: Joi.number().integer().min(10).max(30).required(),
            price: Joi.number().integer().max(20000000).required()
        }
    );
    return schema.validate(course);
}
app.listen(8080, () => console.log('Server dang lang nghe tren cong 8080'))