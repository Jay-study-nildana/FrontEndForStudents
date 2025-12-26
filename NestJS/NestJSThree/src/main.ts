import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Contone API')
    .setDescription('API docs for Contone resource')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', description: 'Enter JWT token as: Bearer <token>' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const swaggerUiOptions = {
    // instruct Swagger UI where to fetch the JSON and customise the site title to show locations
    swaggerOptions: {
      url: '/docs-json',
      // preauthorize using the same name passed to addBearerAuth
      authAction: {
        'access-token': {
          name: 'Authorization',
          schema: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
          value: 'Bearer <JWT>',
        },
      },
    },
    customSiteTitle: 'Contone API Docs — UI: /docs | JSON: /docs-json',
    customCss: '.topbar { display: flex; align-items: center; gap: 12px } .topbar a { color: #fff }',
  };

  SwaggerModule.setup('docs', app, document, swaggerUiOptions);
  // docs UI available at http://localhost:3000/docs
  // swagger JSON available at http://localhost:3000/docs-json

  await app.listen(process.env.PORT ?? 3000);

  const baseUrl = await app.getUrl();
  // normalize IPv6 loopback to localhost for nicer console output
  const displayBaseUrl = baseUrl.replace(/\[::1\]/g, 'localhost').replace(/::1/g, 'localhost');

  // print URLs to console (concise)
  // e.g. http://localhost:3000/docs and http://localhost:3000/docs-json
  // (useful during development)
  // eslint-disable-next-line no-console
  console.log(`Swagger UI: ${displayBaseUrl}/docs`);
  // eslint-disable-next-line no-console
  console.log(`Swagger JSON: ${displayBaseUrl}/docs-json`);
  //database URl

  console.log('DATABASE_URL=', process.env.DATABASE_URL);
}
bootstrap();