/**
 * ============================================================================
 * KOMPONEN BERSAMA & NAVBAR/DEMO UI - GAYA LANDING PAGE EWF
 * ============================================================================
 * Menggunakan Tailwind CSS tokens dari landing page (Plus Jakarta Sans,
 * orange-500/600, slate-900, rounded-3xl/xl/full, shadow-xl).
 * Status login hanya dibaca melalui window.EwfCareerAuthBridge.
 * ============================================================================
 */
(function (global, doc) {
    'use strict';

    function esc(str) {
        return String(str == null ? '' : str).replace(/[&<>"']/g, function (ch) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
        });
    }

    function getBridge() {
        return global.EwfCareerAuthBridge || null;
    }

    function getMock() {
        return global.EwfCareerMock || null;
    }

    function getUrls() {
        return global.EWF_CAREER_URLS || {};
    }

    var toastTimer = null;

    var EwfCareerUI = {
        /**
         * Kelas tombol standar mengikuti landing page.
         */
        buttonClass: function (variant) {
            if (variant === 'ghost') {
                return 'inline-flex items-center justify-center gap-2 bg-white hover:bg-orange-50/60 border border-gray-200 hover:border-orange-300 text-gray-800 font-bold px-5 py-2.5 rounded-xl text-sm transition duration-200 cursor-pointer';
            }
            if (variant === 'dark') {
                return 'inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md hover:-translate-y-0.5 transition duration-200 cursor-pointer';
            }
            return 'inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 cursor-pointer';
        },

        /**
         * Menampilkan notifikasi toast di bawah layar.
         */
        toast: function (message) {
            var el = doc.getElementById('ewfCareerToast');
            if (!el) {
                el = doc.createElement('div');
                el.id = 'ewfCareerToast';
                el.setAttribute('role', 'status');
                el.setAttribute('aria-live', 'polite');
                el.className = 'fixed left-1/2 bottom-6 -translate-x-1/2 translate-y-4 opacity-0 pointer-events-none z-[80] bg-slate-900 text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-xl shadow-xl border border-slate-700/60 transition-all duration-300 max-w-[90vw] text-center';
                doc.body.appendChild(el);
            }
            el.textContent = message;
            requestAnimationFrame(function () {
                el.classList.remove('translate-y-4', 'opacity-0');
                el.classList.add('translate-y-0', 'opacity-100');
            });
            clearTimeout(toastTimer);
            toastTimer = setTimeout(function () {
                el.classList.add('translate-y-4', 'opacity-0');
                el.classList.remove('translate-y-0', 'opacity-100');
            }, 3200);
        },

        /**
         * Menutup modal aktif (jika ada).
         */
        closeModal: function () {
            var existing = doc.getElementById('ewfCareerModalOverlay');
            if (existing) {
                existing.remove();
            }
            doc.body.classList.remove('overflow-hidden');
        },

        /**
         * Menampilkan modal reusable bergaya landing page.
         * Dapat ditutup via tombol X, klik area luar, dan tombol Esc.
         */
        modal: function (opts) {
            opts = opts || {};
            EwfCareerUI.closeModal();

            var overlay = doc.createElement('div');
            overlay.id = 'ewfCareerModalOverlay';
            overlay.className = 'fixed inset-0 z-[70] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto';

            var sizeClass = opts.lg ? 'max-w-xl' : 'max-w-md';
            var iconHtml = opts.icon
                ? '<div class="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 text-orange-500 flex items-center justify-center mx-auto mb-4">' + opts.icon + '</div>'
                : '';

            overlay.innerHTML =
                '<div class="relative w-full ' + sizeClass + ' bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 sm:p-8" role="dialog" aria-modal="true" aria-label="' + esc(opts.title || 'Informasi') + '">' +
                '  <button type="button" data-ewf-modal-close aria-label="Tutup" class="absolute right-4 top-4 w-9 h-9 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 flex items-center justify-center transition cursor-pointer">' +
                '    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>' +
                '  </button>' +
                iconHtml +
                '  <h3 class="text-xl font-extrabold text-gray-900 text-center tracking-tight mb-2">' + esc(opts.title || '') + '</h3>' +
                '  <div class="text-sm text-gray-600 leading-relaxed">' + (opts.body || '') + '</div>' +
                '  <div class="mt-6 flex flex-wrap items-center justify-center gap-3" data-ewf-modal-actions></div>' +
                '</div>';

            var actionsContainer = overlay.querySelector('[data-ewf-modal-actions]');
            var actions = opts.actions || [];
            actions.forEach(function (act) {
                var btn = doc.createElement(act.href ? 'a' : 'button');
                btn.className = EwfCareerUI.buttonClass(act.variant || 'primary');
                btn.textContent = act.label || 'OK';
                if (act.href) {
                    btn.href = act.href;
                } else {
                    btn.type = 'button';
                }
                if (act.id) btn.id = act.id;
                if (act.disabled) btn.disabled = true;
                btn.addEventListener('click', function () {
                    if (act.onClick && act.onClick(overlay, btn) === false) {
                        return;
                    }
                    if (!act.href) {
                        EwfCareerUI.closeModal();
                    }
                });
                actionsContainer.appendChild(btn);
            });

            overlay.querySelector('[data-ewf-modal-close]').addEventListener('click', EwfCareerUI.closeModal);
            overlay.addEventListener('mousedown', function (e) {
                if (e.target === overlay) {
                    EwfCareerUI.closeModal();
                }
            });

            doc.body.appendChild(overlay);
            doc.body.classList.add('overflow-hidden');

            var firstFocus = overlay.querySelector('button:not([disabled]), a, input');
            if (firstFocus) {
                firstFocus.focus();
            }
            return overlay;
        },

        /**
         * Menampilkan atau menghapus error inline pada wrapper field (.ewf-field).
         */
        setFieldError: function (fieldEl, message) {
            if (!fieldEl) return;
            var wrapper = fieldEl.classList && fieldEl.classList.contains('ewf-field')
                ? fieldEl
                : fieldEl.closest('.ewf-field');
            if (!wrapper) return;

            var input = wrapper.querySelector('input, select, textarea');
            var errEl = wrapper.querySelector('.ewf-err');
            var hasErr = !!message;

            if (input) {
                input.classList.toggle('border-rose-500', hasErr);
                input.classList.toggle('bg-rose-50/40', hasErr);
                input.classList.toggle('border-gray-200', !hasErr);
            }
            if (errEl) {
                errEl.textContent = message || '';
                errEl.classList.toggle('hidden', !hasErr);
            }
        },

        /**
         * Merender kotak centang "Saya bukan robot" (tampilan saja / mock).
         */
        renderCaptcha: function (container, options) {
            if (!container) return null;
            options = options || {};
            var isChecked = false;

            container.innerHTML =
                '<div class="ewf-captcha-wrap">' +
                '  <button type="button" class="ewf-captcha-btn flex items-center gap-3 w-full max-w-[290px] px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100/80 transition text-left cursor-pointer">' +
                '    <span class="ewf-captcha-box w-6 h-6 rounded-md border-2 border-gray-300 bg-white flex items-center justify-center shrink-0 transition"></span>' +
                '    <span class="text-xs sm:text-sm font-semibold text-gray-700">Saya bukan robot</span>' +
                '    <span class="ml-auto pl-3 border-l border-gray-200 flex flex-col items-center text-[9px] text-gray-400 font-medium leading-tight">' +
                '      <svg class="w-5 h-5 mb-0.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>' +
                '      Verifikasi' +
                '    </span>' +
                '  </button>' +
                '  <p class="ewf-captcha-err hidden text-xs text-rose-600 font-medium mt-1.5">Silakan centang kotak verifikasi terlebih dahulu.</p>' +
                '</div>';

            var btn = container.querySelector('.ewf-captcha-btn');
            var box = container.querySelector('.ewf-captcha-box');
            var err = container.querySelector('.ewf-captcha-err');

            btn.addEventListener('click', function () {
                if (isChecked) return;
                isChecked = true;
                box.classList.remove('border-gray-300', 'bg-white');
                box.classList.add('border-emerald-600', 'bg-emerald-600', 'text-white');
                box.innerHTML = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>';
                err.classList.add('hidden');
                if (typeof options.onVerify === 'function') {
                    options.onVerify(true);
                }
            });

            return {
                isVerified: function () {
                    return isChecked;
                },
                showError: function (show) {
                    err.classList.toggle('hidden', !show);
                }
            };
        },

        /**
         * Memperbarui navbar desktop & mobile berdasarkan status dari Auth Bridge.
         */
        initNavbar: function () {
            var bridge = getBridge();
            var urls = getUrls();
            if (!bridge) return;

            var loggedIn = bridge.isLoggedIn();
            var user = loggedIn ? bridge.user() : null;

            var desktopGuest = doc.getElementById('navGuestDesktop');
            var desktopAuth = doc.getElementById('navAuthDesktop');
            var mobileGuest = doc.getElementById('navGuestMobile');
            var mobileAuth = doc.getElementById('navAuthMobile');

            if (!loggedIn || !user) {
                if (desktopGuest) desktopGuest.classList.remove('hidden');
                if (desktopAuth) {
                    desktopAuth.classList.add('hidden');
                    desktopAuth.innerHTML = '';
                }
                if (mobileGuest) mobileGuest.classList.remove('hidden');
                if (mobileAuth) {
                    mobileAuth.classList.add('hidden');
                    mobileAuth.innerHTML = '';
                }
                return;
            }

            if (desktopGuest) desktopGuest.classList.add('hidden');
            if (mobileGuest) mobileGuest.classList.add('hidden');

            var avatarHtml = user.foto
                ? '<img src="' + esc(user.foto) + '" alt="' + esc(user.nama) + '" class="w-full h-full object-cover">'
                : '<span class="text-xs font-extrabold text-white">' + esc(user.inisial) + '</span>';

            if (desktopAuth) {
                desktopAuth.classList.remove('hidden');
                desktopAuth.innerHTML =
                    '<div class="relative" id="ewfUserDropdownWrap">' +
                    '  <button type="button" id="ewfUserMenuBtn" aria-haspopup="true" aria-expanded="false"' +
                    '    class="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full bg-white hover:bg-orange-50/70 border border-orange-200 text-gray-800 shadow-xs transition cursor-pointer">' +
                    '    <span class="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden shrink-0">' + avatarHtml + '</span>' +
                    '    <span class="text-xs sm:text-sm font-bold text-gray-900 max-w-[140px] truncate">' + esc(user.nama) + '</span>' +
                    '    <svg class="w-4 h-4 text-gray-500 transition-transform" data-ewf-chev fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>' +
                    '  </button>' +
                    '  <div id="ewfUserDropdown" role="menu" class="hidden absolute right-0 mt-2.5 w-56 bg-white rounded-2xl border border-gray-100 shadow-xl py-2 z-50">' +
                    '    <div class="px-4 py-2 border-b border-gray-100 mb-1">' +
                    '      <p class="text-xs font-bold text-gray-900 truncate">' + esc(user.nama) + '</p>' +
                    '      <p class="text-[11px] text-gray-500 truncate">' + esc(user.email) + '</p>' +
                    '    </div>' +
                    '    <a role="menuitem" href="' + esc(urls.profil || '#') + '" class="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition">Profil</a>' +
                    '    <a role="menuitem" href="' + esc(urls.riwayat || '#') + '" class="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition">Riwayat Lamaran</a>' +
                    '    <a role="menuitem" href="' + esc(urls.sandi || '#') + '" class="flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition">Ubah Sandi</a>' +
                    '    <hr class="my-1.5 border-gray-100">' +
                    '    <button type="button" role="menuitem" data-ewf-logout class="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs sm:text-sm font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer">Log Out</button>' +
                    '  </div>' +
                    '</div>';
            }

            if (mobileAuth) {
                mobileAuth.classList.remove('hidden');
                mobileAuth.innerHTML =
                    '<div class="pt-3 mt-1 border-t border-gray-100 space-y-2">' +
                    '  <div class="flex items-center gap-3 px-3 py-2 bg-orange-50/70 rounded-xl border border-orange-100">' +
                    '    <span class="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden shrink-0">' + avatarHtml + '</span>' +
                    '    <div class="min-w-0">' +
                    '      <p class="text-xs font-bold text-gray-900 truncate">' + esc(user.nama) + '</p>' +
                    '      <p class="text-[11px] text-gray-500 truncate">' + esc(user.email) + '</p>' +
                    '    </div>' +
                    '  </div>' +
                    '  <a href="' + esc(urls.profil || '#') + '" class="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">Profil</a>' +
                    '  <a href="' + esc(urls.riwayat || '#') + '" class="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">Riwayat Lamaran</a>' +
                    '  <a href="' + esc(urls.sandi || '#') + '" class="block px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">Ubah Sandi</a>' +
                    '  <button type="button" data-ewf-logout class="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-rose-600 hover:bg-rose-50 cursor-pointer">Log Out</button>' +
                    '</div>';
            }
        },

        /**
         * Merender panel kecil DEMO di pojok kiri bawah jika window.EWF_DEMO_ENABLED aktif.
         */
        initDemoPanel: function () {
            if (!global.EWF_DEMO_ENABLED) return;
            var existing = doc.getElementById('ewfDemoPanel');
            if (existing) existing.remove();

            var bridge = getBridge();
            var mock = getMock();
            if (!bridge || !mock) return;

            var loggedIn = bridge.isLoggedIn();
            var panel = doc.createElement('div');
            panel.id = 'ewfDemoPanel';
            panel.className = 'fixed left-4 bottom-4 z-[60] bg-slate-900/95 backdrop-blur-md text-white rounded-2xl px-3 py-2 flex flex-wrap items-center gap-2 text-xs shadow-xl border border-slate-700/80';
            panel.innerHTML =
                '<span class="font-extrabold text-orange-400 tracking-wider px-1">DEMO</span>' +
                (loggedIn
                    ? '<button type="button" data-demo-action="logout" class="px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 font-semibold transition cursor-pointer">Log out</button>'
                    : '<button type="button" data-demo-action="login" class="px-2.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold transition cursor-pointer">Simulasikan login</button>') +
                '<button type="button" data-demo-action="reset" class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-gray-200 font-semibold transition cursor-pointer">Reset data</button>';

            panel.addEventListener('click', function (e) {
                var btn = e.target.closest('[data-demo-action]');
                if (!btn) return;
                var action = btn.getAttribute('data-demo-action');

                if (action === 'login') {
                    mock.session.setUser({
                        email: 'pelamar@ewf-surabaya.id',
                        nama: 'Budi Santoso'
                    });
                    EwfCareerUI.initNavbar();
                    EwfCareerUI.initDemoPanel();
                    EwfCareerUI.toast('Simulasi login aktif sebagai Budi Santoso.');
                    return;
                }

                if (action === 'logout') {
                    bridge.logout();
                    EwfCareerUI.initNavbar();
                    EwfCareerUI.initDemoPanel();
                    EwfCareerUI.toast('Sesi simulasi telah keluar.');
                    return;
                }

                if (action === 'reset') {
                    mock.resetAll();
                    EwfCareerUI.initNavbar();
                    EwfCareerUI.initDemoPanel();
                    EwfCareerUI.toast('Semua data demo berhasil direset.');
                }
            });

            doc.body.appendChild(panel);
        }
    };

    // Event global untuk dropdown navbar, tombol logout, dan Esc modal
    doc.addEventListener('click', function (e) {
        var menuBtn = e.target.closest('#ewfUserMenuBtn');
        var dropdown = doc.getElementById('ewfUserDropdown');

        if (menuBtn && dropdown) {
            var willOpen = dropdown.classList.contains('hidden');
            dropdown.classList.toggle('hidden', !willOpen);
            menuBtn.setAttribute('aria-expanded', String(willOpen));
            var chev = menuBtn.querySelector('[data-ewf-chev]');
            if (chev) chev.classList.toggle('rotate-180', willOpen);
            return;
        }

        if (dropdown && !e.target.closest('#ewfUserDropdownWrap')) {
            dropdown.classList.add('hidden');
            var btn = doc.getElementById('ewfUserMenuBtn');
            if (btn) {
                btn.setAttribute('aria-expanded', 'false');
                var c = btn.querySelector('[data-ewf-chev]');
                if (c) c.classList.remove('rotate-180');
            }
        }

        var logoutBtn = e.target.closest('[data-ewf-logout]');
        if (logoutBtn) {
            var bridge = getBridge();
            var urls = getUrls();
            if (bridge) {
                bridge.logout(urls.beranda || '/');
            }
        }
    });

    doc.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            EwfCareerUI.closeModal();
            var dropdown = doc.getElementById('ewfUserDropdown');
            if (dropdown) dropdown.classList.add('hidden');
        }
    });

    doc.addEventListener('DOMContentLoaded', function () {
        EwfCareerUI.initNavbar();
        EwfCareerUI.initDemoPanel();
    });

    global.EwfCareerUI = EwfCareerUI;
})(window, document);
