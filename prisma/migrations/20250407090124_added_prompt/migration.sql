-- CreateTable
CREATE TABLE "Generator" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Generator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Generator_userId_idx" ON "Generator"("userId");

-- AddForeignKey
ALTER TABLE "Generator" ADD CONSTRAINT "Generator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
