'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Music, Users, MapPin, DollarSign, Target } from 'lucide-react';

interface CampaignConfirmationProps {
	onComplete?: () => void;
	campaignData?: any;
}

export default function CampaignConfirmation({
	onComplete,
	campaignData,
}: CampaignConfirmationProps) {
	if (!campaignData) return null;

	const { goal, name, song, budget, region, selectedInfluencers } =
		campaignData;

	const totalInfluencerCost =
		selectedInfluencers?.reduce(
			(sum: number, inf: any) => sum + inf.price,
			0
		) || 0;
	const totalReach =
		selectedInfluencers?.reduce(
			(sum: number, inf: any) => sum + inf.followers,
			0
		) || 0;

	const formatNumber = (num: number) => {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + 'M';
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toString();
	};

	const getRegionName = (regionCode: string) => {
		const regions: Record<string, string> = {
			us: 'United States',
			eu: 'Europe',
			latam: 'Latin America',
			asia: 'Asia',
			global: 'Global',
		};
		return regions[regionCode] || regionCode;
	};

	const handleSubmit = () => {
		if (onComplete) {
			onComplete();
		}
	};

	return (
		<Card className='border-none shadow-none bg-inherit'>
			<CardContent className='p-0'>
				<h3 className='font-semibold text-lg mb-4'>Campaign Summary</h3>

				<div className='space-y-2'>
					<div className='flex items-center gap-3 p-3 bg-muted rounded-md'>
						<div className='h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center'>
							<Target className='h-4 w-4 text-primary' />
						</div>
						<div>
							<div className='text-sm font-medium'>
								Campaign Goal
							</div>
							<div className='text-sm'>
								{goal?.type === 'custom'
									? goal?.description
									: goal?.description}
							</div>
						</div>
					</div>

					<div className='flex items-center gap-3 p-3 bg-muted rounded-md'>
						<div className='h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center'>
							<Music className='h-4 w-4 text-primary' />
						</div>
						<div>
							<div className='text-sm font-medium'>Song</div>
							<div className='text-sm'>
								{song?.name} by {song?.artist}
							</div>
						</div>
					</div>

					<div className='flex items-center gap-3 p-3 bg-muted rounded-md'>
						<div className='h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center'>
							<DollarSign className='h-4 w-4 text-primary' />
						</div>
						<div>
							<div className='text-sm font-medium'>Budget</div>
							<div className='text-sm'>
								${budget?.toLocaleString()}
							</div>
						</div>
					</div>

					<div className='flex items-center gap-3 p-3 bg-muted rounded-md'>
						<div className='h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center'>
							<MapPin className='h-4 w-4 text-primary' />
						</div>
						<div>
							<div className='text-sm font-medium'>
								Target Region
							</div>
							<div className='text-sm'>
								{getRegionName(region)}
							</div>
						</div>
					</div>

					<div className='flex items-center gap-3 p-3 bg-muted rounded-md'>
						<div className='h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center'>
							<Users className='h-4 w-4 text-primary' />
						</div>
						<div>
							<div className='text-sm font-medium'>
								Influencers
							</div>
							<div className='text-sm'>
								{selectedInfluencers?.length} selected ($
								{totalInfluencerCost.toLocaleString()} total)
							</div>
						</div>
					</div>
				</div>

				<div className='mt-4 border-t pt-4'>
					<div className='space-y-1.5'>
						<div className='flex justify-between'>
							<span className='font-medium'>Total Reach:</span>
							<span>{formatNumber(totalReach)} followers</span>
						</div>
						<div className='flex justify-between'>
							<span className='font-medium'>
								Estimated Engagement:
							</span>
							<span>
								{formatNumber(totalReach * 0.03)} interactions
							</span>
						</div>
						<div className='flex justify-between'>
							<span className='font-medium'>
								Cost per 1,000 Followers:
							</span>
							<span>
								$
								{(
									(totalInfluencerCost / totalReach) *
									1000
								).toFixed(2)}
							</span>
						</div>
					</div>

					<Button
						onClick={handleSubmit}
						className='w-full mt-4 bg-orange-600 hover:bg-orange-700'
					>
						Confirm Campaign Details
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
