/**
 * ============================================================================
 * AUTH BRIDGE - PENGHUBUNG STATUS LOGIN UNTUK HALAMAN KARIR & NAVBAR
 * ============================================================================
 * SAAT MERGE: ganti isi bridge ini dengan data auth asli (mis. @auth + data
 * user Laravel). Jangan ubah halaman lain.
 *
 * Semua halaman karir dan komponen navbar HANYA memakai modul ini untuk
 * mengetahui apakah pelamar sedang masuk, mengambil data profil ringkas,
 * dan melakukan keluar (logout).
 * ============================================================================
 */
(function (global) {
    'use strict';

    function getMock() {
        return global.EwfCareerMock || null;
    }

    function computeInitials(nama, email) {
        var source = (nama || email || 'P').trim();
        var parts = source.split(/\s+/).filter(Boolean);
        if (parts.length >= 2) {
            return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
        }
        return source.charAt(0).toUpperCase();
    }

    var EwfCareerAuthBridge = {
        /**
         * Mengembalikan true jika pengguna saat ini berstatus login.
         * SAAT MERGE: ganti isi bridge ini dengan data auth asli (mis. @auth + data user Laravel). Jangan ubah halaman lain.
         */
        isLoggedIn: function () {
            var mock = getMock();
            return !!(mock && mock.session.get());
        },

        /**
         * Mengembalikan objek user { nama, email, foto, inisial } atau null jika belum login.
         * SAAT MERGE: ganti isi bridge ini dengan data auth asli (mis. @auth + data user Laravel). Jangan ubah halaman lain.
         */
        user: function () {
            var mock = getMock();
            if (!mock) {
                return null;
            }
            var session = mock.session.get();
            if (!session) {
                return null;
            }
            var profile = mock.profile.get(session.email) || {};
            var nama = (profile.bio && profile.bio.nama) || session.nama || session.email.split('@')[0];
            var foto = profile.avatar || session.foto || null;

            return {
                nama: nama,
                email: session.email,
                foto: foto,
                inisial: computeInitials(nama, session.email)
            };
        },

        /**
         * Menghapus sesi pengguna aktif dan mengarahkan kembali ke beranda.
         * SAAT MERGE: ganti isi bridge ini dengan data auth asli (mis. @auth + data user Laravel). Jangan ubah halaman lain.
         */
        logout: function (redirectUrl) {
            var mock = getMock();
            if (mock) {
                mock.session.clear();
            }
            if (redirectUrl) {
                global.location.href = redirectUrl;
            }
        }
    };

    global.EwfCareerAuthBridge = EwfCareerAuthBridge;
})(window);
