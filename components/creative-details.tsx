'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface CreativeDetailsProps {
	onComplete?: (data: { creative: string; reference: string }) => void;
	campaignData?: any;
}

export default function CreativeDetails({
	onComplete,
	campaignData,
}: CreativeDetailsProps) {
	const [creative, setCreative] = useState(campaignData?.creative || '');
	const [reference, setReference] = useState(campaignData?.reference || '');

	const handleSubmit = () => {
		if (onComplete) {
			onComplete({
				creative,
				reference,
			});
		}
	};

	return (
		<div className='space-y-4'>
			<div className='space-y-2'>
				<Label htmlFor='creative'>Creative Brief</Label>
				<Textarea
					id='creative'
					placeholder='Describe your creative vision, key messages, and any specific requirements...'
					value={creative}
					onChange={(e) => setCreative(e.target.value)}
					className='min-h-[100px]'
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='reference'>Creative Reference</Label>
				<div className='flex gap-2'>
					<Input
						id='reference'
						placeholder='Paste a link to your reference document or upload a file'
						value={reference}
						onChange={(e) => setReference(e.target.value)}
					/>
					<Button variant='outline' size='icon'>
						<Upload className='h-4 w-4' />
					</Button>
				</div>
			</div>

			<Button
				onClick={handleSubmit}
				disabled={!creative.trim()}
				className='w-full bg-orange-600 hover:bg-orange-700'
			>
				Continue
			</Button>
		</div>
	);
}
