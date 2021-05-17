import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

function setupValidationPipe(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
}

function setupSwagger(app: INestApplication) {
  const configService = app.get<ConfigService>(ConfigService);
  const appName = configService.get('npm_package_name');
  const appVersion = configService.get('npm_package_version');
  const config = new DocumentBuilder()
    .setTitle(appName)
    .setDescription('Improve this description')
    .setVersion(appVersion)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  setupValidationPipe(app);
  await app.listen(3000);
}
bootstrap();
