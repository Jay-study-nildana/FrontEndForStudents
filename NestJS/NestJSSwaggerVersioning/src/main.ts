import { ValidationPipe } from '@nestjs/common';
import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  // Enable URI-based versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));


  // Swagger config for v1
  const configV1 = new DocumentBuilder()
    .setTitle('Contone API v1')
    .setDescription('API docs for Contone resource (v1)')
    .setVersion('1.0')
    .build();

  const { ContoneModule: ContoneV1Module } = await import('./v1/contone/contone.module.js');
  const documentV1 = SwaggerModule.createDocument(app, configV1, {
    include: [ContoneV1Module],
  });

  SwaggerModule.setup('docs/v1', app, documentV1, {
    customSiteTitle: 'Contone API Docs v1',
    customCss: '.topbar { display: flex; align-items: center; gap: 12px } .topbar a { color: #fff }',
  });
  // docs UI available at http://localhost:3000/docs/v1

    // Swagger config for v2
    const configV2 = new DocumentBuilder()
      .setTitle('Contone API v2')
      .setDescription('API docs for Contone resource (v2)')
      .setVersion('2.0')
      .build();

    const { ContoneModule: ContoneV2Module } = await import('./v2/contone/contone.module.js');
    const documentV2 = SwaggerModule.createDocument(app, configV2, {
      include: [ContoneV2Module],
    });

    SwaggerModule.setup('docs/v2', app, documentV2, {
      customSiteTitle: 'Contone API Docs v2',
      customCss: '.topbar { display: flex; align-items: center; gap: 12px } .topbar a { color: #fff }',
    });
    // docs UI available at http://localhost:3000/docs/v2  

  await app.listen(process.env.PORT ?? 3000);

  const baseUrl = await app.getUrl();
  // normalize IPv6 loopback to localhost for nicer console output
  const displayBaseUrl = baseUrl.replace(/\[::1\]/g, 'localhost').replace(/::1/g, 'localhost');

  // print URLs to console (concise)
  // e.g. http://localhost:3000/docs and http://localhost:3000/docs-json
  // (useful during development)
  // eslint-disable-next-line no-console
  console.log(`Swagger UI v1: ${displayBaseUrl}/docs/v1`);
  // eslint-disable-next-line no-console
  console.log(`Swagger JSON v1: ${displayBaseUrl}/docs/v1-json`);
  // eslint-disable-next-line no-console
  console.log(`Swagger UI v2: ${displayBaseUrl}/docs/v2`);
  // eslint-disable-next-line no-console
  console.log(`Swagger JSON v2: ${displayBaseUrl}/docs/v2-json`);
}
bootstrap();