'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import SpotifySearch from '@/components/spotify-search';

interface CampaignFormData {
	startDate: Date;
	territory: string;
	budget: string;
	profileTypes: string;
	creativeType: string;
	creativeReference: string;
	profileReference: string;
	hashtags: string;
}

interface Influencer {
	username: string;
	followers: number;
	engagement: number;
	engagementRate: number;
	territories: string[];
}

export default function CampaignForm() {
	const router = useRouter();
	const [selectedTrack, setSelectedTrack] = useState<any>(null);
	const [selectedInfluencers, setSelectedInfluencers] = useState<
		Influencer[]
	>([]);

	const [formData, setFormData] = useState<CampaignFormData>({
		startDate: new Date(),
		territory: '',
		budget: '',
		profileTypes: '',
		creativeType: '',
		creativeReference: '',
		profileReference: '',
		hashtags: '',
	});

	const handleTrackSelect = (track: any) => {
		setSelectedTrack(track);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Validate required fields
		if (!selectedTrack) {
			alert('Please select a song');
			return;
		}
		if (!formData.territory) {
			alert('Please enter territory');
			return;
		}
		if (!formData.budget) {
			alert('Please enter budget');
			return;
		}
		if (!formData.profileTypes) {
			alert('Please select profile types');
			return;
		}
		if (!formData.creativeType) {
			alert('Please select creative type');
			return;
		}

		try {
			const response = await fetch('/api/campaigns', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...formData,
					startDate: formData.startDate.toISOString(),
					trackId: selectedTrack.id,
					trackName: selectedTrack.name,
					artistName: selectedTrack.artist,
					platform: 'tiktok',
					influencers: selectedInfluencers,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to create campaign');
			}

			const data = await response.json();
			router.push(`/campaign/${data.id}`);
		} catch (error) {
			console.error('Error creating campaign:', error);
			alert('Failed to create campaign. Please try again.');
		}
	};

	return (
		<div className='max-w-4xl mx-auto p-6'>
			<h1 className='text-3xl font-bold mb-8'>Create New Campaign</h1>

			<form onSubmit={handleSubmit} className='space-y-6'>
				<Card className='p-6'>
					<h2 className='text-xl font-semibold mb-4'>
						Find Song on Spotify
					</h2>
					<SpotifySearch onComplete={handleTrackSelect} />
				</Card>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='space-y-2'>
						<Label htmlFor='startDate'>Start Date</Label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className={cn(
										'w-full justify-start text-left font-normal',
										!formData.startDate &&
											'text-muted-foreground'
									)}
								>
									<CalendarIcon className='mr-2 h-4 w-4' />
									{formData.startDate ? (
										format(formData.startDate, 'PPP')
									) : (
										<span>Pick a date</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'>
								<Calendar
									mode='single'
									selected={formData.startDate}
									onSelect={(date) =>
										date &&
										setFormData((prev) => ({
											...prev,
											startDate: date,
										}))
									}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='territory'>Territory</Label>
						<Select
							value={formData.territory}
							onValueChange={(value) =>
								setFormData((prev) => ({
									...prev,
									territory: value,
								}))
							}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select territory' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='United States'>
									United States
								</SelectItem>
								<SelectItem value='Mexico'>Mexico</SelectItem>
								<SelectItem value='Colombia'>
									Colombia
								</SelectItem>
								<SelectItem value='United States, Mexico, Colombia'>
									All Territories
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='budget'>Budget</Label>
						<Input
							id='budget'
							type='number'
							value={formData.budget}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									budget: e.target.value,
								}))
							}
							required
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='profileTypes'>Profile Types</Label>
						<Select
							value={formData.profileTypes}
							onValueChange={(value) =>
								setFormData((prev) => ({
									...prev,
									profileTypes: value,
								}))
							}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select profile types' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='Micro'>Micro</SelectItem>
								<SelectItem value='Mid'>Mid</SelectItem>
								<SelectItem value='Macro'>Macro</SelectItem>
								<SelectItem value='Micro, Mid, Macro'>
									All Types
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='creativeType'>Creative Type</Label>
						<Select
							value={formData.creativeType}
							onValueChange={(value) =>
								setFormData((prev) => ({
									...prev,
									creativeType: value,
								}))
							}
						>
							<SelectTrigger>
								<SelectValue placeholder='Select creative type' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='lip-sync'>
									Lip-sync
								</SelectItem>
								<SelectItem value='dance'>Dance</SelectItem>
								<SelectItem value='cover'>Cover</SelectItem>
								<SelectItem value='review'>Review</SelectItem>
								<SelectItem value='tutorial'>
									Tutorial
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='creativeReference'>
							Creative Reference
						</Label>
						<Textarea
							id='creativeReference'
							value={formData.creativeReference}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									creativeReference: e.target.value,
								}))
							}
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='profileReference'>
							Profile Reference
						</Label>
						<Textarea
							id='profileReference'
							value={formData.profileReference}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									profileReference: e.target.value,
								}))
							}
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='hashtags'>Hashtags and/or Tags</Label>
						<Textarea
							id='hashtags'
							value={formData.hashtags}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									hashtags: e.target.value,
								}))
							}
						/>
					</div>
				</div>

				<Button
					type='submit'
					className='w-full bg-orange-500 hover:bg-orange-600'
				>
					Create Campaign
				</Button>
			</form>
		</div>
	);
}
