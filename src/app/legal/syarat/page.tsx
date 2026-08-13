import { LegalLayout } from "@/components/LegalLayout";

export default function SyaratPage() {
  return (
    <LegalLayout title="Syarat Layanan">
      <p>
        Dengan membuat akun Hireloop, Anda setuju memakai platform sesuai hukum yang berlaku
        dan kebijakan penggunaan yang wajar untuk proses rekrutmen.
      </p>
      <p>
        Akun perusahaan bertanggung jawab atas data kandidat di dalam tenant mereka. Akun
        pelamar bertanggung jawab atas keakuratan data yang dikirimkan. Akun developer
        bertanggung jawab atas keamanan API key dan endpoint webhook.
      </p>
      <p>
        Hireloop menyediakan rekomendasi dan otomasi sebagai bantuan keputusan. Keputusan
        hire/reject tetap berada pada manusia (human-in-the-loop).
      </p>
      <p>
        Kami dapat menangguhkan akun yang menyalahgunakan sistem, mencoba akses lintas tenant,
        atau melanggar privasi kandidat.
      </p>
      <p className="text-xs">
        Terakhir diperbarui: Agustus 2026. Dokumen ini bersifat draft produk MVP.
      </p>
    </LegalLayout>
  );
}
