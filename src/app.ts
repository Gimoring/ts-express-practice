import * as express from 'express';
import { Cat, CatType } from './app.model';

const app: express.Express = express();

//* Logging middleware
app.use((req, res, next: express.NextFunction) => {
	console.log(req.rawHeaders[1]);
	console.log(`Logging Middleware`);
	next(); // 써줘야 다음 미들웨어/라우터 실행.
});

//* READ 고양이 전체 데이터 조회
app.get('/cats', (req, res) => {
	try {
		const cats = Cat;
		res.status(200).send({
			success: true,
			data: {
				cats,
			},
		});
	} catch (error) {
		res.status(400).send({
			success: false,
			error: error.message,
		});
	}
});

//* READ 특정 고양이 데이터 조회

//* 404 middleware
app.use((req, res, next) => {
	console.log(`error middleware`);
	res.send({ error: '404 NOT FOUND' });
});

app.listen(8000, () => {
	console.log(`server is on port 8000`);
});
