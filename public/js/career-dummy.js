/**
 * ============================================================================
 * DATA CONTOH (DUMMY) LOWONGAN KERJA & MAGANG - PT EQUITYWORLD FUTURES
 * ============================================================================
 * CATATAN PENTING:
 * File ini hanya berisi DATA CONTOH (DUMMY) untuk kebutuhan tampilan & alur
 * front-end sebelum terhubung dengan database/controller Laravel.
 *
 * GANTI DENGAN BACKEND:
 * Saat integrasi backend, hapus atau abaikan file ini dan ambil data lowongan
 * langsung dari database melalui Controller / API endpoint Laravel.
 * ============================================================================
 */
(function (global) {
    'use strict';

    global.EWF_DUMMY_JOBS = [
        {
            slug: 'staf-back-office',
            judul: 'Staf Back Office',
            tipe: 'kerja',
            divisi: 'Operasional',
            lokasi: 'Surabaya, Jawa Timur',
            deskripsi: 'Mengelola administrasi dan pencatatan transaksi harian agar operasional kantor cabang berjalan rapi, akurat, dan sesuai regulasi.',
            tanggungJawab: [
                'Mengelola dokumen dan pencatatan transaksi harian nasabah',
                'Menyusun laporan operasional harian dan bulanan secara berkala',
                'Berkoordinasi dengan tim kepatuhan dan keuangan terkait administrasi'
            ],
            kualifikasi: [
                'Pendidikan minimal D3/S1 semua jurusan',
                'Teliti, rapi, dan mampu bekerja dengan tenggat waktu',
                'Menguasai Microsoft Office, terutama Excel',
                'Pengalaman di bidang administrasi atau perbankan/keuangan menjadi nilai tambah'
            ],
            tanggalPosting: '2026-11-18',
            batasPendaftaran: '2026-12-31'
        },
        {
            slug: 'customer-service',
            judul: 'Customer Service',
            tipe: 'kerja',
            divisi: 'Layanan Nasabah',
            lokasi: 'Surabaya, Jawa Timur',
            deskripsi: 'Menjadi garda terdepan dalam melayani pertanyaan, edukasi dasar, dan kebutuhan nasabah dengan komunikasi yang profesional dan ramah.',
            tanggungJawab: [
                'Menjawab pertanyaan nasabah melalui telepon, WhatsApp, dan email resmi',
                'Mencatat serta menindaklanjuti masukan maupun kendala nasabah',
                'Menyampaikan informasi produk dan prosedur layanan secara jelas'
            ],
            kualifikasi: [
                'Pendidikan minimal D3/S1 semua jurusan',
                'Kemampuan komunikasi lisan dan tulisan yang baik, ramah, serta sabar',
                'Mampu bekerja sama dalam tim',
                'Bersedia ditempatkan di kantor cabang Praxis Surabaya'
            ],
            tanggalPosting: '2026-11-15',
            batasPendaftaran: '2026-12-20'
        },
        {
            slug: 'staf-pemasaran-digital',
            judul: 'Staf Pemasaran Digital',
            tipe: 'kerja',
            divisi: 'Pemasaran',
            lokasi: 'Surabaya, Jawa Timur',
            deskripsi: 'Merencanakan dan mengeksekusi konten edukasi finansial serta kampanye digital untuk memperluas jangkauan calon nasabah.',
            tanggungJawab: [
                'Menyusun kalender editorial dan materi konten media sosial resmi',
                'Mengelola kampanye iklan digital serta mengevaluasi performanya',
                'Menganalisis metrik audiens untuk meningkatkan konversi kampanye'
            ],
            kualifikasi: [
                'Pendidikan minimal S1 Ilmu Komunikasi, Pemasaran, atau bidang terkait',
                'Memahami dasar strategi media sosial dan periklanan digital',
                'Kreatif dan terbiasa menggunakan perangkat desain sederhana'
            ],
            tanggalPosting: '2026-11-10',
            batasPendaftaran: '2027-01-15'
        },
        {
            slug: 'magang-administrasi-operasional',
            judul: 'Magang Administrasi & Operasional',
            tipe: 'magang',
            divisi: 'Operasional',
            lokasi: 'Surabaya, Jawa Timur',
            deskripsi: 'Program magang untuk mempelajari langsung alur administrasi, pengarsipan, dan operasional perusahaan pialang berjangka.',
            tanggungJawab: [
                'Membantu pengarsipan dokumen dan pendataan administrasi harian',
                'Membantu penyusunan laporan operasional sederhana',
                'Mendukung kebutuhan koordinasi tim operasional kantor'
            ],
            kualifikasi: [
                'Mahasiswa aktif D3/S1 semua jurusan',
                'Memiliki surat pengantar resmi dari perguruan tinggi',
                'Bersedia menjalani masa magang minimal 3 bulan',
                'Teliti, komunikatif, dan memiliki kemauan belajar tinggi'
            ],
            tanggalPosting: '2026-11-20',
            batasPendaftaran: '2026-12-25'
        },
        {
            slug: 'magang-it-pengembangan-web',
            judul: 'Magang IT & Pengembangan Web',
            tipe: 'magang',
            divisi: 'Teknologi Informasi',
            lokasi: 'Surabaya, Jawa Timur',
            deskripsi: 'Terlibat langsung dalam pengembangan antarmuka web, pemeliharaan sistem internal, dan pengujian aplikasi perusahaan.',
            tanggungJawab: [
                'Membantu pengembangan halaman web serta komponen antarmuka',
                'Membantu pengujian fitur dan perbaikan bug aplikasi internal',
                'Mendokumentasikan hasil pengembangan teknis secara rapi'
            ],
            kualifikasi: [
                'Mahasiswa aktif Sistem Informasi, Teknik Informatika, atau sejenisnya',
                'Memahami dasar HTML, CSS, JavaScript, dan PHP/Laravel',
                'Memiliki surat pengantar resmi dari perguruan tinggi',
                'Bersedia magang minimal 3 bulan di Surabaya'
            ],
            tanggalPosting: '2026-11-12',
            batasPendaftaran: '2027-01-10'
        },
        {
            slug: 'magang-analis-pasar',
            judul: 'Magang Analis Pasar',
            tipe: 'magang',
            divisi: 'Riset & Analisis',
            lokasi: 'Surabaya, Jawa Timur',
            deskripsi: 'Belajar membaca pergerakan pasar komoditi dan valuta asing serta menyusun ringkasan analisis bersama analis senior.',
            tanggungJawab: [
                'Mengumpulkan dan merapikan data pergerakan harga komoditi harian',
                'Menyusun ringkasan berita ekonomi dan materi presentasi singkat',
                'Membantu tim riset dalam pembuatan laporan analisis berkala'
            ],
            kualifikasi: [
                'Mahasiswa aktif Manajemen, Akuntansi, Ekonomi, atau sejenisnya',
                'Menyukai angka, riset ekonomi, dan analisis data',
                'Memiliki surat pengantar resmi dari perguruan tinggi'
            ],
            tanggalPosting: '2026-11-08',
            batasPendaftaran: '2027-01-05'
        }
    ];
})(window);
