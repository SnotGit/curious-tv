/*
  Warnings:

  - You are about to drop the column `datePreview` on the `prochaines_sorties` table. All the data in the column will be lost.
  - Added the required column `dateDebut` to the `prochaines_sorties` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatutLive" AS ENUM ('A_VENIR', 'EN_COURS', 'TERMINE');

-- AlterTable
ALTER TABLE "prochaines_sorties" DROP COLUMN "datePreview",
ADD COLUMN     "dateDebut" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "statut" "StatutLive" NOT NULL DEFAULT 'A_VENIR',
ADD COLUMN     "urlLive" TEXT;
