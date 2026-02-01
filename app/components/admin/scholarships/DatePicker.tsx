"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Field, FieldLabel } from "@/components/ui/field"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar1 } from "lucide-react"

type PropType = {
    placeholder?: string;
}

export function DatePickerScholarship(prop: PropType) {
    const [date, setDate] = React.useState<Date>()

    return (
        <Field className="w-full">
            <Popover>
                <PopoverTrigger asChild className="rounded">
                    <Button
                        variant="outline"
                        id="date-picker-simple"
                        className="justify-start font-normal flex items-center"
                    >
                        <Calendar1/>
                        {date ? format(date, "PPP") : <span>{prop.placeholder}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        defaultMonth={date}
                    />
                </PopoverContent>
            </Popover>
        </Field>
    )
}
