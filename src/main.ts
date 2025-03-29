import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS
  app.enableCors({
    origin: "https://product-manager-aroratech-zynetic.netlify.app/", // Allow frontend
    credentials: true, // Allow cookies & headers
  });

  const PORT = process.env.PORT || 5000;
await app.listen(PORT);
console.log(`Server running on port ${PORT}`);

}
bootstrap();
