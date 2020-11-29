const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;

const Teams = require('./models/Teams');
const Players = require('./models/Players');
const Equipments = require('./models/Equipments');
const Countries = require('./models/Countries');
const Stadiums = require('./models/Stadiums');
const Matches = require('./models/Matches');
const { request } = require('express');

(async function () {
  const teamsData = [
    { teamName: 'Dynamo Kyiv' },
    { teamName: 'Barselona' },
    { teamName: 'Bavaria' },
  ];
  const playersData = [
    {
      playerName: 'Ronaldo',
      teamName: 'Bavaria',
    },
    {
      playerName: 'Messi',
      teamName: 'Bavaria',
    },
    {
      playerName: 'Berri',
      teamName: 'Bavaria',
    },
    {
      playerName: 'Shevchenko',
      teamName: 'Dynamo Kyiv',
    },
    {
      playerName: 'Yarmolenko',
      teamName: 'Dymano Kyiv',
    },
    {
      playerName: 'Miroshnichenko',
      teamName: 'Dynamo Kyiv',
    },
    {
      playerName: 'Pike',
      teamName: 'Barselona',
    },
    {
      playerName: 'Jerome',
      teamName: 'Barselona',
    },
  ];
  const equipmentData = [
    {
      playerName: 'Pike',
      equipment: ['white shirt', 'blue shoes'],
    },
    {
      playerName: 'Ronaldo',
      equipment: ['blue shirt', 'white shoes'],
    },
    {
      playerName: 'Messi',
      equipment: ['dark shirt', 'yellow shoes'],
    },
  ];
  // await Players.insertMany(playersData);
  // console.log('data has been inserted to Players DB');
  // await Teams.insertMany(teamsData);
  // console.log('data has been inserted to Teams DB');
  // await Equipments.insertMany(equipmentData);
  // console.log('data has been inserted to Equipment DB:');
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
  // await Stadiums.find(
  //   // { countryName: 'Ukraine' }
  // )
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

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
