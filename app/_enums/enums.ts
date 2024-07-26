export enum EUkuran {
  KCL = "kecil",
  SDG = "sedang",
  BSR = "besar",
}

export enum EWarna {
  TEKS = "#F6F1F1",
  PRIMER = "#242424",
  SEKUNDER = "#AFD3E2",
  TERSIER = "#19A7CE",
  KUARTENER = "#146C94",
}

export enum EKonstan {
  JEDA_TEKS_KETIKAN = 35,
  JEDA_ARRAY_TEKS_KETIKAN = JEDA_TEKS_KETIKAN * 3,
  JEDA_LOOP_TEKS_KETIKAN = JEDA_TEKS_KETIKAN * 30,
  KECEPATAN_HAPUS_TEKS_KETIKAN = 20,
}

export enum EAlignmentRentangWaktu {
  KIRI = "left",
  KANAN = "right",
}

export enum EWaktuKonversiMS {
  DETIK = 1000,
  MENIT = DETIK * 60,
  JAM = MENIT * 60,
  HARI = JAM * 24,
}

export enum EModeKontak {
  TELP = "phone",
  EMAIL = "email",
  GMAIL = "gmail",
  X = "x",
  INSTAGRAM = "instagram",
  TIKTOK = "tiktok",
  DISCORD = "discord",
  SLACK = "slack",
  DOCKER = "docker",
  GITHUB = "github",
}

export enum EModeBahasa {
  TS = "typescript",
  PYTHON = "python",
  RUST = "rust",
  JSON = "json",
  SQL = "sql",
}

export enum EResponGitHub {
  GITHUB_COMMIT,
  GITHUB_NOT_FOUND,
  GITHUB_FORMAT_UNKNOWN,
}

export enum EGithubRepoPrivacy {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum AuthError {
  OAuthCallbackError = "OAuthCallbackError",
  Configuration = "Configuration",
}
