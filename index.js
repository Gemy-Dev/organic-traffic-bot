import cron from 'node-cron';
import { searchGoogle } from './traffic-bot.js';

cron.schedule('*/1 * * * *', async (now) => {
  console.log('-------------------------');
  console.log('Running Cron Job At : ', now);

  const websites = [
    { query: 'vh magazine', website: 'vh.ma' },
    {
      query: 'mypoufs.com',
      website: 'mypoufs.com',
    },
    {
      query: 'azdine bouali',
      website: 'azdinebouali.tech',
    },
  ];

  for (const website of websites) {
    console.log('Visiting website : ', website.website);
    await searchGoogle(website.query, website.website);
  }

  console.log(websites);

  console.log('-------------------------');
});
