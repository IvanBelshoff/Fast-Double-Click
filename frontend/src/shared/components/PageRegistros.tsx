'use client';
import React from 'react';
import { IHistorico } from '../interfaces';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaSort, FaSortAlphaDownAlt, FaSortAlphaUp } from 'react-icons/fa';
import { format } from 'date-fns';
import { MdDelete } from 'react-icons/md';

type IHistoricoTable = {
    apelido: string;
    data_inicio: string;
    data_fim: string;
    data_registro: string;
    duracao: string;
    deletar: string;
}

interface IPageRegistrosProps {
    registros: IHistorico[];
    heads: { key: keyof IHistoricoTable | string; value: string }[];
    idSort?: string;
    orderSort?: string;
}

export const PageRegistros = ({ registros, heads, idSort, orderSort }: IPageRegistrosProps) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSetSortParams = (newId: string, sort?: { id?: string, order?: string }) => {

        const params = new URLSearchParams(searchParams);

        if (!sort || sort.id !== newId) {
            params.set('sort', `${newId}.desc`);
        } else if (sort && sort.order == 'desc') {
            params.set('sort', `${newId}.asc`);
        } else {
            params.delete('sort');
        }

        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-col h-full w-full justify-center items-center ">


                <Table className={`flex-1`}>
                    <TableHeader>
                        <TableRow>
                            {heads.map((head, index) => (
                                <TableHead
                                    onClick={() => {
                                        if (index < (heads.length - 1)) {
                                            handleSetSortParams(head.key, { id: idSort, order: orderSort });
                                        }
                                    }}
                                    key={index}
                                    data-active={index < (heads.length - 1)}
                                    className="text-left bg-white sticky top-0 z-10 data-[active=true]:cursor-pointer"
                                >
                                    <div className='flex items-center gap-2'>
                                        <p className='select-none '>{head.value}</p>
                                        {((idSort && orderSort) && orderSort == 'asc' && idSort == head.key) && (
                                            <FaSortAlphaUp />
                                        )}
                                        {((idSort && orderSort) && orderSort == 'desc' && idSort == head.key) && (
                                            <FaSortAlphaDownAlt />
                                        )}
                                        {(!idSort || !orderSort) && index < (heads.length - 1) && (
                                            <FaSort size={14} />
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {registros.map((registro) => (
                            <TableRow key={registro.id}>
                                <TableCell>
                                    {registro.apelido}
                                </TableCell>
                                <TableCell>{format(registro.data_inicio, 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                                <TableCell>{format(registro.data_fim, 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                                <TableCell>{format(registro.data_registro, 'dd/MM/yyyy HH:mm:ss')}</TableCell>
                                <TableCell>{registro.duracao}</TableCell>
                                <TableCell>
                                    <MdDelete size={22} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

        </div >
    );
};
