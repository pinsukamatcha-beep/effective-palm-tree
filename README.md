# HUT RI ke-81 — SMK Negeri 1 Adiwerna

Website statis bertema HUT Republik Indonesia ke-81 dengan desain modern dan elegan.

## Fitur
- Hero section interaktif
- Navigasi responsif
- Destinasi Indonesia
- Budaya Nusantara
- 🗺️ Peta Interaktif Indonesia — klik penanda wilayah untuk melihat budaya, makanan khas, dan rumah adat
- 🕰️ Timeline Kemerdekaan — sejarah interaktif (klik untuk buka detail)
- Countdown menuju HUT RI ke-82 (17 Agustus 2027)
- Quiz interaktif + simpan skor ke Leaderboard
- 🎮 Mini Game Kemerdekaan: Tangkap Bendera
- 🏆 Leaderboard (Quiz & Mini Game)
- 📸 Twibbon Generator HUT RI ke-81 — unggah foto, bingkai otomatis, unduh PNG
- ✍️ Wall of Wishes — tuliskan harapan untuk Indonesia
- 🎵 Musik latar ambient (tombol play/pause, default OFF)
- Animasi scroll
- Tombol kembali ke atas
- Mobile responsive
- Python development server tanpa dependensi eksternal

## Catatan teknis
- Fitur baru ada di `features.js` (terpisah dari `script.js` lama supaya rapi).
- Wall of Wishes dan Leaderboard memakai `localStorage` browser (per perangkat), karena situs ini statis tanpa database/backend. Kalau butuh data tergabung untuk semua pengunjung, perlu backend tambahan (mis. Firebase/Supabase).
- Peta Interaktif berbentuk ilustrasi jalur nusantara (SVG buatan sendiri), bukan peta geografis presisi, supaya ringan dan tidak bergantung pada aset eksternal.
- Musik latar dibuat dengan Web Audio API (nada ambient pentatonik), bukan file audio eksternal, supaya tidak ada risiko link putus.

## Menjalankan lokal
```bash
python server.py
```
Lalu buka `http://localhost:8000`.

## Deploy GitHub Pages
Repository ini dapat di-deploy sebagai static website. File utama adalah `index.html`.
