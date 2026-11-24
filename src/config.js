// ======= EDIT DATA UNDANGAN DI SINI SAJA =======
const I = (n) => `/images/${n}.webp`;
export const data = {
  groom: { nick: "Andika", full: "Andika Pratama, S.T.", parents: "Putra dari Bpk. Hendra & Ibu Sari", photo: I("groom") },
  bride: { nick: "Putri", full: "Putri Anindya, S.Pd.", parents: "Putri dari Bpk. Budi & Ibu Ratna", photo: I("bride") },
  weddingDate: "2026-12-26T08:00:00+07:00", // YYYY-MM-DDTHH:mm:ss+07:00
  dateText: "26 . 12 . 2026",
  events: [
    { title: "Akad Nikah", date: "Sabtu, 26 Desember 2026", time: "08.00 - 10.00 WIB", place: "Masjid Al-Ikhlas", address: "Jl. Melati No. 10, Jakarta", map: "https://maps.google.com" },
    { title: "Resepsi", date: "Sabtu, 26 Desember 2026", time: "11.00 - 14.00 WIB", place: "Gedung Serbaguna Mawar", address: "Jl. Anggrek No. 5, Jakarta", map: "https://maps.google.com" },
  ],
  story: [
    { date: "Agustus 2021", title: "Pertama Bertemu", text: "Kami dipertemukan lewat sebuah acara kampus. Dari obrolan singkat, tumbuh rasa nyaman.", photo: I("g3") },
    { date: "Maret 2024", title: "Lamaran", text: "Dengan restu keluarga, Andika melamar Putri dalam acara sederhana yang penuh haru.", photo: I("g4") },
    { date: "Desember 2026", title: "Menikah", text: "Insya Allah kami melangkah ke jenjang pernikahan, dan ingin Anda hadir bersama kami.", photo: I("g5") },
  ],
  gallery: ["g1", "g2", "g3", "g4", "g5", "bride"].map(I),
  gifts: [{ bank: "BCA", number: "1234567890", name: "Andika Pratama" }],
  music: "/l1.mp3", // ganti ke .mp3 agar jalan di iPhone: "/lagu.mp3"
  ayat: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.",
  ayatSrc: "QS. Ar-Rum: 21",
};
