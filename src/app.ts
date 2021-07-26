import * as express from 'express';
import catsRouter from './cats/cats.route';

class Server {
	public app: express.Application;

	constructor() {
		const app: express.Application = express();
		this.app = app;
	}

	private setRoute() {
		this.app.use(catsRouter);
	}

	private setMiddleware() {
		//* Logging middleware
		this.app.use(
			(
				req: express.Request,
				res: express.Response,
				next: express.NextFunction
			) => {
				console.log(req.rawHeaders[1]);
				console.log(`Logging Middleware`);
				next(); // 써줘야 다음 미들웨어/라우터 실행.
			}
		);

		//* json middleware 익스프레스가 json 객체를 읽을 수 있도록 해줌
		this.app.use(express.json());

		this.setRoute();

		//* 404 middleware
		this.app.use(
			(
				req: express.Request,
				res: express.Response,
				next: express.NextFunction
			) => {
				console.log(`error middleware`);
				res.send({ error: '404 NOT FOUND' });
			}
		);
	}
	public listen() {
		this.setMiddleware();
		this.app.listen(8000, () => {
			console.log(`server is on port 8000`);
		});
	}
}

function init() {
	const server = new Server();
	server.listen();
}

init();
