const express = require('express');
const app = express();
const port = 3000;

const Teams = require('./models/Teams');
const Players = require('./models/Players');
const Equipments = require('./models/Equipments');

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
  await Players.insertMany(playersData);
  console.log('data has been inserted to Players DB');
  await Teams.insertMany(teamsData);
  console.log('data has been inserted to Teams DB');
  await Equipments.insertMany(equipmentData);
  console.log('data has been inserted to Equipment DB:');
})();

require('./db');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
