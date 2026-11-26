<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Route Fitur Karir (Front-End Mock M1 - M4)
|--------------------------------------------------------------------------
| Dipisahkan dari routes/web.php agar mudah di-merge.
| Halaman M2-M4 saat ini menampilkan placeholder "Segera hadir".
*/

Route::get('/lowongan/{slug}', function (string $slug) {
    return view('karir.placeholder', [
        'pageTitle' => 'Detail Lowongan',
        'badgeText' => 'Milestone 2',
        'heading' => 'Detail Lowongan',
        'description' => 'Halaman detail lowongan dan tombol melamar sedang disiapkan.',
    ]);
})->name('lowongan.detail');

Route::get('/pilih-jalur', function () {
    return view('karir.placeholder', [
        'pageTitle' => 'Pilih Jalur Pendaftaran',
        'badgeText' => 'Milestone 3',
        'heading' => 'Pilih Jalur Pendaftaran',
        'description' => 'Pemilihan jalur Pemagang atau Pekerja sedang disiapkan.',
    ]);
})->name('jalur');

Route::get('/profil/lengkapi', function () {
    return view('karir.placeholder', [
        'pageTitle' => 'Lengkapi Profil Resume',
        'badgeText' => 'Milestone 3',
        'heading' => 'Lengkapi Profil Resume',
        'description' => 'Formulir biodata, pendidikan, pengalaman, dan unggah dokumen sedang disiapkan.',
    ]);
})->name('profil.lengkapi');

Route::get('/profil', function () {
    return view('karir.placeholder', [
        'pageTitle' => 'Profil Pelamar',
        'badgeText' => 'Milestone 4',
        'heading' => 'Profil Pelamar',
        'description' => 'Ringkasan profil dan dokumen pelamar sedang disiapkan.',
    ]);
})->name('profil');

Route::get('/riwayat-lamaran', function () {
    return view('karir.placeholder', [
        'pageTitle' => 'Riwayat Lamaran',
        'badgeText' => 'Milestone 4',
        'heading' => 'Riwayat Lamaran',
        'description' => 'Daftar posisi yang pernah Anda lamar beserta statusnya sedang disiapkan.',
    ]);
})->name('lamaran.riwayat');

Route::get('/ubah-sandi', function () {
    return view('karir.placeholder', [
        'pageTitle' => 'Ubah Sandi',
        'badgeText' => 'Milestone 4',
        'heading' => 'Ubah Sandi',
        'description' => 'Pengaturan pembaruan kata sandi akun pelamar sedang disiapkan.',
    ]);
})->name('sandi');
