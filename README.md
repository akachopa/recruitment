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

## Alur autentikasi lengkap

1. Pilih peran di `/daftar`
2. Registrasi (konfirmasi sandi + consent syarat/privasi)
3. Verifikasi email di `/verifikasi-email` (kode demo: `123456`)
4. Onboarding multi-step sesuai peran
5. Dashboard peran

Tambahan:
- Masuk akun terdaftar: `/masuk`
- Lupa sandi: `/lupa-sandi` → `/reset-sandi`
- Legal: `/legal/syarat`, `/legal/privasi`

| Jalur | URL |
|---|---|
| Pilih peran | `/daftar` |
| Registrasi | `/daftar/{developer\|perusahaan\|pelamar}` |
| Verifikasi email | `/verifikasi-email` |
| Onboarding | `/onboarding/{role}` |
| Dashboard | `/dashboard/{role}` |
| Masuk | `/masuk` |
| Lupa sandi | `/lupa-sandi` |

Data akun & sesi disimpan di `localStorage` (frontend MVP tanpa backend).
