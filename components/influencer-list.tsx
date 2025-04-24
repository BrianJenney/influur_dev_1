'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
	Instagram,
	Youtube,
	Users,
	BarChart3,
	Check,
	Eye,
	Info,
	TwitterIcon as TikTok,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

// Mock influencer data with real images
const MOCK_INFLUENCERS = [
	{
		id: '1',
		name: 'Sofiani Nicole',
		handle: '@_sofianiicole',
		avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
		followers: 1400000,
		avgViews: 120400,
		engagementRate: 1.99,
		price: 300,
		platforms: ['tiktok'],
		topCountries: ['United States', 'Mexico', 'Colombia'],
		agency: 'Independent',
		bio: 'TikTok creator known for engaging content',
	},
	{
		id: '2',
		name: 'Alex Rivera',
		handle: '@alexdances',
		avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
		followers: 2500000,
		avgViews: 180000,
		engagementRate: 2.5,
		price: 450,
		platforms: ['tiktok'],
		topCountries: ['United States', 'Brazil', 'Spain'],
		agency: 'Independent',
		bio: 'Professional dancer creating viral dance challenges',
	},
	{
		id: '3',
		name: 'Maria Santos',
		handle: '@mariacreates',
		avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
		followers: 3200000,
		avgViews: 250000,
		engagementRate: 3.1,
		price: 600,
		platforms: ['tiktok'],
		topCountries: ['Brazil', 'Portugal', 'United States'],
		agency: 'Independent',
		bio: 'Lifestyle and fashion content creator',
	},
];

interface InfluencerListProps {
	onComplete?: (selectedInfluencers: any[]) => void;
	campaignData?: any;
}

export default function InfluencerList({
	onComplete,
	campaignData,
}: InfluencerListProps) {
	const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>(
		campaignData?.selectedInfluencers?.map((inf: any) => inf.id) || []
	);
	const [showSelected, setShowSelected] = useState(false);
	const [expandedInfluencer, setExpandedInfluencer] = useState<string | null>(
		null
	);

	const toggleInfluencer = (id: string) => {
		setSelectedInfluencers((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
		);
	};

	const formatNumber = (num: number) => {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + 'M';
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toString();
	};

	const getPlatformIcon = (platform: string) => {
		switch (platform) {
			case 'tiktok':
				return <TikTok className='h-4 w-4' />;
			default:
				return null;
		}
	};

	const displayedInfluencers = showSelected
		? MOCK_INFLUENCERS.filter((inf) => selectedInfluencers.includes(inf.id))
		: MOCK_INFLUENCERS;

	const totalBudget = MOCK_INFLUENCERS.filter((inf) =>
		selectedInfluencers.includes(inf.id)
	).reduce((sum, inf) => sum + inf.price, 0);

	const handleSubmit = () => {
		if (selectedInfluencers.length === 0) return;

		const selectedInfluencerData = MOCK_INFLUENCERS.filter((inf) =>
			selectedInfluencers.includes(inf.id)
		);

		if (onComplete) {
			onComplete(selectedInfluencerData);
		}
	};

	return (
		<div className='space-y-4'>
			<div className='flex justify-between items-center'>
				<div>
					<h3 className='font-medium text-orange-600'>
						TikTok Influencers
					</h3>
					<p className='text-sm text-muted-foreground'>
						{selectedInfluencers.length} of{' '}
						{MOCK_INFLUENCERS.length} selected
					</p>
				</div>
				<div className='flex items-center gap-2'>
					<Button
						variant='outline'
						size='sm'
						onClick={() => setShowSelected(!showSelected)}
						className='border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
					>
						{showSelected ? 'Show All' : 'Show Selected'}
					</Button>
					{selectedInfluencers.length > 0 && (
						<Badge
							variant='outline'
							className='ml-2 border-orange-600 text-orange-600'
						>
							Total: ${totalBudget.toLocaleString()}
						</Badge>
					)}
				</div>
			</div>

			<div className='space-y-3'>
				{displayedInfluencers.map((influencer) => (
					<Card
						key={influencer.id}
						className={`transition-all duration-200 ${
							selectedInfluencers.includes(influencer.id)
								? 'border-orange-600 bg-orange-50'
								: 'hover:border-orange-200'
						}`}
					>
						<CardContent className='p-4'>
							<div className='flex items-start justify-between'>
								<div className='flex items-start gap-4'>
									<Checkbox
										checked={selectedInfluencers.includes(
											influencer.id
										)}
										onCheckedChange={() =>
											toggleInfluencer(influencer.id)
										}
										id={`influencer-${influencer.id}`}
										className='border-orange-600 data-[state=checked]:bg-orange-600'
									/>
									<Avatar className='h-12 w-12 ring-2 ring-orange-600'>
										<AvatarImage
											src={influencer.avatar}
											alt={influencer.name}
										/>
										<AvatarFallback className='bg-orange-100 text-orange-600'>
											{influencer.name.substring(0, 2)}
										</AvatarFallback>
									</Avatar>
									<div>
										<div className='font-medium text-orange-600'>
											{influencer.name}
										</div>
										<div className='text-sm text-muted-foreground'>
											{influencer.handle}
										</div>
										<div className='flex gap-2 mt-1'>
											<TikTok className='h-4 w-4 text-orange-600' />
										</div>
									</div>
								</div>
								<div className='text-right'>
									<div className='font-medium text-orange-600'>
										${influencer.price.toLocaleString()}
									</div>
									<div className='flex items-center justify-end gap-2 text-sm text-muted-foreground'>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger className='flex items-center gap-1'>
													<Users className='h-3 w-3 text-orange-600' />
													<span>
														{formatNumber(
															influencer.followers
														)}
													</span>
												</TooltipTrigger>
												<TooltipContent>
													<p>Total Followers</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger className='flex items-center gap-1'>
													<Eye className='h-3 w-3 text-orange-600' />
													<span>
														{formatNumber(
															influencer.avgViews
														)}
													</span>
												</TooltipTrigger>
												<TooltipContent>
													<p>Average Views</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger className='flex items-center gap-1'>
													<BarChart3 className='h-3 w-3 text-orange-600' />
													<span>
														{
															influencer.engagementRate
														}
														%
													</span>
												</TooltipTrigger>
												<TooltipContent>
													<p>Engagement Rate</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
								</div>
							</div>

							<div className='mt-2 flex flex-wrap gap-1'>
								<Badge
									variant='secondary'
									className='text-xs bg-orange-100 text-orange-600'
								>
									Avg. Views:{' '}
									{formatNumber(influencer.avgViews)}
								</Badge>
								{influencer.topCountries.map((country) => (
									<Badge
										key={country}
										variant='outline'
										className='text-xs border-orange-200'
									>
										{country}
									</Badge>
								))}
								<Badge
									variant='outline'
									className='text-xs border-orange-200'
								>
									{influencer.agency}
								</Badge>
							</div>

							{expandedInfluencer === influencer.id && (
								<div className='mt-3 text-sm text-muted-foreground'>
									{influencer.bio}
								</div>
							)}

							<div className='mt-3 flex items-center justify-between'>
								{selectedInfluencers.includes(
									influencer.id
								) && (
									<div className='text-sm text-orange-600 flex items-center'>
										<Check className='h-3 w-3 mr-1' />{' '}
										Selected for campaign
									</div>
								)}
								<Button
									variant='ghost'
									size='sm'
									onClick={() =>
										setExpandedInfluencer(
											expandedInfluencer === influencer.id
												? null
												: influencer.id
										)
									}
									className='text-orange-600 hover:bg-orange-50'
								>
									{expandedInfluencer === influencer.id
										? 'Show Less'
										: 'Show More'}
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{selectedInfluencers.length > 0 ? (
				<Button
					onClick={handleSubmit}
					className='w-full bg-orange-600 hover:bg-orange-700'
				>
					Continue with {selectedInfluencers.length} influencer
					{selectedInfluencers.length !== 1 ? 's' : ''}
				</Button>
			) : (
				<div className='text-center text-sm text-muted-foreground'>
					Please select at least one influencer to continue
				</div>
			)}
		</div>
	);
}
