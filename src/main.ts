import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS
  app.enableCors({
    origin: "http://localhost:3001", // Allow frontend
    credentials: true, // Allow cookies & headers
  });

  await app.listen(5000);
}
bootstrap();
