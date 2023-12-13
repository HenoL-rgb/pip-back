/*
  Warnings:

  - The primary key for the `Sale` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Sale_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Sale_apartmentId_productId_idx" ON "Sale"("apartmentId", "productId");
