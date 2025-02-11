import cron from 'node-cron';
import { searchGoogle } from './traffic-bot.js';

cron.schedule('*/5 * * * *', async (now) => {
  console.log('-------------------------');
  console.log('Running Cron Job At : ', now);

  const websites = [
    { query: 'mypoufs.com', website: 'https://mypoufs.com' },
    {
      query: 'arganit.com',
      website: 'https://arganit.com',
    },
    {
      query: 'comparateurmaroc.com',
      website: 'https://comparateurmaroc.com/',
    },
  ];

  for (const website of websites) {
    console.log('Visiting website : ', website.website);
    await searchGoogle(website.query, website.website);
  }

  console.log(websites);

  console.log('-------------------------');
});
