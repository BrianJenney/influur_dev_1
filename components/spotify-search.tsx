'use client';

import type React from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2, Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SpotifyTrack {
	id: string;
	name: string;
	artist: string;
	album: string;
	previewUrl: string | null;
	spotifyUrl: string;
	imageUrl: string;
	genres: string[];
}

interface SpotifySearchProps {
	onComplete?: (song: SpotifyTrack) => void;
	campaignData?: any;
}

export default function SpotifySearch({
	onComplete,
	campaignData,
}: SpotifySearchProps) {
	const [query, setQuery] = useState('');
	const [isSearching, setIsSearching] = useState(false);
	const [results, setResults] = useState<SpotifyTrack[]>([]);
	const [selectedSong, setSelectedSong] = useState<SpotifyTrack | null>(
		campaignData?.song || null
	);
	const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(
		null
	);
	const [error, setError] = useState<string | null>(null);

	const handleSearch = async () => {
		if (query.trim() === '') return;

		setIsSearching(true);
		setError(null);

		try {
			const response = await fetch('/api/songs/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query: query.trim() }),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(error.error || 'Failed to search songs');
			}

			const tracks = await response.json();
			setResults(tracks);
		} catch (error) {
			console.error('Error searching tracks:', error);
			setError(
				error instanceof Error
					? error.message
					: 'Failed to search songs'
			);
		} finally {
			setIsSearching(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const handleSelectSong = (song: SpotifyTrack) => {
		setSelectedSong(song);
		setResults([]);
		if (previewAudio) {
			previewAudio.pause();
		}
	};

	const handlePreview = (song: SpotifyTrack) => {
		if (!song.previewUrl) return;

		if (previewAudio) {
			previewAudio.pause();
		}
		const audio = new Audio(song.previewUrl);
		audio.play();
		setPreviewAudio(audio);
	};

	const handleSubmit = () => {
		if (!selectedSong) return;

		if (onComplete) {
			onComplete(selectedSong);
		}
	};

	return (
		<div className='space-y-4'>
			{!selectedSong ? (
				<>
					<div className='flex space-x-2'>
						<Input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={handleKeyDown}
							placeholder='Search for a song or artist...'
							className='flex-1'
						/>
						<Button
							onClick={handleSearch}
							disabled={isSearching || query.trim() === ''}
						>
							{isSearching ? (
								<Loader2 className='h-4 w-4 animate-spin' />
							) : (
								<Search className='h-4 w-4' />
							)}
						</Button>
					</div>

					{error && (
						<div className='text-sm text-red-500'>{error}</div>
					)}

					{isSearching && (
						<div className='text-sm text-muted-foreground flex items-center'>
							<Loader2 className='h-4 w-4 mr-2 animate-spin' />
							Searching...
						</div>
					)}

					{results.length > 0 && (
						<div className='grid grid-cols-1 gap-2'>
							{results.map((song) => (
								<Card
									key={song.id}
									className='hover:bg-muted cursor-pointer transition-colors'
									onClick={() => handleSelectSong(song)}
								>
									<CardContent className='p-3'>
										<div className='flex items-center space-x-4'>
											<div className='h-12 w-12 rounded-md overflow-hidden flex-shrink-0'>
												<img
													src={song.imageUrl}
													alt={`${song.name} album art`}
													className='h-full w-full object-cover'
												/>
											</div>
											<div className='flex-1 min-w-0'>
												<div className='font-medium truncate'>
													{song.name}
												</div>
												<div className='text-sm text-muted-foreground truncate'>
													{song.artist} • {song.album}
												</div>
											</div>
											{song.previewUrl && (
												<Button
													variant='ghost'
													size='sm'
													onClick={(e) => {
														e.stopPropagation();
														handlePreview(song);
													}}
												>
													<Music className='h-4 w-4' />
												</Button>
											)}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</>
			) : (
				<>
					<Card>
						<CardContent className='p-4'>
							<div className='flex items-center justify-between'>
								<div className='flex items-center space-x-4'>
									<div className='h-16 w-16 rounded-md overflow-hidden flex-shrink-0'>
										<img
											src={selectedSong.imageUrl}
											alt={`${selectedSong.name} album art`}
											className='h-full w-full object-cover'
										/>
									</div>
									<div>
										<div className='font-medium'>
											{selectedSong.name}
										</div>
										<div className='text-sm text-muted-foreground'>
											{selectedSong.artist} •{' '}
											{selectedSong.album}
										</div>
									</div>
								</div>
								<Button
									variant='outline'
									size='sm'
									onClick={() => setSelectedSong(null)}
								>
									Change
								</Button>
							</div>
						</CardContent>
					</Card>

					<Button
						onClick={handleSubmit}
						className='w-full bg-orange-600 hover:bg-orange-700'
						disabled={!selectedSong}
					>
						Continue
					</Button>
				</>
			)}
		</div>
	);
}
