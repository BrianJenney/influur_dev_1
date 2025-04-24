'use client';

import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const regions = [
	{ value: 'us', label: 'United States' },
	{ value: 'eu', label: 'Europe' },
	{ value: 'latam', label: 'Latin America' },
	{ value: 'asia', label: 'Asia' },
	{ value: 'global', label: 'Global' },
];

interface RegionSelectorProps {
	onComplete?: (region: string) => void;
	campaignData?: any;
}

export default function RegionSelector({
	onComplete,
	campaignData,
}: RegionSelectorProps) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(campaignData?.region || '');

	const handleSubmit = () => {
		if (!value) return;

		if (onComplete) {
			onComplete(value);
		}
	};

	return (
		<div className='space-y-4'>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={open}
						className='w-full justify-between'
					>
						{value
							? regions.find((region) => region.value === value)
									?.label
							: 'Select target region...'}
						<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-full p-0'>
					<Command>
						<CommandInput placeholder='Search region...' />
						<CommandList>
							<CommandEmpty>No region found.</CommandEmpty>
							<CommandGroup>
								{regions.map((region) => (
									<CommandItem
										key={region.value}
										value={region.value}
										onSelect={(currentValue) => {
											setValue(
												currentValue === value
													? ''
													: currentValue
											);
											setOpen(false);
										}}
									>
										<Check
											className={cn(
												'mr-2 h-4 w-4',
												value === region.value
													? 'opacity-100'
													: 'opacity-0'
											)}
										/>
										{region.label}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>

			{value && (
				<div className='text-sm'>
					<p className='font-medium'>Region Information:</p>
					<ul className='list-disc list-inside mt-2 text-muted-foreground'>
						{value === 'us' && (
							<>
								<li>
									Largest influencer market with high
									engagement rates
								</li>
								<li>
									Higher cost per influencer ($1,000 - $5,000
									average)
								</li>
								<li>
									Strong for pop, hip-hop, and country music
								</li>
							</>
						)}
						{value === 'eu' && (
							<>
								<li>Diverse market with multiple languages</li>
								<li>
									Medium cost per influencer ($800 - $3,000
									average)
								</li>
								<li>
									Strong for electronic, pop, and indie music
								</li>
							</>
						)}
						{value === 'latam' && (
							<>
								<li>
									Rapidly growing market with high engagement
								</li>
								<li>
									Lower cost per influencer ($500 - $2,000
									average)
								</li>
								<li>
									Strong for reggaeton, latin pop, and dance
									music
								</li>
							</>
						)}
						{value === 'asia' && (
							<>
								<li>Largest potential audience reach</li>
								<li>
									Variable cost per influencer ($600 - $4,000
									average)
								</li>
								<li>
									Strong for K-pop, J-pop, and dance music
								</li>
							</>
						)}
						{value === 'global' && (
							<>
								<li>
									Worldwide campaign with diverse influencers
								</li>
								<li>Mixed pricing based on regions</li>
								<li>
									Suitable for international artists and
									global releases
								</li>
							</>
						)}
					</ul>
				</div>
			)}

			<Button
				onClick={handleSubmit}
				className='w-full bg-orange-600 hover:bg-orange-700'
				disabled={!value}
			>
				Continue
			</Button>
		</div>
	);
}
