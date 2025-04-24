'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock data for a single campaign
const mockCampaign = {
	id: '1',
	artistName: 'The Weeknd',
	songName: 'Blinding Lights',
	budget: 10000,
	startDate: new Date('2024-03-01'),
	endDate: new Date('2024-04-01'),
	status: 'active',
	progress: 75,
	goals: [
		'Increase Spotify streams by 20%',
		'Generate 50 TikTok videos',
		'Reach 1M views on YouTube',
	],
	influencers: [
		{
			id: '1',
			name: 'TikTok Creator',
			platform: 'TikTok',
			followers: 500000,
			engagement: 4.5,
			status: 'confirmed',
			price: 2500,
			imageUrl:
				'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5mbHVlbmNlcnxlbnwwfHwwfHx8MA%3D%3D',
		},
		{
			id: '2',
			name: 'Instagram Influencer',
			platform: 'Instagram',
			followers: 250000,
			engagement: 3.2,
			status: 'pending',
			price: 1800,
			imageUrl:
				'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5mbHVlbmNlcnxlbnwwfHwwfHx8MA%3D%3D',
		},
	],
	deliverables: [
		{
			id: '1',
			type: 'TikTok Video',
			dueDate: new Date('2024-03-15'),
			status: 'completed',
		},
		{
			id: '2',
			type: 'Instagram Post',
			dueDate: new Date('2024-03-20'),
			status: 'in-progress',
		},
	],
};

type CampaignStatus = 'active' | 'completed' | 'pending';

const statusColors: Record<CampaignStatus, string> = {
	active: 'bg-orange-500',
	completed: 'bg-green-500',
	pending: 'bg-yellow-500',
};

export default function CampaignDetails() {
	const [campaign] = useState(mockCampaign);
	const router = useRouter();

	// Calculate influencer metrics
	const totalInfluencers = campaign.influencers.length;
	const totalFollowers = campaign.influencers.reduce(
		(sum, inf) => sum + (inf.followers || 0),
		0
	);
	const totalPrice = campaign.influencers.reduce(
		(sum, inf) => sum + (inf.price || 0),
		0
	);
	const avgEngagement =
		campaign.influencers.reduce(
			(sum, inf) => sum + (inf.engagement || 0),
			0
		) / totalInfluencers;
	const estimatedInteractions = Math.round(
		totalFollowers * (avgEngagement / 100)
	);
	const costPerThousand = totalPrice / (totalFollowers / 1000);

	return (
		<div className='space-y-6'>
			<Button
				variant='ghost'
				className='mb-4'
				onClick={() => router.back()}
			>
				<ArrowLeft className='mr-2 h-4 w-4' />
				Back to Dashboard
			</Button>

			<div className='flex justify-between items-start'>
				<div>
					<h1 className='text-3xl font-bold'>
						{campaign.artistName}
					</h1>
					<p className='text-xl text-gray-600'>{campaign.songName}</p>
				</div>
				<Badge
					className={`${
						statusColors[campaign.status as CampaignStatus]
					} text-white`}
				>
					{campaign.status}
				</Badge>
			</div>

			<div className='grid grid-cols-3 gap-4'>
				<div className='p-4 border rounded-lg bg-orange-50'>
					<p className='text-sm text-gray-500'>Budget</p>
					<p className='text-xl font-semibold text-orange-500'>
						${campaign.budget?.toLocaleString() ?? '0'}
					</p>
				</div>
				<div className='p-4 border rounded-lg bg-orange-50'>
					<p className='text-sm text-gray-500'>Start Date</p>
					<p className='text-xl font-semibold text-orange-500'>
						{campaign.startDate
							? format(campaign.startDate, 'MMM d, yyyy')
							: 'Not set'}
					</p>
				</div>
				<div className='p-4 border rounded-lg bg-orange-50'>
					<p className='text-sm text-gray-500'>End Date</p>
					<p className='text-xl font-semibold text-orange-500'>
						{campaign.endDate
							? format(campaign.endDate, 'MMM d, yyyy')
							: 'Not set'}
					</p>
				</div>
			</div>

			<Tabs defaultValue='overview' className='w-full'>
				<TabsList className='bg-orange-50'>
					<TabsTrigger
						value='overview'
						className='data-[state=active]:bg-orange-500 data-[state=active]:text-white'
					>
						Overview
					</TabsTrigger>
					<TabsTrigger
						value='influencers'
						className='data-[state=active]:bg-orange-500 data-[state=active]:text-white'
					>
						Influencers
					</TabsTrigger>
					<TabsTrigger
						value='deliverables'
						className='data-[state=active]:bg-orange-500 data-[state=active]:text-white'
					>
						Deliverables
					</TabsTrigger>
				</TabsList>
				<TabsContent value='overview' className='space-y-4'>
					<div>
						<h3 className='text-lg font-semibold mb-2'>
							Campaign Goals
						</h3>
						<ul className='list-disc list-inside space-y-1'>
							{campaign.goals.map((goal, index) => (
								<li key={index}>{goal}</li>
							))}
						</ul>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div className='p-4 border rounded-lg bg-orange-50'>
							<h3 className='text-lg font-semibold mb-2'>
								Influencer Summary
							</h3>
							<div className='space-y-2'>
								<p className='text-sm text-gray-500'>
									{totalInfluencers} selected ($
									{totalPrice.toLocaleString()} total)
								</p>
								<p className='text-sm text-gray-500'>
									Total Reach:{' '}
									{totalFollowers.toLocaleString()} followers
								</p>
								<p className='text-sm text-gray-500'>
									Estimated Engagement:{' '}
									{estimatedInteractions.toLocaleString()}{' '}
									interactions
								</p>
								<p className='text-sm text-gray-500'>
									Cost per 1,000 Followers: $
									{costPerThousand.toFixed(2)}
								</p>
							</div>
						</div>

						<div>
							<h3 className='text-lg font-semibold mb-2'>
								Progress
							</h3>
							<div className='w-full bg-gray-200 rounded-full h-2.5'>
								<div
									className='bg-orange-500 h-2.5 rounded-full'
									style={{
										width: `${campaign.progress ?? 0}%`,
									}}
								></div>
							</div>
							<p className='text-sm text-gray-500 mt-1'>
								{campaign.progress ?? 0}% complete
							</p>
						</div>
					</div>
				</TabsContent>
				<TabsContent value='influencers'>
					<div className='space-y-4'>
						{campaign.influencers.map((influencer) => (
							<div
								key={influencer.id}
								className='p-4 border rounded-lg bg-orange-50'
							>
								<div className='flex items-start gap-4'>
									<img
										src={influencer.imageUrl}
										alt={influencer.name}
										className='w-16 h-16 rounded-full object-cover'
									/>
									<div className='flex-1'>
										<div className='flex justify-between items-start'>
											<div>
												<h3 className='font-semibold'>
													{influencer.name}
												</h3>
												<p className='text-sm text-gray-500'>
													{influencer.platform}
												</p>
											</div>
											<Badge variant='outline'>
												{influencer.status}
											</Badge>
										</div>
										<div className='mt-2 grid grid-cols-2 gap-4'>
											<div>
												<p className='text-sm text-gray-500'>
													Followers
												</p>
												<p className='font-semibold text-orange-500'>
													{influencer.followers?.toLocaleString() ??
														'0'}
												</p>
											</div>
											<div>
												<p className='text-sm text-gray-500'>
													Engagement Rate
												</p>
												<p className='font-semibold text-orange-500'>
													{influencer.engagement ??
														'0'}
													%
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</TabsContent>
				<TabsContent value='deliverables'>
					<div className='space-y-4'>
						{campaign.deliverables.map((deliverable) => (
							<div
								key={deliverable.id}
								className='p-4 border rounded-lg bg-orange-50'
							>
								<div className='flex justify-between items-start'>
									<div>
										<h3 className='font-semibold'>
											{deliverable.type}
										</h3>
										<p className='text-sm text-gray-500'>
											Due:{' '}
											{deliverable.dueDate
												? format(
														deliverable.dueDate,
														'MMM d, yyyy'
												  )
												: 'Not set'}
										</p>
									</div>
									<Badge variant='outline'>
										{deliverable.status}
									</Badge>
								</div>
							</div>
						))}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
