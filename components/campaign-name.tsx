'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CampaignNameProps {
	onComplete?: (name: string) => void;
	campaignData?: any;
}

export default function CampaignName({
	onComplete,
	campaignData,
}: CampaignNameProps) {
	const [name, setName] = useState<string>(campaignData?.name || '');

	const handleSubmit = () => {
		if (!name.trim()) return;

		if (onComplete) {
			onComplete(name);
		}
	};

	return (
		<Card className='border-none shadow-none'>
			<CardContent className='px-4 pt-4'>
				<div className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='campaign-name'>Campaign Name</Label>
						<Input
							id='campaign-name'
							placeholder='e.g., UMG Summer Campaign'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<Button
						onClick={handleSubmit}
						className='w-full bg-orange-600 hover:bg-orange-700'
						disabled={!name.trim()}
					>
						Continue
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
