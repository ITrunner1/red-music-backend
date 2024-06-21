import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [    
      'http://localhost:3000',   
      'http://localhost:4200',
      'http://red-music.fun',  
      'http://red-music.fun:4200',
      'https://red-music.fun',  
      'https://red-music.fun:4200',           
    ],
    credentials: true,
    exposedHeaders: 'set-cookie'
  })
  app.setGlobalPrefix('api');
  await app.listen(4200);
}
bootstrap();
