'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface StartDateProps {
	onComplete?: (date: Date) => void;
	campaignData?: any;
}

export default function StartDate({
	onComplete,
	campaignData,
}: StartDateProps) {
	const [date, setDate] = useState<Date | undefined>(
		campaignData?.startDate ? new Date(campaignData.startDate) : undefined
	);

	const handleDateSelect = (selectedDate: Date | undefined) => {
		setDate(selectedDate);
		if (selectedDate && onComplete) {
			onComplete(selectedDate);
		}
	};

	return (
		<div className='space-y-4'>
			<div className='flex flex-col gap-2'>
				<label className='text-sm font-medium'>Ideal Start Date</label>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={'outline'}
							className={cn(
								'w-full justify-start text-left font-normal border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white',
								!date && 'text-muted-foreground'
							)}
						>
							<CalendarIcon className='mr-2 h-4 w-4' />
							{date ? format(date, 'PPP') : 'Pick a date'}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto p-0'>
						<Calendar
							mode='single'
							selected={date}
							onSelect={handleDateSelect}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
}
