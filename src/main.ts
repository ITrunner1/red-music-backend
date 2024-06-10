import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000', 'https://89.248.206.108:3000', 'https://89.248.206.108:3000',
    ],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })
  app.setGlobalPrefix('api');
  await app.listen(4200);
}
bootstrap();
