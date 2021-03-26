<script>
    import {link, Link} from "svelte-routing";

    let navbarOpen = false;

    function setNavbarOpen() {
        navbarOpen = !navbarOpen;
    }
</script>

<nav class="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <img alt="logo" src="https://i.imgur.com/prUuKFa.png"/>
                <a use:link
                   class="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                   href="/">
                    REDCAT STUDIOS
                </a>
                <button class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                        type="button" on:click="{setNavbarOpen}">
                    <i class="text-white fas fa-bars"></i>
                </button>
        </div>
        <div class="lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none rounded shadow-lg {navbarOpen ? 'block':'hidden'}"
             id="example-navbar-warning">
            <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li class="flex items-center">
                    <Link class="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                       to="/about">
                        About
                    </Link>
                </li>

                <li class="flex items-center">
                    <Link class="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                       to="/clients">
                        Clients
                    </Link>
                </li>

                <li class="flex items-center">
                    <Link class="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                       to="/catalogue">
                        Catalogue
                    </Link>
                </li>

                <li class="flex items-center">
                    <Link class="text-red-600 hover:text-orange-500 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                       to="/catalogue">
                        Login
                    </Link>
                </li>
            </ul>
        </div>
    </div>
</nav>
