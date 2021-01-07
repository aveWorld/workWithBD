const express = require('express');
const app = express();
const axios = require('axios');
const crypto = require('crypto')
const bodyParser = require('body-parser')
const port = 3000;

const Teams = require('./models/Teams');
const Players = require('./models/Players');
const Equipments = require('./models/Equipments');
const Countries = require('./models/Countries');
const Stadiums = require('./models/Stadiums');
const Matches = require('./models/Matches');
const Insert = require('./DBMethods/Insert');
const { request } = require('express');

(async function () {
  const countriesData = [
    { name: 'Ukraine' },
    { name: 'Spain' },
    { name: 'Germany' },
  ];
  const matchesData = [
    {
      matchName: 'Ukraine vs Spain',
      stadiumNames: ['NSC Olimpiyskiy', 'Camp Nou'],
    },
    {
      matchName: 'Ukraine vs Germany',
      stadiumNames: ['Arena Lviv', 'Signal Iduna Park'],
    },
    {
      matchName: 'Germany vs Spain',
      stadiumNames: ['Allianz Arena', 'Santiago Bernabéu'],
    },
  ];
  const stadiumsData = [
    {
      stadiumName: 'NSC Olimpiyskiy',
      countryName: 'Ukraine',
      matches: ['Ukraine vs Spain'],
    },
    { stadiumName: 'Metalist Stadium', countryName: 'Ukraine', matches: [] },
    {
      stadiumName: 'Arena Lviv',
      countryName: 'Ukraine',
      matches: ['Ukraine vs Germany'],
    },
    { stadiumName: 'Dnipro Stadium', countryName: 'Ukraine', matches: [] },
    {
      stadiumName: 'Camp Nou',
      countryName: 'Spain',
      matches: ['Ukraine vs Spain'],
    },
    {
      stadiumName: 'Santiago Bernabéu',
      countryName: 'Spain',
      matches: ['Germany vs Spain'],
    },
    { stadiumName: 'Metropolitano Stadium', countryName: 'Spain', matches: [] },
    {
      stadiumName: 'Signal Iduna Park',
      countryName: 'Germany',
      matches: ['Ukraine vs Germany'],
    },
    {
      stadiumName: 'Allianz Arena',
      countryName: 'Germany',
      matches: ['Germany vs Spain'],
    },
    {
      stadiumName: 'Olympiastadion Berlin',
      countryName: 'Germany',
      matches: [],
    },
  ];
  // await Countries.insertMany(countriesData);
  // console.log('data has been inserted to Country DB');
  // await Stadiums.insertMany(stadiumsData);
  // console.log('data has been inserted to Stadiums DB');
  // await Matches.insertMany(matchesData);
  // console.log('data has been inserted to Matches DB:');
})();

require('./db');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/data', async (request, response) => {
  const data = {
    countries: await Countries.find(),
    stadiums: await Stadiums.find(),
    matches: await Matches.find(),
  };
  response.send(data);
});

app.get('/sort', async (request, response) => {
  let data = {};
  let prop_name = request.query.sort_name;
  if (request.query.name === 'countries') {
    data = await Countries.find().sort({
      [prop_name]: request.query.sort_by_asc,
    });
  } else if (request.query.name === 'stadiums') {
    data = await Stadiums.find().sort({
      [prop_name]: request.query.sort_by_asc,
    });
  } else if (request.query.name === 'matches') {
    data = await Matches.find().sort({
      [prop_name]: request.query.sort_by_asc,
    });
  }
  response.send(data);
});

app.get('/filter', async (request, response) => {
  let data = {};
  let prop_name = request.query.sort_name;
  if (request.query.name === 'countries') {
    data = await Countries.find({ [prop_name]: request.query.input });
  } else if (request.query.name === 'stadiums') {
    data = await Stadiums.find({ [prop_name]: request.query.input });
  } else if (request.query.name === 'matches') {
    data = await Matches.find({ [prop_name]: request.query.input });
  }
  response.send(data);
});

app.get('/delete', async (request, response) => {
  let prop_name = request.query.prop;
  if (request.query.name === 'countries') {
    await Countries.remove({ [prop_name]: request.query.data });
  } else if (request.query.name === 'stadiums') {
    await Stadiums.remove({ [prop_name]: request.query.data });
  } else if (request.query.name === 'matches') {
    await Matches.remove({ [prop_name]: request.query.data });
  }
  console.log(request.query);
});

Insert.insert()

// app.get('/insert', async (request, response) => {
//   let countryName = request.query.name;
//   Countries.insertMany({ name: countryName });
// });

app.get('/edit', async (request, response) => {
  console.log(request.query);
  let newName = request.query.name;
  let oldName = request.query.old_name;
  Countries.findOneAndUpdate(
    { name: oldName },
    { $set: { name: newName } },
    { new: true },
    (err, doc) => {
      if (err) {
        console.log('Something wrong when updating data!');
      }

      console.log(doc);
    }
  );
})

// lab 7

const tokenKey = '1a2b-3c4d-5e6f-7g8h'

app.use(bodyParser.json())
app.use((req, res, next) => {
  if (req.headers.authorization) {
    let tokenParts = req.headers.authorization
      .split(' ')[1]
      .split('.')
    let signature = crypto
      .createHmac('SHA256', tokenKey)
      .update(`${tokenParts[0]}.${tokenParts[1]}`)
      .digest('base64')

    if (signature === tokenParts[2])
      req.user = JSON.parse(
        Buffer.from(tokenParts[1], 'base64').toString(
          'utf8'
        )
      )

    next()
  }

  next()
})

let users = [
  {
    login: 'dima',
    password: '1111'
  },
  {
    login: 'misha',
    password: '2222'
  }
]

app.post('/api/auth', async (req, res) => {
  for (let user of users) {
    if (
      req.body.login == user.login &&
      req.body.password == user.password
    ) {
      let head = Buffer.from(
        JSON.stringify({ alg: 'HS256', typ: 'jwt' })
      ).toString('base64')
      let body = Buffer.from(JSON.stringify(user)).toString(
        'base64'
      )
      let signature = crypto
        .createHmac('SHA256', tokenKey)
        .update(`${head}.${body}`)
        .digest('base64')

      return res.status(200).json({
        id: user.id,
        login: user.login,
        token: `${head}.${body}.${signature}`,
      })
    }
  }

  return res.status(404).json({ message: 'User not found' })
})

app.get('/user', (req, res) => {
  if (req.user) return res.status(200).json(req.user)
  else
    return res
      .status(401)
      .json({ message: 'Not authorized' })
})

//

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})