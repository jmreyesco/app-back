import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  //  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // app.enableCors({ origin: true });
  // const port = process.env.PORT ? Number(process.env.PORT) : 3001;
  // await app.listen(port);
  // console.log(`Backend running on http://localhost:${port}`);
}
bootstrap();
