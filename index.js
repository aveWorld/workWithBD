const express = require('express');
const app = express();
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
  await Countries.insertMany(countriesData);
  console.log('data has been inserted to Country DB');
  await Stadiums.insertMany(stadiumsData);
  console.log('data has been inserted to Stadiums DB');
  await Matches.insertMany(matchesData);
  console.log('data has been inserted to Matches DB\n\n');
  console.log('All stadiums in Ukraine: \n');
  const ukraineStadiums = await Stadiums.find(
    { countryName: 'Ukraine' },
    (err, result) => {
      console.log(result);
    }
  );
  console.log(ukraineStadiums);
})();

require('./db');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
