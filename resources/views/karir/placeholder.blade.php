@extends('layouts.public')

@section('title', ($pageTitle ?? 'Halaman Karir') . ' | PT Equityworld Futures')

@section('content')
    <section class="relative w-full pt-36 lg:pt-44 pb-24 min-h-[75vh] flex items-center justify-center bg-gray-50/50">
        <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div class="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-xl text-center space-y-5 animate-fade-in-up">
                <div class="inline-flex items-center space-x-2 text-xs font-bold text-orange-600 tracking-wider uppercase bg-orange-50 border border-orange-200 px-4 py-1.5 rounded-full">
                    <span class="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                    <span>{{ $badgeText ?? 'EWF Karir' }}</span>
                </div>

                <h1 class="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                    {{ $heading ?? 'Segera hadir' }}
                </h1>

                <p class="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto">
                    Segera hadir. {{ $description ?? '' }}
                </p>

                <div class="pt-3 flex flex-wrap items-center justify-center gap-3">
                    <a href="{{ route('karir') }}"
                        class="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition duration-200">
                        Ke Peluang Karir
                    </a>
                    <a href="{{ route('beranda') }}"
                        class="bg-white hover:bg-orange-50/60 border border-gray-200 hover:border-orange-300 text-gray-800 font-bold px-6 py-3 rounded-xl text-sm transition duration-200">
                        Kembali ke Beranda
                    </a>
                </div>
            </div>
        </div>
    </section>
@endsection
