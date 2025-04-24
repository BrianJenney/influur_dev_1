'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const CAMPAIGN_GOALS = [
	{
		id: 'awareness',
		title: 'Brand Awareness',
		description:
			'Increase visibility and recognition for your song or artist',
	},
	{
		id: 'engagement',
		title: 'Engagement',
		description:
			'Drive likes, comments, shares, and user-generated content',
	},
	{
		id: 'conversion',
		title: 'Conversion',
		description: 'Increase streams, downloads, or purchases of your music',
	},
	{
		id: 'custom',
		title: 'Custom Goal',
		description: 'Define your own campaign objective',
	},
];

interface CampaignGoalProps {
	onComplete?: (goal: { type: string; description: string }) => void;
	campaignData?: any;
}

export default function CampaignGoal({
	onComplete,
	campaignData,
}: CampaignGoalProps) {
	const [selectedGoal, setSelectedGoal] = useState<string>(
		campaignData?.goal?.type || ''
	);
	const [customGoal, setCustomGoal] = useState<string>(
		selectedGoal === 'custom' ? campaignData?.goal?.description || '' : ''
	);

	const handleSubmit = () => {
		if (!selectedGoal) return;

		const goalData = {
			type: selectedGoal,
			description:
				selectedGoal === 'custom'
					? customGoal
					: CAMPAIGN_GOALS.find((goal) => goal.id === selectedGoal)
							?.description || '',
		};

		if (onComplete) {
			onComplete(goalData);
		}
	};

	return (
		<Card className='border-none shadow-none'>
			<CardContent className='px-4 pt-4'>
				<RadioGroup
					value={selectedGoal}
					onValueChange={setSelectedGoal}
					className='space-y-3'
				>
					{CAMPAIGN_GOALS.map((goal) => (
						<div
							key={goal.id}
							className='flex items-start space-x-2'
						>
							<RadioGroupItem
								value={goal.id}
								id={goal.id}
								className='mt-1'
							/>
							<Label
								htmlFor={goal.id}
								className='font-normal cursor-pointer flex-1'
							>
								<span className='font-medium'>
									{goal.title}
								</span>
								<p className='text-sm text-muted-foreground'>
									{goal.description}
								</p>
							</Label>
						</div>
					))}
				</RadioGroup>

				{selectedGoal === 'custom' && (
					<Textarea
						placeholder='Describe your campaign goal...'
						className='mt-3'
						value={customGoal}
						onChange={(e) => setCustomGoal(e.target.value)}
					/>
				)}

				<Button
					onClick={handleSubmit}
					className='w-full bg-orange-600 hover:bg-orange-700 mt-4'
					disabled={
						!selectedGoal ||
						(selectedGoal === 'custom' && !customGoal)
					}
				>
					Continue
				</Button>
			</CardContent>
		</Card>
	);
}
