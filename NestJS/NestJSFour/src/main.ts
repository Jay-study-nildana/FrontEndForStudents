import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {

  // Create an Express-backed Nest application instance so we can use Express-specific APIs
// (like app.useStaticAssets). This is required to mount the uploads directory as static
// assets so files written to disk by multer are served over HTTP (e.g. /uploads/<file>).

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Serve the uploads directory as static assets so files written by multer (diskStorage)
  // are reachable via HTTP.
  // - join(process.cwd(), process.env.UPLOADS_DIR ?? 'uploads') resolves the absolute folder
  //   where multer stores uploaded files on disk.
  // - prefix '/uploads/' mounts that folder at URLs like: http://<host>/uploads/<storageName>
  // Without this, files saved to disk would not be served by Nest/Express and clients
  // couldn't download/display uploaded images.

  app.useStaticAssets(join(process.cwd(), process.env.UPLOADS_DIR ?? 'uploads'), {
  prefix: '/uploads/',
});

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