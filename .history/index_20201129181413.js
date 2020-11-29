const express = require('express');
const app = express();
const axios = require('axios')
const port = 3000;

const Countries = require('./models/Countries');
const Stadiums = require('./models/Stadiums');
const Matches = require('./models/Matches');

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
  // console.log('data has been inserted to Matches DB\n\n');
  console.log('All stadiums in Ukraine: \n');
  const ukraineStadiums = await Stadiums.find(
    { countryName: 'Ukraine' }
  );
})();

require('./db');

app.get('/',function(req,res) {
  res.sendFile(__dirname + '/index.html');
});

app.get("/data", async(request, response) => {
  const data = {
    countries: await Countries.find(),
    stadiums: await Stadiums.find(),
    matches: await Matches.find()
  } 
  // await Stadiums.find(
  //   // { countryName: 'Ukraine' }
  // )
  response.send(data)
})

app.get("/sort", async(request, response) => {
  let data = {}
  let prop_name = request.query.sort_name
  if(request.query.name === 'countries') {
    data = await Countries.find().sort({ [prop_name]: request.query.sort_by_asc })
  } else if(request.query.name === 'stadiums') {
    data = await Stadiums.find().sort({ [prop_name]: request.query.sort_by_asc })
  } else if(request.query.name === 'matches') {
    data = await Matches.find().sort({ [prop_name]: request.query.sort_by_asc })
  }
  response.send(data)
})



app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
