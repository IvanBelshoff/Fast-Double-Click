'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdMenu, MdOutlineOpenInNew } from "react-icons/md";

export const Navbar = () => {

    const currentPath = usePathname();

    const [drawer, setDrawer] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('CodarSe');

    useEffect(() => {
        setTitle(document.title);
        setDrawer(false);
    }, [currentPath]);

    useEffect(() => {
        const handle = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setDrawer(false);
            }
        };

        window.addEventListener('keydown', handle);
        return () => window.removeEventListener('keydown', handle);

    }, []);

    return (
        <>
            <nav className='flex items-center gap-6 justify-start fixed top-0 right-0 left-0 md:justify-center bg-primary py-2 sm:py-4 px-6'>

                <button className='sm:hidden' onClick={() => setDrawer(true)}>
                    <MdMenu size={24} />
                </button>

                <ul className='flex gap-4 items-center text-white' tabIndex={drawer ? -1 : undefined}>

                    <li className='hidden sm:block'>
                        <Link href='/' data-active={currentPath === '/'} className='data-[active=true]:underline outline-offset-4'>
                            Página Inicial
                        </Link>
                    </li>
                    <li className='hidden sm:block'>
                        <Link href='/registros' data-active={currentPath === '/registros'} className='data-[active=true]:underline outline-offset-4'>
                            Registros
                        </Link>
                    </li>
                    <li className='hidden sm:block'>
                        <Link href='https://github.com/IvanBelshoff/Fast-Double-Click' target='_blank' className='flex gap-1 items-center outline-offset-4'>
                            Github
                            <MdOutlineOpenInNew />
                        </Link>
                    </li>
                </ul>

                <div
                    data-open={drawer}
                    tabIndex={drawer ? undefined : -1}
                    onClick={() => setDrawer(false)}
                    className='sm:hidden bg-gradient-to-r from-background fixed top-0 left-0 bottom-0 right-0 transition-transform data-[open=false]:-translate-x-full'
                >
                    <ul className='flex gap-4 flex-col p-4 w-60 h-full bg-background' onClick={(event) => event.stopPropagation()}>

                        <li className=''>
                            <Link href='/' data-active={currentPath === '/'} className='data-[active=true]:underline'>
                                Página Inicial
                            </Link>
                        </li>
                        <li >
                            <Link href='/registros' data-active={currentPath === '/cursos'} className='data-[active=true]:underline'>
                                Registros
                            </Link>
                        </li>
                        <li >
                            <Link href='https://github.com/IvanBelshoff/Fast-Double-Click' target='_blank' className='flex gap-1 items-center'>
                                Github
                                <MdOutlineOpenInNew />
                            </Link>
                        </li>

                    </ul>
                </div>

                <h1 className='sm:hidden line-clamp-1'>{title}</h1>
            </nav>
            <div className='h-14 sm:h-[56px]' />
        </>

    );
};