import { Module } from '@nestjs/common';
// Module decorator from NestJS used to define a module boundary (imports/providers/controllers/exports).

import { AdminpanelService } from './adminpanel.service';
// AdminpanelService is the facade service used by controllers to perform admin operations.
// It depends on an implementation of the admin user repository (AdminUserServiceImpl),
// so it must be registered as a provider in this module so Nest's DI can instantiate it.

import { AdminpanelController } from './adminpanel.controller';
// AdminpanelController exposes HTTP endpoints for the admin panel. Controllers are registered
// here so Nest can create request-scoped handlers and inject providers (services) into them.

import { AdminUserServiceImpl } from './repositories/prisma-adminpanel.repository';
// Concrete repository/adapter implementing the AdminUserService contract.
// This class interacts with Prisma (database) and therefore must be a provider so it can be
// injected into AdminpanelService. Registering the concrete implementation here ensures the
// dependency graph can be resolved within the AdminpanelModule.

import { PrismaModule } from 'src/prisma.module';
// PrismaModule is imported to make PrismaService (and any other exported Prisma-related providers)
// available in this module. The repository (AdminUserServiceImpl) depends on PrismaService, so
// importing PrismaModule is necessary to satisfy that dependency. PrismaModule should export
// PrismaService (singleton) to avoid recreating database clients and to centralize configuration.
// ...existing code...

@Module({
  // imports: modules whose exported providers we want to use here.
  imports: [
    PrismaModule, // Provides PrismaService (singleton DB client). Imported so providers below can inject PrismaService.
  ],

  // controllers: classes that handle incoming requests for this module's routes.
  controllers: [
    AdminpanelController, // Handles HTTP routes; it will receive AdminpanelService via injection.
  ],

  // providers: classes instantiated by Nest and available for injection within this module.
  providers: [
    AdminpanelService, // Business/facade service that orchestrates admin operations; depends on AdminUserServiceImpl.
    AdminUserServiceImpl, // Concrete data-access provider (uses PrismaService). Must be a provider so it can be injected.
  ],

  // exports: providers from this module that should be available to other modules that import this module.
  exports: [
    AdminUserServiceImpl, // Export the repository implementation so other modules (or tests) can reuse it when they import AdminpanelModule.
    // Exporting also allows consumers to rely on this concrete implementation without re-declaring it.
    // Note: If you want to expose the higher-level facade instead, you could export AdminpanelService as well.
  ],
})
export class AdminpanelModule {}
