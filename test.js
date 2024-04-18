import cron from 'node-cron';
import { searchGoogle } from './traffic-bot.js';

cron.schedule('*/1 * * * *', async (now) => {
  console.log('-------------------------');
  console.log('Running Cron Job At : ', now);

  const websites = [
    { query: 'vh magazine', website: 'vh.ma', visited: false },
    { query: 'dxb-airport.com', website: 'dxb-airport.com', visited: false },
  ];

  websites.forEach(async (website) => {
    if (!website.visited) {
      console.log('Visiting website : ', website.website);
      website.visited = true;
    }
  });

  console.log(websites);

  console.log('-------------------------');
});
