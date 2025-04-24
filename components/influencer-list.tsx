'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
	Instagram,
	Youtube,
	Check,
	Eye,
	TwitterIcon as TikTok,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Influencer {
	id: bigint;
	user_id: bigint;
	user_name: string;
	full_name: string | null;
	gender: string | null;
	price: string | null;
	profile_pic: string | null;
	tiktok_followers: string | null;
	instagram_followers: string | null;
	youtube_followers: string | null;
	last_location: string | null;
	verified: boolean;
}

interface InfluencerListProps {
	onComplete?: (selectedInfluencers: Influencer[]) => void;
	campaignData?: any;
}

export default function InfluencerList({
	onComplete,
	campaignData,
}: InfluencerListProps) {
	const [influencers, setInfluencers] = useState<Influencer[]>([]);
	const [selectedInfluencers, setSelectedInfluencers] = useState<string[]>(
		campaignData?.selectedInfluencers?.map((inf: any) =>
			inf.id.toString()
		) || []
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

	const formatNumber = (num: string | null) => {
		if (!num) return '0';
		const n = parseInt(num.replace(/,/g, ''));
		if (n >= 1000000) {
			return (n / 1000000).toFixed(1) + 'M';
		} else if (n >= 1000) {
			return (n / 1000).toFixed(1) + 'K';
		}
		return n.toString();
	};

	const formatPrice = (price: string | null) => {
		if (!price) return 'TBD';
		if (price.toLowerCase() === 'unknown') return 'TBD';
		if (price.includes('>')) {
			return `$${price.replace('>', '').trim()} and up`;
		}
		if (price.includes('<')) {
			return `Up to $${price.replace('<', '').trim()}`;
		}
		return price;
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

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto'>
				{influencers
					.filter(
						(inf) =>
							!showSelected ||
							selectedInfluencers.includes(inf.id.toString())
					)
					.map((influencer) => (
						<Card
							key={influencer.id.toString()}
							className={cn(
								'relative cursor-pointer transition-all duration-200',
								selectedInfluencers.includes(
									influencer.id.toString()
								)
									? 'ring-2 ring-orange-500'
									: 'hover:ring-1 hover:ring-orange-300'
							)}
							onClick={() =>
								toggleInfluencer(influencer.id.toString())
							}
						>
							<CardContent className='p-6'>
								<div className='flex items-start gap-4'>
									<Avatar className='h-14 w-14 flex-shrink-0'>
										<AvatarImage
											src={
												influencer.profile_pic ||
												undefined
											}
											alt={influencer.user_name}
										/>
										<AvatarFallback>
											{influencer.full_name
												? `${influencer.full_name.charAt(
														0
												  )}`
												: influencer.user_name.charAt(
														0
												  )}
										</AvatarFallback>
									</Avatar>
									<div className='min-w-0 flex-1'>
										<div className='font-medium truncate'>
											{influencer.full_name ||
												influencer.user_name}
										</div>
										<div className='text-sm text-muted-foreground truncate'>
											@{influencer.user_name}
										</div>
										{influencer.last_location && (
											<div className='text-sm text-muted-foreground truncate'>
												{influencer.last_location}
											</div>
										)}

										<div className='mt-3 space-y-2'>
											{influencer.price && (
												<div className='font-medium whitespace-nowrap'>
													{formatPrice(
														influencer.price
													)}
												</div>
											)}
											<div className='flex items-center gap-4 text-sm text-muted-foreground'>
												{influencer.tiktok_followers && (
													<div className='flex items-center gap-1 whitespace-nowrap'>
														<TikTok className='h-3 w-3' />
														<span>
															{formatNumber(
																influencer.tiktok_followers
															)}
														</span>
													</div>
												)}
												{influencer.instagram_followers && (
													<div className='flex items-center gap-1 whitespace-nowrap'>
														<Instagram className='h-3 w-3' />
														<span>
															{formatNumber(
																influencer.instagram_followers
															)}
														</span>
													</div>
												)}
												{influencer.youtube_followers && (
													<div className='flex items-center gap-1 whitespace-nowrap'>
														<Youtube className='h-3 w-3' />
														<span>
															{formatNumber(
																influencer.youtube_followers
															)}
														</span>
													</div>
												)}
											</div>
										</div>

										{influencer.verified && (
											<div className='mt-3'>
												<Badge
													variant='secondary'
													className='flex items-center gap-1'
												>
													<Check className='h-3 w-3' />
													Verified
												</Badge>
											</div>
										)}
									</div>
								</div>
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
