import Koa from 'koa';
import Cors from '@koa/cors';

import { MainRouter } from './routes/index.js';
import { initServer } from './server/bootstrap.js';
import serve from 'koa-static';
import path from "path";
import bodyParser from 'koa-bodyparser';

const __dirname = path.resolve();
console.log(path.join(__dirname, 'public'));
const staticDirPath = path.join(__dirname, 'public');

const app = new Koa();
app.use(bodyParser());
app.use(serve(staticDirPath));
//Starting the prerequest
initServer(app);




app.use(Cors())
app.use(MainRouter())






app.listen(3300);