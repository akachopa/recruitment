# Hireloop

Platform rekrutmen SaaS (MVP) dengan registrasi & onboarding lengkap untuk tiga peran:

- **Developer** — sandbox API key, stack, minat integrasi, webhook
- **Perusahaan** — akun organisasi, profil perusahaan, undangan tim, draft lowongan, paket
- **Pelamar** — profil karier, pendidikan, pengalaman, preferensi kerja, unggah CV

## Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Alur utama

| Jalur | URL |
|---|---|
| Pilih peran | `/daftar` |
| Registrasi developer | `/daftar/developer` |
| Registrasi perusahaan | `/daftar/perusahaan` |
| Registrasi pelamar | `/daftar/pelamar` |
| Onboarding | `/onboarding/{role}` |
| Dashboard | `/dashboard/{role}` |
| Masuk (demo) | `/masuk` |

Data sesi disimpan di `localStorage` (frontend MVP tanpa backend).
