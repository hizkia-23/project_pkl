/**
 * ============================================================================
 * LAPISAN MOCK API KARIR (BERBASIS localStorage)
 * ============================================================================
 * Seluruh akses penyimpanan sementara (sesi contoh, profil per email, lamaran,
 * dan data lowongan) dipusatkan di file ini.
 * Halaman Blade dan modul UI TIDAK boleh mengakses localStorage secara langsung.
 * ============================================================================
 */
(function (global) {
    'use strict';

    var STORAGE_PREFIX = 'ewf_karir_';

    function readStore(key, fallback) {
        try {
            var raw = global.localStorage.getItem(STORAGE_PREFIX + key);
            return raw ? JSON.parse(raw) : fallback;
        } catch (err) {
            return fallback;
        }
    }

    function writeStore(key, value) {
        try {
            global.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
        } catch (err) {
            // Abaikan error kuota penyimpanan pada mode privat/terbatas
        }
    }

    function removeStore(key) {
        try {
            global.localStorage.removeItem(STORAGE_PREFIX + key);
        } catch (err) {
            // Abaikan error penyimpanan
        }
    }

    function resolveEmail(email) {
        if (email) {
            return String(email).trim().toLowerCase();
        }
        var current = readStore('session', null);
        return current && current.email ? String(current.email).trim().toLowerCase() : null;
    }

    var EwfCareerMock = {
        /**
         * Manajemen sesi pengguna sementara (tanpa halaman login).
         */
        session: {
            // GANTI DENGAN BACKEND: Ambil user login aktif dari Laravel Auth (Auth::user())
            get: function () {
                return readStore('session', null);
            },

            // GANTI DENGAN BACKEND: Diisi otomatis oleh sistem autentikasi Laravel
            setUser: function (userData) {
                var email = userData && userData.email ? String(userData.email).trim().toLowerCase() : 'pelamar@ewf-surabaya.id';
                var nama = userData && userData.nama ? String(userData.nama).trim() : email.split('@')[0];
                var foto = userData && userData.foto ? userData.foto : null;
                var sessionPayload = {
                    email: email,
                    nama: nama,
                    foto: foto,
                    loggedInAt: new Date().toISOString()
                };
                writeStore('session', sessionPayload);
                return sessionPayload;
            },

            // GANTI DENGAN BACKEND: Kirim POST ke route logout Laravel
            clear: function () {
                removeStore('session');
            }
        },

        /**
         * Manajemen profil pelamar tersimpan per email.
         */
        profile: {
            // GANTI DENGAN BACKEND: GET /api/karir/profil
            get: function (email) {
                var targetEmail = resolveEmail(email);
                if (!targetEmail) {
                    return {};
                }
                var allProfiles = readStore('profiles', {});
                return allProfiles[targetEmail] || {};
            },

            // GANTI DENGAN BACKEND: PUT/PATCH /api/karir/profil/draft
            saveDraft: function (data, email) {
                var targetEmail = resolveEmail(email);
                if (!targetEmail) {
                    return null;
                }
                var allProfiles = readStore('profiles', {});
                var existing = allProfiles[targetEmail] || {};
                var merged = Object.assign({}, existing, data || {}, {
                    updatedAt: new Date().toISOString()
                });
                allProfiles[targetEmail] = merged;
                writeStore('profiles', allProfiles);
                return merged;
            },

            // GANTI DENGAN BACKEND: POST /api/karir/profil/selesai
            complete: function (data, email) {
                var targetEmail = resolveEmail(email);
                if (!targetEmail) {
                    return null;
                }
                var saved = EwfCareerMock.profile.saveDraft(
                    Object.assign({}, data || {}, { selesai: true }),
                    targetEmail
                );
                return saved;
            }
        },

        /**
         * Manajemen lamaran pelamar tersimpan per email.
         */
        applications: {
            // GANTI DENGAN BACKEND: GET /api/karir/lamaran
            list: function (email) {
                var targetEmail = resolveEmail(email);
                if (!targetEmail) {
                    return [];
                }
                var allApps = readStore('applications', {});
                return allApps[targetEmail] || [];
            },

            // GANTI DENGAN BACKEND: Cek status lamaran dari database
            sudahDilamar: function (slug, email) {
                if (!slug) {
                    return false;
                }
                var apps = EwfCareerMock.applications.list(email);
                return apps.some(function (item) {
                    return item.slug === slug;
                });
            },

            // GANTI DENGAN BACKEND: POST /api/karir/lowongan/{slug}/lamar
            apply: function (slug, email) {
                var targetEmail = resolveEmail(email);
                if (!targetEmail || !slug) {
                    return { ok: false, message: 'Sesi pengguna atau lowongan tidak valid.' };
                }
                if (EwfCareerMock.applications.sudahDilamar(slug, targetEmail)) {
                    return { ok: false, message: 'Anda sudah melamar posisi ini sebelumnya.' };
                }
                var allApps = readStore('applications', {});
                var list = allApps[targetEmail] || [];
                var entry = {
                    slug: slug,
                    tanggalLamar: new Date().toISOString(),
                    status: 'Terkirim'
                };
                list.unshift(entry);
                allApps[targetEmail] = list;
                writeStore('applications', allApps);
                return { ok: true, data: entry };
            }
        },

        /**
         * Data lowongan pekerjaan & magang.
         */
        jobs: {
            // GANTI DENGAN BACKEND: GET /api/karir/lowongan
            list: function (filter) {
                var items = Array.isArray(global.EWF_DUMMY_JOBS) ? global.EWF_DUMMY_JOBS.slice() : [];
                if (!filter) {
                    return items;
                }
                var q = (filter.q || '').trim().toLowerCase();
                var tipe = (filter.tipe || '').trim().toLowerCase();

                return items.filter(function (job) {
                    var cocokTipe = !tipe || job.tipe === tipe;
                    var teks = (job.judul + ' ' + job.divisi + ' ' + job.lokasi).toLowerCase();
                    var cocokKata = !q || teks.indexOf(q) !== -1;
                    return cocokTipe && cocokKata;
                });
            },

            // GANTI DENGAN BACKEND: GET /api/karir/lowongan/{slug}
            detail: function (slug) {
                var items = Array.isArray(global.EWF_DUMMY_JOBS) ? global.EWF_DUMMY_JOBS : [];
                for (var i = 0; i < items.length; i++) {
                    if (items[i].slug === slug) {
                        return items[i];
                    }
                }
                return null;
            }
        },

        /**
         * Reset seluruh data demo di localStorage.
         */
        // GANTI DENGAN BACKEND: Hapus helper reset ini saat rilis produksi
        resetAll: function () {
            removeStore('session');
            removeStore('profiles');
            removeStore('applications');
        }
    };

    global.EwfCareerMock = EwfCareerMock;
})(window);
