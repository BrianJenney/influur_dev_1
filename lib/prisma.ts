import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getRecommendedInfluencers(campaignData: {
	region: string;
	budget: number;
	gender: 'male' | 'female';
}) {
	const { budget, gender = 'female' } = campaignData;

	// Calculate price range (assuming budget is total, and we want to find influencers within 20-80% of budget)
	const maxPrice = budget * 0.8;

	return await prisma.users.findMany({
		where: {
			influencer: {
				not: null,
			},
			gender: {
				equals: gender,
			},
			price: {
				lte: maxPrice,
			},
		},
		include: {
			instagram_user_insights: {
				select: {
					followers: true,
					engagement_rate: true,
					handle: true,
					is_influur_verified: true,
					avg_likes: true,
					avg_comments: true,
				},
			},
			tiktok_user_insights: {
				select: {
					followers: true,
					engagement_rate: true,
					handle: true,
					is_influur_verified: true,
				},
			},
			youtube_user_insights: {
				select: {
					followers: true,
					engagement_rate: true,
					handle: true,
					is_influur_verified: true,
				},
			},
			user_industry: {
				include: {
					industries: true,
				},
			},
			user_location: {
				include: {
					locations: true,
				},
			},
		},
		take: 20, // Limit to 20 results
	});
}
