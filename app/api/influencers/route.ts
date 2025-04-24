import { NextResponse } from 'next/server';
import { getRecommendedInfluencers } from '@/lib/prisma';

// Helper function to convert BigInt to string
function convertBigIntToString(obj: any): any {
	if (obj === null || obj === undefined) return obj;

	if (typeof obj === 'bigint') {
		return obj.toString();
	}

	if (Array.isArray(obj)) {
		return obj.map(convertBigIntToString);
	}

	if (typeof obj === 'object') {
		const newObj: any = {};
		for (const key in obj) {
			newObj[key] = convertBigIntToString(obj[key]);
		}
		return newObj;
	}

	return obj;
}

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const influencers = (await getRecommendedInfluencers(body))
			.map(({ price, ...rest }) => ({
				...rest,
				price: price ? (price * 100).toString() : null,
			}))
			.filter(
				(influencer) =>
					influencer.price !== null &&
					influencer.instagram_user_insights?.followers &&
					influencer.tiktok_user_insights?.followers &&
					influencer.youtube_user_insights?.followers
			);

		// Convert BigInt values to strings before sending response
		const serializedInfluencers = convertBigIntToString(influencers);

		return NextResponse.json(serializedInfluencers);
	} catch (error) {
		console.error('Error fetching influencers:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch influencers' },
			{ status: 500 }
		);
	}
}
