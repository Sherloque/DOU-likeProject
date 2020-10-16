var mongoose = require('mongoose');

var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
//var sha256File = require('sha256-file');
//const fetch = require('node-fetch');
const expressJwt = require('express-jwt');
const UploadUserpicPath = `${__dirname}/public/Userpics/`;
const uploadpic  = require('multer')({ dest: UploadUserpicPath, fieldSize: 1024*1024*128 })
const UploadVacancypicPath = `${__dirname}/public/Vacancypics/`;
const uploadvacancypic  = require('multer')({ dest: UploadVacancypicPath, fieldSize: 1024*1024*128 })
const UploadNewspicPath = `${__dirname}/public/Newspics/`;
const uploadnewspic  = require('multer')({ dest: UploadNewspicPath, fieldSize: 1024*1024*128 })

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/diplom', { useNewUrlParser: true, autoIndex: false});
var ObjectID = require('mongodb').ObjectID;
var db = mongoose.connection;

var studentSchema = new mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  phonenumber: String,
  ticket: String,
  year: Number,
  password: String,
  status: String,
  recommendation: String,
  photo:String,

});

var Student = mongoose.model('Student', studentSchema)


var recruiterSchema = new mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  phonenumber: String,
  firm: String,
  password: String,
  status: String
});

var Recruiter = mongoose.model('Recruiter', recruiterSchema)


var adminSchema = new mongoose.Schema({
  email: String,
  password: String
});

var Admin = mongoose.model('Admin', adminSchema)


var vacancySchema = new mongoose.Schema({
  vacancyName: String,
  description: String,
  firmScope: String,
  firmLogo: String,
  firmName: String,
  address: String,
  contactNumber: Number,
  email: String,
  website: String,
  status: String
})

var Vacancy = mongoose.model('Vacancy', vacancySchema)


var newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  photo: String,
})

var News = mongoose.model('News', newsSchema)

const config = {
  secret: `,bnb'cc`
}

function jwtWare() {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      '/login',
      '/',
      '/signup',
      '/signuprecruiter',
      '/loginadmin',
      '/signupadmin',
      '/fetchnews',
    ]
  });
}

function errorHandler(err, req, res, next) {
  if (typeof (err) === 'string') {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({ message: 'Invalid Token' });
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}


var app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(jwtWare());



// global error handler
app.get('/', (req, res, next) => {
  res.json({ all: 'ok' })
});
app.use(errorHandler);


db.on('error', console.error.bind(console, 'connection error:'));

app.post('/signup', async (req, res) => {
  student = await Student.findOne({ email: req.body.email })
  if (student) {
    res.status(400).json({
      err: 'Mail already exists'
    })
  }
  else {
    let newStudent = new Student(req.body)
    await newStudent.save()
    let { password, ...studentInfo } = newStudent.toObject()
    studentInfo.role = "student"
    const token = jwt.sign({ sub: studentInfo }, config.secret)
    res.status(201).json({ token, studentInfo })
  }
})


app.post('/signuprecruiter', async (req, res) => {
  recruiter = await Recruiter.findOne({ email: req.body.email })
  if (recruiter) {
    res.status(400).json({
      err: 'Mail already exists'
    })
  }
  else {
    let newRecruiter = new Recruiter(req.body)
    await newRecruiter.save()
    let { password, ...recruiterInfo } = newRecruiter.toObject()
    recruiterInfo.role = "recruiter"
    const token = jwt.sign({ sub: recruiterInfo }, config.secret)
    res.status(201).json({ token, recruiterInfo })
  }
})

app.post('/login', async (req, res) => {
  //console.log(req)
  student = await Student.findOne({ email: req.body.login, password: req.body.password })
  recruiter = await Recruiter.findOne({ email: req.body.login, password: req.body.password })
  if (student) {
    let { password, ...userInfo } = student.toObject()
    userInfo.role = "student"
    const token = jwt.sign({ sub: userInfo }, config.secret)
    res.status(200).json({ token, userInfo })
  }
  else if (recruiter) {
    let { password, ...userInfo } = recruiter.toObject()
    userInfo.role = "recruiter"
    const token = jwt.sign({ sub: userInfo }, config.secret)
    res.status(200).json({ token, userInfo })
  }
  else {
    res.status(404).json({
      err: "Incorrect login or password"
    })
  }
})


app.post('/loginadmin', async (req, res) => {
  admin = await Admin.findOne({ login: req.body.email, password: req.body.password })
  //recruiter = await Recruiter.findOne({ login: req.body.email, password: req.body.password })
  if (admin) {
    let { password, ...adminInfo } = admin.toObject()
    const token = jwt.sign({ sub: adminInfo }, config.secret)
    res.status(200).json({ token, adminInfo })
  }
  else {
    res.status(404).json({
      err: "Incorrect login or password"
    })
  }
})

app.post('/signupadmin', async (req, res) => {
  admin = await Admin.findOne({ email: req.body.email })
  if (admin) {
    res.status(400).json({
      err: 'Mail already exists'
    })
  }
  else {
    let newAdmin = new Admin(req.body)
    await newAdmin.save()
    let { password, ...adminInfo } = newAdmin.toObject()
    const token = jwt.sign({ sub: adminInfo }, config.secret)
    res.status(201).json({ token, adminInfo })
  }
})


app.get('/fetchpendings', async (req, res) => {
  let pendingstuds = await Student.find({ status: "pending" })
  let pendingrecrs = await Recruiter.find({ status: "pending" })
  let pendingvacs = await Vacancy.find({ status: "pending" })
  if (pendingstuds && pendingrecrs && pendingvacs) {
    pendings = { pendingstuds, pendingrecrs, pendingvacs }
    res.send(pendings)
  }
  else {
    res.status(404).json({
      err: 'No pending students/recruiters/vacancies'
    })
  }
})

app.post("/verifystudent", async (req, res) => {
  let stud = await Student.findOneAndUpdate(
    { email: req.body.email },
    { $set: { status: "verified" } }
  )
  if (stud)
    res.status(200).json();
  else {
    res.status(404).json({
      err: 'NO such  STUDENT in pending'
    })
  }
})


app.delete('/deletestudent/:id', async (req, res) => {
  await Student.findOneAndDelete(
    { _id: ObjectID(req.params.id) }
  )
  res.status(200).json();
})

app.post("/verifyrecruiter", async (req, res) => {
  let recr = await Recruiter.findOneAndUpdate(
    { email: req.body.email },
    { $set: { status: "verified" } }
  )
  if (recr)
    res.status(200).json();
  else {
    res.status(404).json({
      err: 'NO such  RECRUITER in pending'
    })
  }
})

app.delete('/deleterecruiter/:id', async (req, res) => {
  await Recruiter.findOneAndDelete(
    { _id: ObjectID(req.params.id) }
  )
  res.status(200).json();
})


app.post("/createvacancy", uploadvacancypic.single("file"), async (req, res) => {

  let newVacancy = new Vacancy({})
  newVacancy.vacancyName = req.body.vacancyName;
  newVacancy.description = req.body.description;
  newVacancy.firmScope = req.body.firmScope;
  newVacancy.firmLogo = "http://127.0.0.1:8887/" + req.file.path.substr(28);
  newVacancy.firmName = req.body.firmName;
  newVacancy.address = req.body.address;
  newVacancy.contactNumber = req.body.contactNumber;
  newVacancy.email = req.body.email;
  newVacancy.website = req.body.website;
  newVacancy.status = req.body.status;
  await newVacancy.save()
  res.status(200).json()
})


app.post("/verifyvacancy", async (req, res) => {
  let vacan = await Vacancy.findOneAndUpdate(
    {
      email: req.body.email,
      vacancyName: req.body.vacancyName,
      description: req.body.description
    },
    { $set: { status: "verified" } }
  )
  if (vacan)
    res.status(200).json();
  else {
    res.status(404).json({
      err: 'NO such  VACANCY in pending'
    })
  }
})

app.delete('/deletevacancy/:id', async (req, res) => {
  await Vacancy.findOneAndDelete(
    { _id: ObjectID(req.params.id) }
  )
  res.status(200).json();
})


app.get('/fetchvacancies', async (req, res) => {
  let vacancies = await Vacancy.find(
    { status: "verified" }
  )
  res.send(vacancies);
})

app.get('/fetchstudents', async (req, res) => {
  let students = await Student.find(
    { status: "verified" }
  )
  res.send(students)
})


app.post('/createnews', uploadnewspic.single("file"), async (req, res) => {
  let newNews = new News({})
  newNews.title = req.body.title;
  newNews.description = req.body.description;
  newNews.photo = "http://127.0.0.1:8887/" + req.file.path.substr(28);
  await newNews.save()
})

app.get('/fetchnews', async (req, res) => {
  let news = await News.find()
  res.send(news)
})


app.post('/changestudentinfo', async (req, res) => {
  student = await Student.findOne({ _id: req.body.id })
  if (student && req.body.password != null) {
    let studentInfo = Student.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { "email": req.body.email, "password": req.body.password } },
      { new: true }
    )
      .then((result) => {
        let { password, ...studentInfo } = result.toObject()
        studentInfo.role = "student"
        console.log(studentInfo)
        const token = jwt.sign({ sub: studentInfo }, config.secret)
        res.status(200).json({ token, studentInfo })
      })
  }
  else {
    let studentInfo = Student.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { "email": req.body.email } },
      { new: true }
    )
      .then((result) => {
        let { password, ...studentInfo } = result.toObject()
        studentInfo.role = "student"
        const token = jwt.sign({ sub: studentInfo }, config.secret)
        res.status(200).json({ token, studentInfo })
      })
  }
})


app.post('/changerecruiterinfo', async (req, res) => {
  recruiter = await Recruiter.findOne({ _id: req.body.id })
  if (recruiter) {
    let recruiterInfo = Recruiter.findOneAndUpdate(
      { _id: req.body.id },
      { $set: { "password": req.body.password } },
      { new: true }
    )
      .then((result) => {
        let { password, ...recruiterInfo } = result.toObject()
        recruiterInfo.role = "recruiter"
        const token = jwt.sign({ sub: recruiterInfo }, config.secret)
        res.status(200).json({ token, recruiterInfo })
      })
  }
})

app.post('/fetchrecruitersvacancies', async (req, res) => {
  let pendingvacs = await Vacancy.find({ email: req.body.email, status: "pending" })
  let verifiedvacs = await Vacancy.find({ email: req.body.email, status: "verified" })
  if (pendingvacs && verifiedvacs) {
    recruitersVacs = { pendingvacs, verifiedvacs }
    res.send(recruitersVacs)
  }
  else {
    res.status(404).json({
      err: 'NO VACANCIES'
    })
  }
})


app.post('/attachrecommendation', async (req, res) => {
  let student = await Student.findOneAndUpdate(
    { email: req.body.email },
    { $set: { recommendation: req.body.recommendation } }
  )
  res.status(200).json();
})



app.post('/addphoto',uploadpic.single("file"), async (req, res) => {
  student = await Student.findOne({ _id: req.body.field })
  let studentInfo = await Student.findOneAndUpdate(
    { _id:  req.body.field },
    { $set: { photo: "http://127.0.0.1:8887/" + req.file.path.substr(28) } },
    {new: true}
  ).then((result) => {
    let { password, ...photoStudent } = result.toObject()
    photoStudent.role = "student"
    const token = jwt.sign({ sub: photoStudent }, config.secret)
    res.status(201).json({ token, photoStudent })
})
})

app.listen(4000, function () {
  console.log('Example app listening on port 4000!');
});
