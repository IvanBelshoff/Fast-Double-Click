'use client';

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdClear } from "react-icons/md";

export default function Clear() {

    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const params = new URLSearchParams(searchParams);

    const handleClear = () => {

        params.delete('query');

        replace(`${pathname}?${params.toString()}`);

    };

    const getKey = () => {

        const keys: string[] = [];

        for (const key of searchParams.keys()) {
            keys.push(key);
        }

        const validKey = keys.find((key) => key == 'page');

        return validKey;
    };

    const key = getKey();

    if (key) {
        params.delete(key);
    }

    return (
        <div className='px-3'>
            <MdClear onClick={handleClear} size={20} className='text-text cursor-pointer' />
        </div>
    );
}