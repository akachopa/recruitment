import { LegalLayout } from "@/components/LegalLayout";

export default function PrivasiPage() {
  return (
    <LegalLayout title="Kebijakan Privasi">
      <p>
        Hireloop mengumpulkan data yang relevan untuk autentikasi, onboarding, dan proses
        rekrutmen: identitas akun, profil perusahaan/kandidat, dokumen CV, serta log aktivitas
        penting.
      </p>
      <p>
        Data kandidat bersifat privat per tenant perusahaan dan tidak dibagikan lintas
        organisasi tanpa dasar yang sah. Dokumen sensitif sebaiknya diminta pada tahap akhir
        bila diperlukan.
      </p>
      <p>
        Anda dapat meminta akses, koreksi, atau penghapusan data sesuai kebijakan retensi dan
        ketentuan hukum yang berlaku. Untuk MVP lokal, data disimpan di browser
        (`localStorage`) dan tidak dikirim ke server.
      </p>
      <p>
        AI insight hanya boleh didasarkan pada bukti dari CV, form, assessment, atau catatan
        wawancara—bukan atribut sensitif yang tidak relevan.
      </p>
      <p className="text-xs">
        Terakhir diperbarui: Agustus 2026. Dokumen ini bersifat draft produk MVP.
      </p>
    </LegalLayout>
  );
}
