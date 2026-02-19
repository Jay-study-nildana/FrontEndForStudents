-- CreateTable
CREATE TABLE "PassPortAuthUser" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "emailVerifiedAt" TIMESTAMP(6),
    "lastLoginAt" TIMESTAMP(6),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "PassPortAuthUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassPortAuthRole" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PassPortAuthRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassPortAuthUserRole" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "roleId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PassPortAuthUserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PassPortAuthRefreshToken" (
    "id" UUID NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(6) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "replacedById" UUID,
    "userId" UUID NOT NULL,
    "ip" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "PassPortAuthRefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PassPortAuthUser_email_key" ON "PassPortAuthUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PassPortAuthRole_name_key" ON "PassPortAuthRole"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PassPortAuthUserRole_userId_roleId_key" ON "PassPortAuthUserRole"("userId", "roleId");

-- AddForeignKey
ALTER TABLE "PassPortAuthUserRole" ADD CONSTRAINT "PassPortAuthUserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PassPortAuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassPortAuthUserRole" ADD CONSTRAINT "PassPortAuthUserRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "PassPortAuthRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassPortAuthRefreshToken" ADD CONSTRAINT "PassPortAuthRefreshToken_replacedById_fkey" FOREIGN KEY ("replacedById") REFERENCES "PassPortAuthRefreshToken"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PassPortAuthRefreshToken" ADD CONSTRAINT "PassPortAuthRefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PassPortAuthUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
