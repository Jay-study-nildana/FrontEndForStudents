-- CreateTable
CREATE TABLE "PostImageWithUUID" (
    "id" SERIAL NOT NULL,
    "postId" UUID NOT NULL,
    "fileId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostImageWithUUID_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostImageWithUUID_postId_fileId_key" ON "PostImageWithUUID"("postId", "fileId");
