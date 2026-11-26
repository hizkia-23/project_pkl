<?php

use App\Http\Controllers\Admin\EmployeeController;
use App\Http\Controllers\Admin\InternController;
use App\Http\Controllers\Applicant\ApplicationController;
use App\Http\Controllers\Applicant\JobOpeningController;
use App\Http\Controllers\Applicant\ProfileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Admin\ApplicantManagementController;
use App\Http\Controllers\Admin\CalonNasabahController;
use App\Http\Controllers\Admin\CertificateController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Operator\AdminController;
use App\Models\JobOpening;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    try {
        $jobOpenings = JobOpening::open()
            ->orderBy('deadline')
            ->orderBy('id')
            ->get();
    } catch (Throwable) {
        $jobOpenings = collect();
    }

    return view('welcome', compact('jobOpenings'));
})->name('beranda');

Route::get('/tentang', function () {
    return view('about');
})->name('tentang');

// Rute Fitur Otentikasi & Akun Demo
Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'login')->name('login');
    Route::get('/register', 'register')->name('register');
    Route::get('/verifikasi', 'verify')->name('verifikasi');
    Route::get('/pendaftaran-berhasil', 'done')->name('pendaftaran.berhasil');
    Route::get('/lupa-password', 'forgotPassword')->name('lupa-password');
    Route::get('/reset-password', 'resetPassword')->name('reset-password');
});

Route::get('/peluang-karir', function () {
    return view('karir');
})->name('karir');

Route::middleware('guest')->group(function (): void {
    Route::get('/verifikasi', [AuthController::class, 'verify'])->name('verifikasi');
    Route::get('/pendaftaran-berhasil', [AuthController::class, 'done'])->name('pendaftaran.berhasil');
});

// Rute Landingpage Ke Halaman Login
Route::get('/login', function () {
    return view('auth.login');
})->name('login');

Route::middleware('auth')->group(function (): void {
    Route::middleware('role:magang,karyawan')->prefix('pelamar')->name('applicant.')->group(function (): void {
        Route::get('/profil', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('/profil', [ProfileController::class, 'update'])->name('profile.update');
        Route::get('/lowongan', [JobOpeningController::class, 'index'])->name('jobs.index');
        Route::post('/lowongan/{jobOpening}/lamar', [JobOpeningController::class, 'apply'])->name('jobs.apply');
        Route::get('/lamaran', [ApplicationController::class, 'index'])->name('applications.index');
        Route::get('/lamaran/{application}', [ApplicationController::class, 'show'])->name('applications.show');
        Route::post('/lamaran/{application}/dokumen', [ApplicationController::class, 'storeDocument'])
            ->name('applications.documents.store');
        Route::post('/lamaran/{application}/kirim', [ApplicationController::class, 'submit'])
            ->name('applications.submit');
    });

    Route::get('/dokumen-lamaran/{document}', [ApplicationController::class, 'download'])
        ->name('application-documents.download');

    Route::get('/operator/dashboard', fn () => view('dashboards.operator'))
        ->middleware('role:operator')
        ->name('operator.dashboard');

    Route::get('/admin/dashboard', function () {
        $pendingReviewCount = \App\Models\Application::query()
            ->where('status', 'submitted')
            ->count();
        $interviewCount = \App\Models\Application::query()
            ->where('status', 'interview')
            ->count();
        $acceptedThisMonthCount = \App\Models\Application::query()
            ->where('status', 'accepted')
            ->whereBetween('reviewed_at', [now()->startOfMonth(), now()->endOfMonth()])
            ->count();

        return view('dashboards.admin', [
            'pendingReviewCount' => $pendingReviewCount,
            'interviewCount' => $interviewCount,
            'acceptedThisMonthCount' => $acceptedThisMonthCount,
        ]);
    })
        ->middleware('role:admin,operator')
        ->name('admin.dashboard');
    // ================= MODUL PORTAL ADMIN =================
    Route::middleware('role:admin,operator')->prefix('admin')->name('admin.')->group(function (): void {
        // 1. Beranda Eksekutif (EIS)
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // 2. Calon Nasabah
        Route::get('/calon-nasabah', [CalonNasabahController::class, 'index'])->name('calon-nasabah.index');
        Route::post('/calon-nasabah', [CalonNasabahController::class, 'store'])->name('calon-nasabah.store');

        // 3. Pendaftar Magang & Fulltime
        Route::get('/pendaftar', [ApplicantManagementController::class, 'index'])->name('pendaftar.index');
        Route::patch('/pendaftar/{application}/status', [ApplicantManagementController::class, 'updateStatus'])
            ->name('pendaftar.update-status');

        // 4. Sertifikat
        Route::get('/sertifikat', [CertificateController::class, 'index'])->name('sertifikat.index');
        Route::post('/sertifikat/{id}/terbitkan', [CertificateController::class, 'issue'])
            ->name('sertifikat.issue');

        // 5. Pengaturan Akun & Profil
        Route::get('/pengaturan', [SettingController::class, 'index'])->name('pengaturan.index');
        Route::put('/pengaturan/profil', [SettingController::class, 'updateProfile'])->name('pengaturan.profile');
        Route::put('/pengaturan/password', [SettingController::class, 'updatePassword'])->name('pengaturan.password');
    });

    Route::prefix('admin')->name('admin.')->middleware('role:admin,operator')->group(function (): void {
        Route::get('/applications', [App\Http\Controllers\Admin\ApplicationController::class, 'index'])->name('applications.index');
        Route::get('/applications/{application}', [App\Http\Controllers\Admin\ApplicationController::class, 'show'])->name('applications.show');
        Route::post('/applications/{application}/reveal-nik', [App\Http\Controllers\Admin\ApplicationController::class, 'revealNik'])->name('applications.reveal-nik');
        Route::get('/applications/{application}/whatsapp', [App\Http\Controllers\Admin\ApplicationController::class, 'whatsapp'])->name('applications.whatsapp');
        Route::post('/applications/{application}/transition', [App\Http\Controllers\Admin\ApplicationController::class, 'transition'])->name('applications.transition');
        Route::post('/applications/{application}/reject', [App\Http\Controllers\Admin\ApplicationController::class, 'reject'])->name('applications.reject');

        Route::get('/jobs', [App\Http\Controllers\Admin\JobOpeningController::class, 'index'])->name('jobs.index');
        Route::get('/jobs/create', [App\Http\Controllers\Admin\JobOpeningController::class, 'create'])->name('jobs.create');
        Route::post('/jobs', [App\Http\Controllers\Admin\JobOpeningController::class, 'store'])->name('jobs.store');
        Route::get('/jobs/{jobOpening}/edit', [App\Http\Controllers\Admin\JobOpeningController::class, 'edit'])->name('jobs.edit');
        Route::put('/jobs/{jobOpening}', [App\Http\Controllers\Admin\JobOpeningController::class, 'update'])->name('jobs.update');
        Route::patch('/jobs/{jobOpening}/toggle', [App\Http\Controllers\Admin\JobOpeningController::class, 'toggle'])->name('jobs.toggle');
        Route::delete('/jobs/{jobOpening}', [App\Http\Controllers\Admin\JobOpeningController::class, 'destroy'])->name('jobs.destroy');

        Route::get('/employees', [EmployeeController::class, 'index'])->name('employees.index');
        Route::get('/interns', [InternController::class, 'index'])->name('interns.index');
        Route::get('/intern-placements/{placement}/edit', [InternController::class, 'edit'])->name('interns.placements.edit');
        Route::put('/intern-placements/{placement}', [InternController::class, 'update'])->name('interns.placements.update');
    });

    Route::get('/magang/dashboard', fn () => view('dashboards.magang'))
        ->middleware('role:magang')
        ->name('magang.dashboard');

    Route::get('/karyawan/dashboard', fn () => view('dashboards.karyawan'))
        ->middleware('role:karyawan')
        ->name('karyawan.dashboard');

    Route::prefix('operator')->name('operator.')->middleware('role:operator')->group(function (): void {
        Route::resource('admins', AdminController::class)
            ->except(['show'])
            ->parameters(['admins' => 'user']);
    });
});

// require __DIR__ . '/auth.php';
require __DIR__ . '/karir.php';
