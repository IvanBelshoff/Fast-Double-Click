'use client';

import { MdSearch } from "react-icons/md";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

interface ISearchProps {
    placeholder: string;
    typeSearch: 'text' | 'number';
}

export default function Search({ placeholder, typeSearch = 'text' }: ISearchProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const inputElement = useRef<HTMLInputElement>(null);

    const params = new URLSearchParams(searchParams);

    const handleSearch = useDebouncedCallback((term: string) => {

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);

    }, 300);

    const typeOfResearch = (value: string, typeSearch: 'text' | 'number'): string => {

        if (typeSearch == 'number') {
            console.log('number');
            return value.replace(/[^0-9]/g, "");
        }

        return value;
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

    const queryFilter = searchParams.get('query')?.toString();

    useEffect(() => {

        if (queryFilter == undefined) {
            if (inputElement.current) {
                inputElement.current.value = ''; // Limpa o campo manualmente
            }
        }

    }, [queryFilter]);

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <Input
                ref={inputElement}
                type="text"
                inputMode={typeSearch === 'number' ? 'numeric' : 'text'}
                pattern={typeSearch === 'number' ? '[0-9]*' : undefined}
                className="peer block w-full rounded-md border border-border py-[9px] pl-10 text-sm outline-2 placeholder:text-text focus:border-primary focus:outline-none focus:ring-0 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={placeholder}
                onChange={(e) => {
                    const rawValue = e.target.value;
                    const cleanedValue = typeOfResearch(rawValue, typeSearch);

                    if (inputElement.current) {
                        inputElement.current.value = cleanedValue;
                    }

                    handleSearch(cleanedValue);
                }}
                defaultValue={queryFilter}
            />
            <MdSearch className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
    );
}