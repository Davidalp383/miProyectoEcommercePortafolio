-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isOnOffer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "offerPrice" DOUBLE PRECISION;
