-- CreateTable
CREATE TABLE "Cars" (
    "id" UUID NOT NULL,
    "model" VARCHAR(255) NOT NULL,
    "price" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "make" TEXT NOT NULL,
    "seats" TEXT NOT NULL,
    "doors" TEXT,
    "description" TEXT,
    "isRented" BOOLEAN NOT NULL DEFAULT false,
    "photos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ownerEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" UUID NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "lastname" VARCHAR(25) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cellphone" VARCHAR(25),
    "country" VARCHAR(25),
    "state" VARCHAR(25),
    "about" TEXT,
    "photo" VARCHAR(25),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Owner_email_key" ON "Owner"("email");

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "Owner"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
