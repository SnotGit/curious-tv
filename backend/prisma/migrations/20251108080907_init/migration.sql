-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'VIEWER');

-- CreateEnum
CREATE TYPE "StatutVideo" AS ENUM ('BROUILLON', 'PUBLIE', 'PROGRAMME');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'VIEWER',
    "favoris" TEXT[],
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "urlYoutube" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "datePublication" TIMESTAMP(3) NOT NULL,
    "duree" INTEGER NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "statut" "StatutVideo" NOT NULL DEFAULT 'BROUILLON',
    "tags" TEXT[],

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "icone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prochaines_sorties" (
    "id" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "datePreview" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT,

    CONSTRAINT "prochaines_sorties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "newsletters" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "dateInscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stats" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "vues" INTEGER NOT NULL DEFAULT 0,
    "favoris" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacts" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sujet" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "dateEnvoi" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lu" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "contacts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_nom_key" ON "categories"("nom");

-- CreateIndex
CREATE UNIQUE INDEX "newsletters_email_key" ON "newsletters"("email");

-- CreateIndex
CREATE UNIQUE INDEX "stats_videoId_key" ON "stats"("videoId");

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
