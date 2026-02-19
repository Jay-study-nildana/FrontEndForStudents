-- CreateTable
CREATE TABLE "PassPortAuthFile" (
    "id" UUID NOT NULL,
    "ownerId" UUID NOT NULL,
    "originalName" TEXT NOT NULL,
    "storageName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "checksum" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PassPortAuthFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PassPortAuthFile_storageName_key" ON "PassPortAuthFile"("storageName");

-- CreateIndex
CREATE INDEX "PassPortAuthFile_ownerId_idx" ON "PassPortAuthFile"("ownerId");
