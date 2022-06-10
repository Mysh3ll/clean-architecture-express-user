import express from 'express';

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.info(`Mock Backend App is running at http://localhost:${port}`);
  console.log('  Press CTRL-C to stop\n');
});
