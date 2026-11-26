<!DOCTYPE html>
<html lang="id" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'PT Equityworld Futures | Pialang Berjangka Resmi')</title>

    <!-- Google Font: Plus Jakarta Sans & Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
                    },
                    colors: {
                        brand: {
                            50: '#fff7ed',
                            100: '#ffedd5',
                            200: '#fed7aa',
                            300: '#fdba74',
                            400: '#fb923c',
                            500: '#f97316',
                            600: '#ea580c',
                            700: '#c2410c',
                            800: '#9a3412',
                            900: '#7c2d12',
                        },
                        navy: {
                            900: '#0b1329',
                            950: '#070c1b',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        body {
            font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
        }

        /* ================= ENTRANCE & SCROLL ANIMATIONS ================= */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(24px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.94);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes gentleFloat {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-6px);
            }
        }

        /* On-Load Utility Classes */
        .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-fade-in-down {
            animation: fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-fade-in-scale {
            animation: fadeInScale 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-float {
            animation: gentleFloat 5s ease-in-out infinite;
        }

        /* Stagger Delays for Load */
        .animation-delay-100 { animation-delay: 100ms; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-400 { animation-delay: 400ms; }

        /* Scroll-Triggered Reveal Animation */
        .reveal {
            opacity: 0;
            transform: translateY(28px);
            transition: opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
        }

        .reveal.is-revealed {
            opacity: 1;
            transform: translateY(0);
        }

        .reveal-scale {
            opacity: 0;
            transform: scale(0.94);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
        }

        .reveal-scale.is-revealed {
            opacity: 1;
            transform: scale(1);
        }

        /* Reveal Stagger Delays */
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
        .delay-400 { transition-delay: 400ms; }

        /* Accessibility: Respect Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
            .animate-fade-in-up,
            .animate-fade-in-down,
            .animate-fade-in-scale,
            .animate-float,
            .reveal,
            .reveal-scale {
                animation: none !important;
                transition: none !important;
                opacity: 1 !important;
                transform: none !important;
            }
        }
    </style>
</head>

<body class="bg-white text-gray-800 antialiased overflow-x-hidden min-h-screen flex flex-col justify-between">

    <!-- ================= NAVBAR (FLOATING PILL) ================= -->
    <header class="fixed top-0 left-0 w-full z-50 pt-4 px-4 sm:px-6 lg:px-8">
        <nav class="max-w-7xl mx-auto bg-white/90 backdrop-blur-md rounded-full px-4 py-2 sm:px-6 sm:py-3 flex justify-between items-center shadow-sm border border-orange-200">
            <!-- Brand Logo -->
            <a href="{{ route('beranda') }}" class="flex items-center space-x-2.5">
                <img src="{{ asset('assets/logo_ewf-removebg-preview-1.png') }}" alt="Logo PT Equityworld Futures"
                    class="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
                <span class="font-bold text-gray-900 text-sm sm:text-base tracking-tight">PT Equityworld Futures</span>
            </a>

            <!-- Navigation Links (Desktop) -->
            <div class="hidden md:flex items-center space-x-8 text-sm">
                <a href="{{ route('beranda') }}"
                    class="transition-colors duration-200 {{ request()->routeIs('beranda') ? 'text-gray-900 font-bold border-b-2 border-orange-500 pb-0.5' : 'text-gray-600 hover:text-orange-600 font-medium' }}">
                    Beranda
                </a>
                <a href="{{ route('tentang') }}"
                    class="transition-colors duration-200 {{ request()->routeIs('tentang') ? 'text-gray-900 font-bold border-b-2 border-orange-500 pb-0.5' : 'text-gray-600 hover:text-orange-600 font-medium' }}">
                    Tentang Kami
                </a>
                <a href="{{ route('karir') }}"
                    class="transition-colors duration-200 {{ request()->routeIs('karir') ? 'text-gray-900 font-bold border-b-2 border-orange-500 pb-0.5' : 'text-gray-600 hover:text-orange-600 font-medium' }}">
                    Peluang Karir
                </a>
            </div>

            <!-- Right CTA Button / User Menu (Desktop) -->
            @include('partials.navbar-user', ['mode' => 'desktop'])

            <!-- Mobile Hamburger Button -->
            <button id="mobileMenuBtn" type="button" aria-label="Toggle Navigation"
                class="md:hidden text-gray-700 hover:text-orange-600 focus:outline-none p-1.5 rounded-lg">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path id="menuIcon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </nav>

        <!-- Mobile Navigation Drawer -->
        <div id="mobileMenu"
            class="hidden md:hidden max-w-7xl mx-auto mt-2 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-orange-200 transition-all duration-300">
            <div class="flex flex-col space-y-3 text-sm">
                <a href="{{ route('beranda') }}"
                    class="px-3 py-2 rounded-lg transition {{ request()->routeIs('beranda') ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-700 hover:bg-gray-50' }}">
                    Beranda
                </a>
                <a href="{{ route('tentang') }}"
                    class="px-3 py-2 rounded-lg transition {{ request()->routeIs('tentang') ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-700 hover:bg-gray-50' }}">
                    Tentang Kami
                </a>
                <a href="{{ route('karir') }}"
                    class="px-3 py-2 rounded-lg transition {{ request()->routeIs('karir') ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-700 hover:bg-gray-50' }}">
                    Peluang Karir
                </a>
                @include('partials.navbar-user', ['mode' => 'mobile'])
            </div>
        </div>
    </header>

    <!-- ================= MAIN CONTENT ================= -->
    <main class="flex-grow">
        @yield('content')
    </main>

    <!-- ================= FOOTER ================= -->
    <footer class="bg-gray-100/90 pt-16 pb-8 border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <!-- Brand Info -->
            <div class="space-y-5">
                <div class="flex items-center space-x-2.5">
                    <img src="{{ asset('assets/logo_ewf-removebg-preview-1.png') }}" alt="Logo PT Equityworld Futures"
                        class="w-8 h-8 object-contain" />
                    <span class="font-bold text-gray-900 text-sm tracking-tight">PT Equityworld Futures</span>
                </div>
                <p class="text-xs text-gray-500 leading-relaxed pr-2">
                    Perusahaan pialang berjangka resmi terpercaya di Indonesia. Kami menyediakan infrastruktur perdagangan komoditi dan derivatif yang transparan, aman, berlisensi penuh, serta didukung kehandalan teknologi sistem informasi terkini.
                </p>
                <!-- Legal Regulatory Badges -->
                <div class="flex flex-wrap items-center gap-2 pt-1">
                    <span class="bg-white border border-gray-200 text-[10px] font-bold text-gray-700 px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                        ANGGOTA BBJ
                    </span>
                    <span class="bg-white border border-gray-200 text-[10px] font-bold text-gray-700 px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                        KLIRING KBI
                    </span>
                    <span class="bg-white border border-orange-200 text-[10px] font-bold text-orange-600 px-2.5 py-1 rounded shadow-xs uppercase tracking-wider">
                        BAPPEBTI
                    </span>
                </div>
            </div>

            <!-- Links 1: Tentang EWF -->
            <div>
                <h4 class="font-bold text-gray-900 mb-5 text-sm">Tentang EWF</h4>
                <ul class="space-y-3 text-xs font-medium text-gray-500">
                    <li><a href="{{ route('tentang') }}" class="hover:text-orange-500 transition">Profil & Legalitas</a></li>
                    <li><a href="{{ route('tentang') }}#produk" class="hover:text-orange-500 transition">Produk Komoditi & Valas</a></li>
                    <li><a href="{{ route('tentang') }}#segregated" class="hover:text-orange-500 transition">Rekening Terpisah (Segregated)</a></li>
                    <li><a href="#" class="hover:text-orange-500 transition">Riset Pasar & Berita</a></li>
                    <li><a href="{{ route('tentang') }}#tata-kelola" class="hover:text-orange-500 transition">Tata Kelola Perusahaan</a></li>
                </ul>
            </div>

            <!-- Links 2: Karir & Program -->
            <div>
                <h4 class="font-bold text-gray-900 mb-5 text-sm">Karir & Program</h4>
                <ul class="space-y-3 text-xs font-medium text-gray-500">
                    <li><a href="{{ route('karir') }}" class="hover:text-orange-500 transition">Lowongan Profesional</a></li>
                    <li><a href="{{ route('karir') }}" class="hover:text-orange-500 transition">Program Magang Mahasiswa</a></li>
                    <li><a href="{{ route('tentang') }}#budaya" class="hover:text-orange-500 transition">Budaya & Nilai Kerja</a></li>
                    <li><a href="{{ route('karir') }}#fasilitas" class="hover:text-orange-500 transition">Fasilitas & Pengembangan</a></li>
                    <li><a href="{{ route('karir') }}#aduan" class="hover:text-orange-500 transition">Hubungi Tim HRD</a></li>
                </ul>
            </div>

            <!-- Links 3: Kantor Operasional -->
            <div>
                <h4 class="font-bold text-gray-900 mb-5 text-sm">Kantor Operasional</h4>
                <p class="text-xs text-gray-500 mb-4 leading-relaxed">
                    Cyber 2 Tower Lt. 19, Jl. H.R. Rasuna Said Blok X-5 Kav. 13, Jakarta Selatan 12950
                </p>
                <div class="space-y-2.5">
                    <p class="text-xs text-gray-900 font-semibold flex items-center">
                        <svg class="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        021-2855-2999
                    </p>
                    <p class="text-xs text-orange-600 font-medium flex items-center">
                        <svg class="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        corporate@equityworld-futures.com
                    </p>
                </div>
            </div>
        </div>

        <!-- Footer Bottom -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 pt-8 border-t border-gray-200/80 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500 font-medium">
            <p>&copy; 2026 PT Equityworld Futures. Seluruh hak cipta dilindungi undang-undang.</p>
            <div class="flex space-x-6 mt-4 md:mt-0">
                <a href="#" class="hover:text-gray-800 transition">Ketentuan Hukum</a>
                <a href="#" class="hover:text-gray-800 transition">Kebijakan Privasi</a>
                <a href="#" class="hover:text-gray-800 transition">Pusat Bantuan</a>
            </div>
        </div>
    </footer>

    <!-- Mobile Menu & Scroll Reveal Scripts -->
    <script>
        // Toggle Mobile Menu
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');

        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Scroll-triggered Reveal Animations via IntersectionObserver
        document.addEventListener('DOMContentLoaded', () => {
            const reveals = document.querySelectorAll('.reveal, .reveal-scale');

            if ('IntersectionObserver' in window) {
                const observerOptions = {
                    root: null,
                    rootMargin: '0px 0px -40px 0px',
                    threshold: 0.12
                };

                const revealObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('is-revealed');
                            observer.unobserve(entry.target);
                        }
                    });
                }, observerOptions);

                reveals.forEach(el => revealObserver.observe(el));
            } else {
                // Fallback for older browsers
                reveals.forEach(el => el.classList.add('is-revealed'));
            }
        });
    </script>
    <!-- Konfigurasi & Modul Karir (Front-End Mock M1) -->
    <script>
        window.EWF_DEMO_ENABLED = true; // Set false untuk mematikan panel DEMO di pojok kiri bawah
        window.EWF_CAREER_URLS = {
            beranda: "{{ route('beranda') }}",
            karir: "{{ route('karir') }}",
            lowonganDetail: "{{ route('lowongan.detail', '__slug__') }}",
            jalur: "{{ route('jalur') }}",
            profilLengkapi: "{{ route('profil.lengkapi') }}",
            profil: "{{ route('profil') }}",
            riwayat: "{{ route('lamaran.riwayat') }}",
            sandi: "{{ route('sandi') }}",
            login: "{{ route('login') }}",
            register: "{{ route('register') }}"
        };
    </script>
    <script src="{{ asset('js/career-dummy.js') }}"></script>
    <script src="{{ asset('js/career-mock.js') }}"></script>
    <script src="{{ asset('js/career-auth-bridge.js') }}"></script>
    <script src="{{ asset('js/career-ui.js') }}"></script>
</body>

</html>