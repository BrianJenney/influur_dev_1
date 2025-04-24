import CampaignDetails from '@/components/campaign-details';

interface CampaignDetailsPageProps {
	params: {
		id: string;
	};
}

export default function CampaignDetailsPage({
	params,
}: CampaignDetailsPageProps) {
	return (
		<div className='container mx-auto py-8'>
			<CampaignDetails />
		</div>
	);
}
