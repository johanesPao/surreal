-- CreateTable
CREATE TABLE "pengguna" (
    "id_pengguna" TEXT NOT NULL,
    "nama_pengguna" TEXT NOT NULL,
    "kata_kunci" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pengguna_pkey" PRIMARY KEY ("id_pengguna")
);

-- CreateTable
CREATE TABLE "penulis" (
    "id_penulis" TEXT NOT NULL,
    "nama_pena" TEXT NOT NULL,
    "id_pengguna" TEXT NOT NULL,

    CONSTRAINT "penulis_pkey" PRIMARY KEY ("id_penulis")
);

-- CreateTable
CREATE TABLE "tulisan" (
    "id_tulisan" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "dibuat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dimodifikasi" TIMESTAMP(3) NOT NULL,
    "id_pengguna" TEXT NOT NULL,
    "konten" TEXT,
    "diterbitkan" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tulisan_pkey" PRIMARY KEY ("id_tulisan")
);

-- CreateTable
CREATE TABLE "kategori" (
    "id_kategori" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "warna" TEXT NOT NULL,

    CONSTRAINT "kategori_pkey" PRIMARY KEY ("id_kategori")
);

-- CreateTable
CREATE TABLE "komentar" (
    "id_komentar" TEXT NOT NULL,
    "komentar" TEXT,
    "id_tulisan" TEXT NOT NULL,

    CONSTRAINT "komentar_pkey" PRIMARY KEY ("id_komentar")
);

-- CreateTable
CREATE TABLE "_KategoriToTulisan" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "pengguna_nama_pengguna_key" ON "pengguna"("nama_pengguna");

-- CreateIndex
CREATE UNIQUE INDEX "pengguna_email_key" ON "pengguna"("email");

-- CreateIndex
CREATE UNIQUE INDEX "penulis_id_pengguna_key" ON "penulis"("id_pengguna");

-- CreateIndex
CREATE UNIQUE INDEX "_KategoriToTulisan_AB_unique" ON "_KategoriToTulisan"("A", "B");

-- CreateIndex
CREATE INDEX "_KategoriToTulisan_B_index" ON "_KategoriToTulisan"("B");

-- AddForeignKey
ALTER TABLE "penulis" ADD CONSTRAINT "penulis_id_pengguna_fkey" FOREIGN KEY ("id_pengguna") REFERENCES "pengguna"("id_pengguna") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tulisan" ADD CONSTRAINT "tulisan_id_pengguna_fkey" FOREIGN KEY ("id_pengguna") REFERENCES "pengguna"("id_pengguna") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "komentar" ADD CONSTRAINT "komentar_id_tulisan_fkey" FOREIGN KEY ("id_tulisan") REFERENCES "tulisan"("id_tulisan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KategoriToTulisan" ADD CONSTRAINT "_KategoriToTulisan_A_fkey" FOREIGN KEY ("A") REFERENCES "kategori"("id_kategori") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KategoriToTulisan" ADD CONSTRAINT "_KategoriToTulisan_B_fkey" FOREIGN KEY ("B") REFERENCES "tulisan"("id_tulisan") ON DELETE CASCADE ON UPDATE CASCADE;
