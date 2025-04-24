'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CampaignSuccessProps {
	campaignId: string;
}

export default function CampaignSuccess({ campaignId }: CampaignSuccessProps) {
	const router = useRouter();

	return (
		<Card className='border-none shadow-none'>
			<CardContent className='p-0 space-y-4 text-center'>
				<div className='flex justify-center'>
					<CheckCircle2 className='h-16 w-16 text-primary' />
				</div>

				<div>
					<h3 className='font-semibold text-xl'>
						Proposals Sent Successfully!
					</h3>
					<p className='text-muted-foreground mt-2'>
						Your campaign is now live. We've sent proposals to the
						selected influencers.
					</p>
				</div>

				<div className='bg-muted p-4 rounded-md text-left'>
					<p className='font-medium'>What happens next?</p>
					<ul className='list-disc list-inside mt-2 text-sm text-muted-foreground space-y-1'>
						<li>Influencers will review your proposal</li>
						<li>You'll receive notifications as they accept</li>
						<li>
							Once accepted, influencers will create and post
							content
						</li>
						<li>You'll be able to review and approve posts</li>
						<li>
							Payments will be released upon successful completion
						</li>
					</ul>
				</div>

				<div className='flex gap-4 pt-4'>
					<Button variant='outline' onClick={() => router.push('/')}>
						Create Another Campaign
					</Button>
					<Button
						onClick={() => router.push(`/campaign/${campaignId}`)}
					>
						View Campaign Details
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}
