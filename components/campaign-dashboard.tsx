'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

// Mock data for campaigns
const mockCampaigns = [
	{
		id: '1',
		artistName: 'The Weeknd',
		songName: 'Blinding Lights',
		budget: 10000,
		startDate: new Date('2024-03-01'),
		status: 'active',
		progress: 75,
	},
	{
		id: '2',
		artistName: 'Dua Lipa',
		songName: "Don't Start Now",
		budget: 8000,
		startDate: new Date('2024-02-15'),
		status: 'completed',
		progress: 100,
	},
	{
		id: '3',
		artistName: 'Billie Eilish',
		songName: 'Happier Than Ever',
		budget: 12000,
		startDate: new Date('2024-03-15'),
		status: 'pending',
		progress: 0,
	},
];

type CampaignStatus = 'active' | 'completed' | 'pending';

const statusColors: Record<CampaignStatus, string> = {
	active: 'bg-green-500',
	completed: 'bg-blue-500',
	pending: 'bg-yellow-500',
};

export default function CampaignDashboard() {
	const [campaigns] = useState(mockCampaigns);
	const router = useRouter();

	const handleViewDetails = (campaignId: string) => {
		router.push(`/dashboard/${campaignId}`);
	};

	return (
		<div className='space-y-4'>
			<div className='flex justify-between items-center'>
				<h2 className='text-2xl font-bold'>Campaigns</h2>
				<Button>Create New Campaign</Button>
			</div>

			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Artist</TableHead>
							<TableHead>Song</TableHead>
							<TableHead>Budget</TableHead>
							<TableHead>Start Date</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Progress</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{campaigns.map((campaign) => (
							<TableRow key={campaign.id}>
								<TableCell className='font-medium'>
									{campaign.artistName}
								</TableCell>
								<TableCell>{campaign.songName}</TableCell>
								<TableCell>
									${campaign.budget.toLocaleString()}
								</TableCell>
								<TableCell>
									{format(campaign.startDate, 'MMM d, yyyy')}
								</TableCell>
								<TableCell>
									<Badge
										className={`${
											statusColors[
												campaign.status as CampaignStatus
											]
										} text-white`}
									>
										{campaign.status}
									</Badge>
								</TableCell>
								<TableCell>
									<div className='w-full bg-gray-200 rounded-full h-2.5'>
										<div
											className='bg-blue-600 h-2.5 rounded-full'
											style={{
												width: `${campaign.progress}%`,
											}}
										></div>
									</div>
								</TableCell>
								<TableCell>
									<Button
										variant='ghost'
										size='sm'
										onClick={() =>
											handleViewDetails(campaign.id)
										}
									>
										View Details
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
