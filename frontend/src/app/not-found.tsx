import Lotties from '@/shared/components/Lotties';
import Link from 'next/link';
import { MdHome } from 'react-icons/md';

export default function NotFound() {


    return (
        <main className="flex flex-col">
            <div className="flex gap-2 h-screen">
                <div className='flex w-full h-full flex-col'>
                    <div className='flex h-1/4 items-center justify-center'>
                        <h1 className='text-4xl'>Oops! Parece que esta pagina não existe</h1>
                    </div>
                    <div className='flex h-1/2 items-center justify-center'>
                        <Lotties
                            type='404'
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className={`flex h-1/4 items-center justify-center`}>
                        <Link
                            className={'text-white cursor-pointer flex justify-center items-center gap-2 hover:no-underline bg-primary p-2 px-4 rounded-[6px]'} href="/">
                            <MdHome size={16} />
                            <span className='text-sm'>
                                Voltar para o Início
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}