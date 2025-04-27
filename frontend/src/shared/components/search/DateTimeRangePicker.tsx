"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // função de utilitário do shadcn

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { MdClear, MdSearch } from "react-icons/md";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function DateTimeRangePicker() {

    const [date, setDate] = useState<DateRange | undefined>(undefined);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const params = new URLSearchParams(searchParams);

    const handleSearchRangePicker = (date: DateRange) => {

        if(date.from ){
            params.set('dates', `${format(date.from, "yyyy-MM-dd")}>`);
        }

        if (date.to) {
            params.set('dates', `>${format(date.to, "yyyy-MM-dd")}`);
        }

        if (date.from && date.to) {
            params.set('dates', `${format(date.from, "yyyy-MM-dd")}>${format(date.to, "yyyy-MM-dd")}`);
        }

        replace(`${pathname}?${params.toString()}`);
    };

    const handleClear = () => {

        params.delete('dates');

        replace(`${pathname}?${params.toString()}`);
        setDate(undefined);

    };

    return (
        <div className="w-full flex gap-2 items-center">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "flex-1 justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "dd/MM/yyyy")} - {format(date.to, "dd/MM/yyyy")}
                                </>
                            ) : (
                                format(date.from, "dd/MM/yyyy")
                            )
                        ) : (
                            <span>Selecionar intervalo</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Calendar
                        mode="range"
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        showOutsideDays
                        className="p-3"
                    />
                </PopoverContent>
            </Popover>

            <Button
                disabled={date == undefined}
                onClick={() => {
                    if (date) {
                        handleSearchRangePicker(date);
                    }
                }}
                variant={date == undefined ? 'outline' : 'default'} className="whitespace-nowrap cursor-pointer">
                <MdSearch size={20} />
            </Button>

            {date != undefined && (
                <Button onClick={handleClear} variant="outline" className="whitespace-nowrap cursor-pointer">
                    <MdClear size={20} />
                </Button>
            )}


        </div>
    );
}
