'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { BarChart3, Music, TrendingUp } from 'lucide-react';

interface BudgetSliderProps {
	onComplete?: (budget: number) => void;
	campaignData?: any;
}

export default function BudgetSlider({
	onComplete,
	campaignData,
}: BudgetSliderProps) {
	const [budget, setBudget] = useState([campaignData?.budget || 5000]);

	const formatBudget = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0,
		}).format(value);
	};

	const formatNumber = (num: number) => {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + 'M';
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toString();
	};

	const handleSubmit = () => {
		if (onComplete) {
			onComplete(budget[0]);
		}
	};

	// Calculate metrics based on budget
	const estimatedEngagements = Math.round(budget[0] * 200); // 200 engagements per dollar
	const estimatedCTR = 3.5; // Average CTR for music campaigns
	const estimatedSpotifyPlays = Math.round(budget[0] * 50); // 50 plays per dollar

	return (
		<div className='space-y-4'>
			<div className='flex justify-between items-center'>
				<Label htmlFor='budget'>Campaign Budget</Label>
				<span className='font-medium text-lg'>
					{formatBudget(budget[0])}
				</span>
			</div>

			<Slider
				id='budget'
				min={1000}
				max={50000}
				step={1000}
				value={budget}
				onValueChange={setBudget}
				className='[&_[role=slider]]:bg-orange-600'
			/>

			<div className='flex justify-between text-sm text-muted-foreground'>
				<span>$1,000</span>
				<span>$50,000</span>
			</div>

			<div className='mt-4 space-y-4'>
				<div className='flex items-center gap-3 p-3 bg-muted rounded-md'>
					<div className='h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center'>
						<BarChart3 className='h-4 w-4 text-orange-600' />
					</div>
					<div>
						<div className='text-sm font-medium'>
							Estimated Engagements
						</div>
						<div className='text-sm'>
							{formatNumber(estimatedEngagements)} interactions
						</div>
					</div>
				</div>

				<div className='flex items-center gap-3 p-3 bg-muted rounded-md'>
					<div className='h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center'>
						<TrendingUp className='h-4 w-4 text-orange-600' />
					</div>
					<div>
						<div className='text-sm font-medium'>Average CTR</div>
						<div className='text-sm'>{estimatedCTR}%</div>
					</div>
				</div>

				<div className='flex items-center gap-3 p-3 bg-muted rounded-md'>
					<div className='h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center'>
						<Music className='h-4 w-4 text-orange-600' />
					</div>
					<div>
						<div className='text-sm font-medium'>
							Estimated Spotify Plays
						</div>
						<div className='text-sm'>
							{formatNumber(estimatedSpotifyPlays)} plays
						</div>
					</div>
				</div>
			</div>

			<Button
				onClick={handleSubmit}
				className='w-full bg-orange-600 hover:bg-orange-700'
			>
				Continue with this budget
			</Button>
		</div>
	);
}
