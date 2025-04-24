'use client';

import { useState, useEffect } from 'react';
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
import { users } from '@prisma/client';

interface Influencer extends users {
	tiktok_user_insights: {
		followers: bigint;
		engagement_rate: number;
		handle: string;
		is_influur_verified: boolean;
		avg_views: number;
		avg_likes: number;
		avg_comments: number;
		avg_shares: number;
	} | null;
}

interface InfluencerListProps {
	onComplete?: (selectedInfluencers: any[]) => void;
	campaignData?: any;
}

export default function InfluencerList({
	onComplete,
	campaignData,
}: InfluencerListProps) {
	const [influencers, setInfluencers] = useState<Influencer[]>([]);
	const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>(
		campaignData?.selectedInfluencers?.map((inf: any) => inf.id) || []
	);
	const [showSelected, setShowSelected] = useState(false);
	const [expandedInfluencer, setExpandedInfluencer] = useState<string | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchInfluencers = async () => {
			if (campaignData) {
				try {
					const response = await fetch('/api/influencers', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify(campaignData),
					});

					if (!response.ok) {
						throw new Error('Failed to fetch influencers');
					}

					const data = await response.json();
					setInfluencers(data);
				} catch (error) {
					console.error('Error fetching influencers:', error);
				} finally {
					setIsLoading(false);
				}
			}
		};

		fetchInfluencers();
	}, [campaignData]);

	const toggleInfluencer = (id: string) => {
		setSelectedInfluencers((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
		);
	};

	const formatNumber = (num: number | bigint) => {
		const n = Number(num);
		if (n >= 1000000) {
			return (n / 1000000).toFixed(1) + 'M';
		} else if (n >= 1000) {
			return (n / 1000).toFixed(1) + 'K';
		}
		return n.toString();
	};

	const getPlatformIcon = (platform: string) => {
		switch (platform) {
			case 'instagram':
				return <Instagram className='h-4 w-4' />;
			case 'tiktok':
				return <TikTok className='h-4 w-4' />;
			case 'youtube':
				return <Youtube className='h-4 w-4' />;
			default:
				return null;
		}
	};

	const handleSubmit = () => {
		if (selectedInfluencers.length === 0) return;

		const selectedInfluencerData = influencers.filter((inf) =>
			selectedInfluencers.includes(inf.id.toString())
		);

		if (onComplete) {
			onComplete(selectedInfluencerData);
		}
	};

	if (isLoading) {
		return <div>Loading influencers...</div>;
	}

	return (
		<div className='space-y-4'>
			<div className='flex justify-between items-center'>
				<h3 className='text-lg font-medium'>Recommended Influencers</h3>
				<Button
					variant='outline'
					onClick={() => setShowSelected(!showSelected)}
					className='flex items-center gap-2'
				>
					<Eye className='h-4 w-4' />
					{showSelected ? 'Show All' : 'Show Selected'}
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				{influencers
					.filter(
						(inf) =>
							!showSelected ||
							selectedInfluencers.includes(inf.id.toString())
					)
					.map((influencer, index) => (
						<Card key={influencer.id} className='relative'>
							<CardContent className='p-4'>
								<div className='flex items-start justify-between'>
									<div className='flex items-start gap-4'>
										<Avatar className='h-12 w-12'>
											<AvatarImage
												src={`https://picsum.photos/200/200?random=${index}`}
												alt={influencer.user_name}
											/>
											<AvatarFallback>
												{influencer.first_name?.charAt(
													0
												)}
												{influencer.last_name?.charAt(
													0
												)}
											</AvatarFallback>
										</Avatar>
										<div>
											<div className='font-medium'>
												{influencer.first_name}{' '}
												{influencer.last_name}
											</div>
											{influencer.tiktok_user_insights
												?.handle && (
												<div className='text-sm text-muted-foreground flex items-center gap-1'>
													<TikTok className='h-3 w-3' />
													@
													{
														influencer
															.tiktok_user_insights
															.handle
													}
												</div>
											)}
										</div>
									</div>
									<div className='text-right pr-8'>
										<div className='font-medium'>
											$
											{influencer.price?.toLocaleString()}
										</div>
										{influencer.tiktok_user_insights && (
											<div className='flex items-center justify-end gap-2 text-sm text-muted-foreground'>
												<Users className='h-3 w-3' />
												<span>
													{formatNumber(
														influencer
															.tiktok_user_insights
															.followers
													)}
												</span>
												<BarChart3 className='h-3 w-3 ml-1' />
												<span>
													{influencer.tiktok_user_insights.engagement_rate?.toFixed(
														1
													)}
													%
												</span>
											</div>
										)}
									</div>
								</div>

								{influencer.tiktok_user_insights && (
									<div className='mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground'>
										<div className='flex items-center gap-1'>
											<span>Avg Views:</span>
											<span className='font-medium'>
												{formatNumber(
													influencer
														.tiktok_user_insights
														.avg_views || 0
												)}
											</span>
										</div>
										<div className='flex items-center gap-1'>
											<span>Avg Likes:</span>
											<span className='font-medium'>
												{formatNumber(
													influencer
														.tiktok_user_insights
														.avg_likes || 0
												)}
											</span>
										</div>
										<div className='flex items-center gap-1'>
											<span>Avg Comments:</span>
											<span className='font-medium'>
												{formatNumber(
													influencer
														.tiktok_user_insights
														.avg_comments || 0
												)}
											</span>
										</div>
										<div className='flex items-center gap-1'>
											<span>Avg Shares:</span>
											<span className='font-medium'>
												{formatNumber(
													influencer
														.tiktok_user_insights
														.avg_shares || 0
												)}
											</span>
										</div>
									</div>
								)}

								<Checkbox
									checked={selectedInfluencers.includes(
										influencer.id.toString()
									)}
									onCheckedChange={() =>
										toggleInfluencer(
											influencer.id.toString()
										)
									}
									className='absolute top-2 right-2'
								/>
							</CardContent>
						</Card>
					))}
			</div>

			<div className='flex justify-end'>
				<Button
					onClick={handleSubmit}
					disabled={selectedInfluencers.length === 0}
				>
					Continue with {selectedInfluencers.length} Selected
				</Button>
			</div>
		</div>
	);
}
