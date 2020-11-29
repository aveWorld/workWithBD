const mongoose = require('mongoose');
const DB_STRING =
  'mongodb+srv://misha:vbif22@mydb.dqumu.mongodb.net/test?retryWrites=true&w=majority';

mongoose
  .connect(DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((response) => console.log('successfully connected to mongoDB'))
  .catch((err) => console.log(err, 'Error'));
