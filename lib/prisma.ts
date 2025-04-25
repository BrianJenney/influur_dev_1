import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

function parsePriceRange(
	priceRange: string | null
): { min: number; max: number } | null {
	if (!priceRange || priceRange.toLowerCase() === 'unknown') return null;

	// Remove $ and spaces
	const cleanPrice = priceRange.replace(/[$, ]/g, '');

	// Handle "<" format (e.g. "< $250")
	if (cleanPrice.startsWith('<')) {
		const max = parseInt(cleanPrice.replace('<', ''));
		if (isNaN(max)) return null;
		return { min: 0, max }; // Assume min is 0 for "<" format
	}

	// Handle ">" format (e.g. "$5000 >")
	if (cleanPrice.includes('>')) {
		const min = parseInt(cleanPrice.replace('>', ''));
		if (isNaN(min)) return null;
		return { min, max: min * 2 }; // Assume max is double the min for ">" format
	}

	// Handle range format (e.g. "$1,000 - $3,000")
	const [minStr, maxStr] = cleanPrice.split('-');
	const min = parseInt(minStr);
	const max = parseInt(maxStr);

	if (isNaN(min) || isNaN(max)) return null;
	return { min, max };
}

export async function getRecommendedInfluencers(campaignData: {
	region: string;
	budget: number;
	gender: 'Male' | 'Female';
}) {
	const { budget, gender = 'Female' } = campaignData;

	const maxPrice = budget * 0.8;
	const minPrice = budget * 0.2;

	const potentialInfluencers = await prisma.users_report.findMany({
		where: {
			brand: false, // Only get influencers, not brands
			gender: {
				equals: gender,
			},
			deleted: false,
		},
		select: {
			id: true,
			user_id: true,
			user_name: true,
			full_name: true,
			gender: true,
			price: true,
			profile_pic: true,
			tiktok_followers: true,
			instagram_followers: true,
			youtube_followers: true,
			last_location: true,
			verified: true,
		},
		// Increase the initial pool size to allow for better filtering
		take: 100,
	});

	// Filter influencers based on price range
	const priceFilteredInfluencers = potentialInfluencers.filter(
		(influencer) => {
			// If price is null or unknown, include them (they might be good matches)
			if (
				!influencer.price ||
				influencer.price.toLowerCase() === 'unknown'
			) {
				return true;
			}

			const priceRange = parsePriceRange(influencer.price);
			if (!priceRange) return true; // Include if we can't parse the price

			// Check if the influencer's price range overlaps with our budget range
			return priceRange.min <= maxPrice && priceRange.max >= minPrice;
		}
	);

	// Sort by follower count (prioritize those with more followers)
	const sortedInfluencers = priceFilteredInfluencers.sort((a, b) => {
		const aFollowers = Math.max(
			parseInt(a.tiktok_followers?.replace(/,/g, '') || '0'),
			parseInt(a.instagram_followers?.replace(/,/g, '') || '0'),
			parseInt(a.youtube_followers?.replace(/,/g, '') || '0')
		);
		const bFollowers = Math.max(
			parseInt(b.tiktok_followers?.replace(/,/g, '') || '0'),
			parseInt(b.instagram_followers?.replace(/,/g, '') || '0'),
			parseInt(b.youtube_followers?.replace(/,/g, '') || '0')
		);
		return bFollowers - aFollowers;
	});

	return sortedInfluencers.slice(0, 20);
}
