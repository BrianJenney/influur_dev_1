'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
	BarChart,
	LineChart,
	Line,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import {
	Clock,
	CheckCircle,
	AlertCircle,
	Eye,
	ThumbsUp,
	MessageCircle,
	Share2,
	ExternalLink,
} from 'lucide-react';

// Mock campaign data
const ACTIVE_CAMPAIGNS = [
	{
		id: '1',
		name: 'Summer Vibes 2025',
		song: 'Watermelon Sugar',
		artist: 'Harry Styles',
		status: 'in-progress',
		influencers: [
			{
				id: '1',
				name: 'Alex Johnson',
				handle: '@alexjdancer',
				status: 'accepted',
				deliverable: null,
			},
			{
				id: '2',
				name: 'Maria Garcia',
				handle: '@mariamusic',
				status: 'pending',
				deliverable: null,
			},
			{
				id: '3',
				name: 'Jamal Williams',
				handle: '@jamalcreates',
				status: 'declined',
				deliverable: null,
			},
		],
		startDate: '2025-06-15',
		endDate: '2025-07-15',
		budget: 8500,
		spent: 2500,
	},
	{
		id: '2',
		name: 'Dance Revolution',
		song: 'Levitating',
		artist: 'Dua Lipa',
		status: 'completed',
		influencers: [
			{
				id: '4',
				name: 'Sophie Chen',
				handle: '@sophiestyle',
				status: 'completed',
				deliverable: {
					url: 'https://example.com/post1',
					platform: 'instagram',
					views: 125000,
					likes: 15600,
					comments: 842,
					shares: 3200,
				},
			},
			{
				id: '5',
				name: 'Lucas Müller',
				handle: '@lucasbeats',
				status: 'completed',
				deliverable: {
					url: 'https://example.com/post2',
					platform: 'tiktok',
					views: 230000,
					likes: 42000,
					comments: 1250,
					shares: 8500,
				},
			},
		],
		startDate: '2025-05-01',
		endDate: '2025-06-01',
		budget: 10000,
		spent: 10000,
	},
];

// Mock performance data
const PERFORMANCE_DATA = [
	{ day: 'Day 1', views: 25000, engagement: 2800 },
	{ day: 'Day 2', views: 45000, engagement: 5200 },
	{ day: 'Day 3', views: 62000, engagement: 7800 },
	{ day: 'Day 4', views: 78000, engagement: 9100 },
	{ day: 'Day 5', views: 95000, engagement: 12400 },
	{ day: 'Day 6', views: 128000, engagement: 18600 },
	{ day: 'Day 7', views: 180000, engagement: 24500 },
	{ day: 'Day 8', views: 210000, engagement: 28700 },
	{ day: 'Day 9', views: 245000, engagement: 32100 },
	{ day: 'Day 10', views: 280000, engagement: 36500 },
	{ day: 'Day 11', views: 310000, engagement: 41200 },
	{ day: 'Day 12', views: 335000, engagement: 45800 },
	{ day: 'Day 13', views: 355000, engagement: 49300 },
	{ day: 'Day 14', views: 370000, engagement: 52000 },
];

// Mock platform breakdown
const PLATFORM_DATA = [
	{ name: 'TikTok', value: 230000 },
	{ name: 'Instagram', value: 125000 },
	{ name: 'YouTube', value: 15000 },
];

interface CampaignTrackingProps {
	onComplete?: () => void;
	campaignData?: any;
}

export default function CampaignTracking({
	onComplete,
	campaignData,
}: CampaignTrackingProps) {
	const [selectedCampaign, setSelectedCampaign] = useState<string>('2'); // Default to completed campaign

	const campaign = ACTIVE_CAMPAIGNS.find((c) => c.id === selectedCampaign);

	const getStatusBadge = (status: string) => {
		switch (status) {
			case 'in-progress':
				return <Badge className='bg-blue-500'>In Progress</Badge>;
			case 'completed':
				return <Badge className='bg-green-500'>Completed</Badge>;
			case 'pending':
				return (
					<Badge
						variant='outline'
						className='text-amber-500 border-amber-500'
					>
						Pending
					</Badge>
				);
			case 'accepted':
				return (
					<Badge
						variant='outline'
						className='text-green-500 border-green-500'
					>
						Accepted
					</Badge>
				);
			case 'declined':
				return (
					<Badge
						variant='outline'
						className='text-red-500 border-red-500'
					>
						Declined
					</Badge>
				);
			default:
				return <Badge variant='outline'>{status}</Badge>;
		}
	};

	const formatNumber = (num: number) => {
		if (num >= 1000000) {
			return (num / 1000000).toFixed(1) + 'M';
		} else if (num >= 1000) {
			return (num / 1000).toFixed(1) + 'K';
		}
		return num.toString();
	};

	return (
		<Card className='border-none shadow-none'>
			<CardContent className='p-0 space-y-6'>
				<div className='flex justify-between items-center'>
					<h3 className='font-semibold text-lg'>
						Campaign Dashboard
					</h3>

					<select
						className='px-2 py-1 border rounded-md text-sm'
						value={selectedCampaign}
						onChange={(e) => setSelectedCampaign(e.target.value)}
					>
						{ACTIVE_CAMPAIGNS.map((campaign) => (
							<option key={campaign.id} value={campaign.id}>
								{campaign.name}
							</option>
						))}
					</select>
				</div>

				{campaign && (
					<>
						<div className='flex justify-between items-start'>
							<div>
								<h2 className='text-xl font-bold'>
									{campaign.name}
								</h2>
								<p className='text-sm text-muted-foreground'>
									{campaign.song} by {campaign.artist}
								</p>
							</div>
							{getStatusBadge(campaign.status)}
						</div>

						<div className='grid grid-cols-3 gap-4'>
							<Card>
								<CardContent className='p-4 flex flex-col items-center justify-center'>
									<p className='text-sm text-muted-foreground'>
										Total Views
									</p>
									<p className='text-2xl font-bold'>
										{formatNumber(
											campaign.influencers.reduce(
												(sum, inf) =>
													sum +
													(inf.deliverable?.views ||
														0),
												0
											)
										)}
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardContent className='p-4 flex flex-col items-center justify-center'>
									<p className='text-sm text-muted-foreground'>
										Engagement
									</p>
									<p className='text-2xl font-bold'>
										{formatNumber(
											campaign.influencers.reduce(
												(sum, inf) =>
													sum +
													(inf.deliverable
														? inf.deliverable
																.likes +
														  inf.deliverable
																.comments +
														  inf.deliverable.shares
														: 0),
												0
											)
										)}
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardContent className='p-4 flex flex-col items-center justify-center'>
									<p className='text-sm text-muted-foreground'>
										Budget Spent
									</p>
									<p className='text-2xl font-bold'>
										${campaign.spent.toLocaleString()}
										<span className='text-sm text-muted-foreground'>
											/ $
											{campaign.budget.toLocaleString()}
										</span>
									</p>
								</CardContent>
							</Card>
						</div>

						{campaign.status === 'completed' && (
							<Tabs defaultValue='performance'>
								<TabsList className='grid w-full grid-cols-3'>
									<TabsTrigger value='performance'>
										Performance
									</TabsTrigger>
									<TabsTrigger value='influencers'>
										Influencers
									</TabsTrigger>
									<TabsTrigger value='platforms'>
										Platforms
									</TabsTrigger>
								</TabsList>

								<TabsContent
									value='performance'
									className='space-y-4 pt-4'
								>
									<Card>
										<CardHeader className='pb-2'>
											<CardTitle className='text-base'>
												Daily Performance
											</CardTitle>
										</CardHeader>
										<CardContent className='p-0'>
											<ChartContainer
												config={{
													views: {
														label: 'Views',
														color: 'hsl(var(--chart-1))',
													},
													engagement: {
														label: 'Engagement',
														color: 'hsl(var(--chart-2))',
													},
												}}
												className='h-[300px]'
											>
												<ResponsiveContainer
													width='100%'
													height='100%'
												>
													<LineChart
														data={PERFORMANCE_DATA}
														margin={{
															top: 5,
															right: 30,
															left: 20,
															bottom: 5,
														}}
													>
														<CartesianGrid strokeDasharray='3 3' />
														<XAxis dataKey='day' />
														<YAxis />
														<ChartTooltip
															content={
																<ChartTooltipContent />
															}
														/>
														<Legend />
														<Line
															type='monotone'
															dataKey='views'
															stroke='var(--color-views)'
															name='Views'
														/>
														<Line
															type='monotone'
															dataKey='engagement'
															stroke='var(--color-engagement)'
															name='Engagement'
														/>
													</LineChart>
												</ResponsiveContainer>
											</ChartContainer>
										</CardContent>
									</Card>
								</TabsContent>

								<TabsContent
									value='influencers'
									className='space-y-4 pt-4'
								>
									<div className='space-y-4'>
										{campaign.influencers.map(
											(influencer) => (
												<Card key={influencer.id}>
													<CardContent className='p-4'>
														<div className='flex justify-between items-start'>
															<div className='flex items-center gap-3'>
																<Avatar>
																	<AvatarImage
																		src={`/placeholder.svg?height=40&width=40`}
																		alt={
																			influencer.name
																		}
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
																		{
																			influencer.name
																		}
																	</div>
																	<div className='text-sm text-muted-foreground'>
																		{
																			influencer.handle
																		}
																	</div>
																</div>
															</div>
															{getStatusBadge(
																influencer.status
															)}
														</div>

														{influencer.deliverable && (
															<div className='mt-4 space-y-3'>
																<div className='flex justify-between text-sm'>
																	<div className='flex items-center gap-1'>
																		<Eye className='h-4 w-4 text-muted-foreground' />
																		<span>
																			{formatNumber(
																				influencer
																					.deliverable
																					.views
																			)}{' '}
																			views
																		</span>
																	</div>
																	<div className='flex items-center gap-1'>
																		<ThumbsUp className='h-4 w-4 text-muted-foreground' />
																		<span>
																			{formatNumber(
																				influencer
																					.deliverable
																					.likes
																			)}{' '}
																			likes
																		</span>
																	</div>
																	<div className='flex items-center gap-1'>
																		<MessageCircle className='h-4 w-4 text-muted-foreground' />
																		<span>
																			{formatNumber(
																				influencer
																					.deliverable
																					.comments
																			)}{' '}
																			comments
																		</span>
																	</div>
																	<div className='flex items-center gap-1'>
																		<Share2 className='h-4 w-4 text-muted-foreground' />
																		<span>
																			{formatNumber(
																				influencer
																					.deliverable
																					.shares
																			)}
																		</span>
																		<span>
																			{' '}
																			shares
																		</span>
																	</div>
																</div>

																<Button
																	variant='outline'
																	size='sm'
																	className='w-full'
																>
																	<ExternalLink className='h-3 w-3 mr-2' />
																	View Post on{' '}
																	{
																		influencer
																			.deliverable
																			.platform
																	}
																</Button>
															</div>
														)}
													</CardContent>
												</Card>
											)
										)}
									</div>
								</TabsContent>

								<TabsContent
									value='platforms'
									className='space-y-4 pt-4'
								>
									<Card>
										<CardHeader className='pb-2'>
											<CardTitle className='text-base'>
												Platform Breakdown
											</CardTitle>
										</CardHeader>
										<CardContent className='p-0'>
											<ChartContainer
												config={{
													value: {
														label: 'Views',
														color: 'hsl(var(--chart-1))',
													},
												}}
												className='h-[300px]'
											>
												<ResponsiveContainer
													width='100%'
													height='100%'
												>
													<BarChart
														data={PLATFORM_DATA}
														margin={{
															top: 5,
															right: 30,
															left: 20,
															bottom: 5,
														}}
													>
														<CartesianGrid strokeDasharray='3 3' />
														<XAxis dataKey='name' />
														<YAxis />
														<ChartTooltip
															content={
																<ChartTooltipContent />
															}
														/>
														<Legend />
														<Bar
															dataKey='value'
															fill='var(--color-value)'
															name='Views'
														/>
													</BarChart>
												</ResponsiveContainer>
											</ChartContainer>
										</CardContent>
									</Card>
								</TabsContent>
							</Tabs>
						)}

						{campaign.status === 'in-progress' && (
							<div className='space-y-4'>
								<h3 className='font-medium'>
									Campaign Timeline
								</h3>

								<div className='space-y-3'>
									<div className='flex items-start gap-3'>
										<div className='h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5'>
											<CheckCircle className='h-4 w-4 text-white' />
										</div>
										<div>
											<p className='font-medium'>
												Campaign Created
											</p>
											<p className='text-sm text-muted-foreground'>
												June 15, 2025
											</p>
										</div>
									</div>

									<div className='flex items-start gap-3'>
										<div className='h-6 w-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5'>
											<CheckCircle className='h-4 w-4 text-white' />
										</div>
										<div>
											<p className='font-medium'>
												Proposals Sent
											</p>
											<p className='text-sm text-muted-foreground'>
												June 15, 2025
											</p>
										</div>
									</div>

									<div className='flex items-start gap-3'>
										<div className='h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mt-0.5'>
											<Clock className='h-4 w-4 text-white' />
										</div>
										<div>
											<p className='font-medium'>
												Waiting for Content Creation
											</p>
											<p className='text-sm text-muted-foreground'>
												1 of 3 influencers accepted
											</p>
										</div>
									</div>

									<div className='flex items-start gap-3'>
										<div className='h-6 w-6 rounded-full bg-muted flex items-center justify-center mt-0.5'>
											<AlertCircle className='h-4 w-4 text-muted-foreground' />
										</div>
										<div>
											<p className='font-medium text-muted-foreground'>
												Content Review
											</p>
											<p className='text-sm text-muted-foreground'>
												Pending
											</p>
										</div>
									</div>

									<div className='flex items-start gap-3'>
										<div className='h-6 w-6 rounded-full bg-muted flex items-center justify-center mt-0.5'>
											<AlertCircle className='h-4 w-4 text-muted-foreground' />
										</div>
										<div>
											<p className='font-medium text-muted-foreground'>
												Campaign Completion
											</p>
											<p className='text-sm text-muted-foreground'>
												Expected by July 15, 2025
											</p>
										</div>
									</div>
								</div>

								<Card>
									<CardContent className='p-4'>
										<h3 className='font-medium mb-2'>
											Influencer Status
										</h3>

										<div className='space-y-3'>
											{campaign.influencers.map(
												(influencer) => (
													<div
														key={influencer.id}
														className='flex justify-between items-center'
													>
														<div className='flex items-center gap-2'>
															<Avatar className='h-8 w-8'>
																<AvatarImage
																	src={`/placeholder.svg?height=32&width=32`}
																	alt={
																		influencer.name
																	}
																/>
																<AvatarFallback>
																	{influencer.name.substring(
																		0,
																		2
																	)}
																</AvatarFallback>
															</Avatar>
															<span>
																{
																	influencer.name
																}
															</span>
														</div>
														{getStatusBadge(
															influencer.status
														)}
													</div>
												)
											)}
										</div>
									</CardContent>
								</Card>
							</div>
						)}
					</>
				)}
			</CardContent>
		</Card>
	);
}
