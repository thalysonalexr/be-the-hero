import app from './app';

const host = process.env.BASE_URL;
const port = process.env.PORT;

app.listen(port, host, () => {
  console.log(`Application running in http://${host}:${port}`);
});
