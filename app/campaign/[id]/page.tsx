import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	InstagramIcon,
	TwitterIcon as TikTok,
	Youtube,
	Users,
	BarChart3,
	Music,
} from 'lucide-react';

// Mock campaign data
const MOCK_CAMPAIGN = {
	id: '1',
	name: 'Summer Vibes Campaign',
	song: {
		name: 'Blinding Lights',
		artist: 'The Weeknd',
		album: 'After Hours',
		image: 'https://picsum.photos/200/200?random=1',
	},
	influencers: [
		{
			id: '1',
			name: 'Alex Johnson',
			handle: '@alexjdancer',
			avatar: 'https://picsum.photos/200/200?random=2',
			followers: 1200000,
			engagement: 3.2,
			price: 2500,
			platforms: ['instagram', 'tiktok'],
			categories: ['dance', 'lifestyle'],
			region: 'us',
		},
		{
			id: '2',
			name: 'Maria Garcia',
			handle: '@mariamusic',
			avatar: 'https://picsum.photos/200/200?random=3',
			followers: 850000,
			engagement: 4.5,
			price: 1800,
			platforms: ['instagram', 'youtube'],
			categories: ['music', 'fashion'],
			region: 'latam',
		},
	],
	metrics: {
		estimatedReach: 2050000,
		estimatedEngagement: 3.85,
		estimatedCostPerEngagement: 0.55,
		estimatedImpressions: 4100000,
	},
	aiSuggestions: [
		'Consider adding a dance challenge to increase engagement',
		'Target release during peak hours (6-9 PM EST)',
		'Include a giveaway to boost participation',
		'Use trending hashtags #SummerVibes #DanceChallenge',
	],
};

export default function CampaignPage({ params }: { params: { id: string } }) {
	const campaign = MOCK_CAMPAIGN; // In a real app, this would come from an API

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
			case 'instagram':
				return <InstagramIcon className='h-4 w-4' />;
			case 'tiktok':
				return <TikTok className='h-4 w-4' />;
			case 'youtube':
				return <Youtube className='h-4 w-4' />;
			default:
				return null;
		}
	};

	return (
		<div className='container mx-auto py-8 space-y-8'>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>{campaign.name}</h1>
				<Badge variant='outline' className='text-lg'>
					Campaign ID: {params.id}
				</Badge>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				{/* Song Details */}
				<Card>
					<CardHeader>
						<CardTitle>Selected Song</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='flex items-center space-x-4'>
							<div className='h-16 w-16 rounded-md overflow-hidden'>
								<img
									src={campaign.song.image}
									alt={`${campaign.song.name} album art`}
									className='h-full w-full object-cover'
								/>
							</div>
							<div>
								<h3 className='font-medium'>
									{campaign.song.name}
								</h3>
								<p className='text-sm text-muted-foreground'>
									{campaign.song.artist} •{' '}
									{campaign.song.album}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Campaign Metrics */}
				<Card>
					<CardHeader>
						<CardTitle>Campaign Metrics</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-1'>
								<p className='text-sm text-muted-foreground'>
									Estimated Reach
								</p>
								<p className='text-2xl font-bold'>
									{formatNumber(
										campaign.metrics.estimatedReach
									)}
								</p>
							</div>
							<div className='space-y-1'>
								<p className='text-sm text-muted-foreground'>
									Engagement Rate
								</p>
								<p className='text-2xl font-bold'>
									{campaign.metrics.estimatedEngagement}%
								</p>
							</div>
							<div className='space-y-1'>
								<p className='text-sm text-muted-foreground'>
									Cost per Engagement
								</p>
								<p className='text-2xl font-bold'>
									$
									{
										campaign.metrics
											.estimatedCostPerEngagement
									}
								</p>
							</div>
							<div className='space-y-1'>
								<p className='text-sm text-muted-foreground'>
									Impressions
								</p>
								<p className='text-2xl font-bold'>
									{formatNumber(
										campaign.metrics.estimatedImpressions
									)}
								</p>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Selected Influencers */}
				<Card className='md:col-span-2'>
					<CardHeader>
						<CardTitle>Selected Influencers</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{campaign.influencers.map((influencer) => (
								<div
									key={influencer.id}
									className='border rounded-lg p-4'
								>
									<div className='flex items-start justify-between'>
										<div className='flex items-start gap-4'>
											<Avatar className='h-12 w-12'>
												<AvatarImage
													src={influencer.avatar}
													alt={influencer.name}
												/>
												<AvatarFallback>
													{influencer.name.substring(
														0,
														2
													)}
												</AvatarFallback>
											</Avatar>
											<div>
												<div className='font-medium'>
													{influencer.name}
												</div>
												<div className='text-sm text-muted-foreground'>
													{influencer.handle}
												</div>
												<div className='flex gap-2 mt-1'>
													{influencer.platforms.map(
														(platform) => (
															<span
																key={platform}
																className='text-muted-foreground'
															>
																{getPlatformIcon(
																	platform
																)}
															</span>
														)
													)}
												</div>
											</div>
										</div>
										<div className='text-right'>
											<div className='font-medium'>
												$
												{influencer.price.toLocaleString()}
											</div>
											<div className='flex items-center justify-end gap-2 text-sm text-muted-foreground'>
												<Users className='h-3 w-3' />
												<span>
													{formatNumber(
														influencer.followers
													)}
												</span>
												<BarChart3 className='h-3 w-3 ml-1' />
												<span>
													{influencer.engagement}%
												</span>
											</div>
										</div>
									</div>
									<div className='mt-2 flex flex-wrap gap-1'>
										{influencer.categories.map(
											(category) => (
												<Badge
													key={category}
													variant='secondary'
													className='text-xs'
												>
													{category}
												</Badge>
											)
										)}
										<Badge
											variant='outline'
											className='text-xs'
										>
											{influencer.region.toUpperCase()}
										</Badge>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* AI Suggestions */}
				<Card className='md:col-span-2'>
					<CardHeader>
						<CardTitle>AI Suggestions</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-4'>
							{campaign.aiSuggestions.map((suggestion, index) => (
								<div
									key={index}
									className='flex items-start gap-3'
								>
									<div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0'>
										<Music className='h-4 w-4 text-primary' />
									</div>
									<p className='text-sm'>{suggestion}</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
