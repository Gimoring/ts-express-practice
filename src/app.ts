import * as express from 'express';
import catsRouter from './cats/cats.route';

const app: express.Express = express();

//* Logging middleware
app.use((req, res, next: express.NextFunction) => {
	console.log(req.rawHeaders[1]);
	console.log(`Logging Middleware`);
	next(); // 써줘야 다음 미들웨어/라우터 실행.
});

//* json middleware 익스프레스가 json 객체를 읽을 수 있도록 해줌
app.use(express.json());

app.use(catsRouter);

//* 404 middleware
app.use((req, res, next) => {
	console.log(`error middleware`);
	res.send({ error: '404 NOT FOUND' });
});

app.listen(8000, () => {
	console.log(`server is on port 8000`);
});
