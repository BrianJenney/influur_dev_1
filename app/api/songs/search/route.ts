import { NextResponse } from 'next/server';
import { spotifyClient } from '@/lib/spotify';
import { z } from 'zod';

const searchRequestSchema = z.object({
	query: z.string().min(1),
});

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { query } = searchRequestSchema.parse(body);

		const tracks = await spotifyClient.searchTracks(query);
		return NextResponse.json(tracks);
	} catch (error) {
		console.error('Error searching tracks:', error);

		if (error instanceof z.ZodError) {
			return NextResponse.json(
				{ error: 'Invalid request body', details: error.errors },
				{ status: 400 }
			);
		}

		return NextResponse.json(
			{ error: 'Failed to search tracks' },
			{ status: 500 }
		);
	}
}
