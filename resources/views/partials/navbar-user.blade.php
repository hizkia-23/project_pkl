@php($mode = $mode ?? 'desktop')

@if ($mode === 'mobile')
    <div id="navGuestMobile" class="pt-2 border-t border-gray-100">
        <a href="{{ route('login') }}"
            class="w-full block text-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-sm transition">
            Masuk / Daftar
        </a>
    </div>
    <div id="navAuthMobile" class="hidden"></div>
@else
    <div class="hidden md:flex items-center">
        <div id="navGuestDesktop">
            <a href="{{ route('login') }}"
                class="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition duration-200">
                Masuk / Daftar
            </a>
        </div>
        <div id="navAuthDesktop" class="hidden"></div>
    </div>
@endif
