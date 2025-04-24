import { NextResponse } from 'next/server';
import { z } from 'zod';

const campaignSchema = z.object({
	artist: z.string().min(1),
	song: z.string().min(1),
	startDate: z.string().datetime(),
	audienceTerritory: z.string().min(1),
	budget: z.string().min(1),
	convertedBudget: z.string().optional(),
	profileType: z.enum(['micro', 'macro', 'mega']),
	platform: z.enum(['instagram', 'tiktok', 'youtube']),
	creative: z.string().optional(),
	creativeReference: z.string().optional(),
	profileReference: z.string().optional(),
	hashtags: z.string().optional(),
	trackId: z.string().min(1),
	trackName: z.string().min(1),
	artistName: z.string().min(1),
});

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const validatedData = campaignSchema.parse(body);

		// In a real application, you would:
		// 1. Save the campaign to your database
		// 2. Create any necessary related records
		// 3. Return the created campaign with its ID

		// For now, we'll return a mock response
		const mockCampaign = {
			id: '1',
			...validatedData,
			status: 'active',
			progress: 0,
			createdAt: new Date().toISOString(),
		};

		return NextResponse.json(mockCampaign);
	} catch (error) {
		console.error('Error creating campaign:', error);

		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: 'Invalid request body', details: error.errors },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ error: 'Failed to create campaign' },
			{ status: 500 }
		);
	}
}
