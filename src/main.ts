import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:8080', // Địa chỉ frontend của bạn
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Các phương thức HTTP được phép
    allowedHeaders: 'Content-Type,Authorization', // Các header được phép
  });
  await app.listen(3000);
}
bootstrap();
