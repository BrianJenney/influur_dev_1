'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Search } from 'lucide-react';

// Mock data for demonstration - in a real app, this would come from an API
const mockSongs = [
	{
		id: '1',
		title: 'Blinding Lights',
		artist: 'The Weeknd',
		album: 'After Hours',
		duration: '3:20',
		imageUrl:
			'https://i.scdn.co/image/ab67616d0000b27386ca8e845b8c3a7b89a0f0c8',
	},
	{
		id: '2',
		title: 'Save Your Tears',
		artist: 'The Weeknd',
		album: 'After Hours',
		duration: '3:35',
		imageUrl:
			'https://i.scdn.co/image/ab67616d0000b27386ca8e845b8c3a7b89a0f0c8',
	},
	{
		id: '3',
		title: 'Starboy',
		artist: 'The Weeknd',
		album: 'Starboy',
		duration: '3:50',
		imageUrl:
			'https://i.scdn.co/image/ab67616d0000b2738a3f0a3ca7929dea23cd274c',
	},
	{
		id: '4',
		title: 'Levitating',
		artist: 'Dua Lipa',
		album: 'Future Nostalgia',
		duration: '3:23',
		imageUrl:
			'https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5',
	},
	{
		id: '5',
		title: "Don't Start Now",
		artist: 'Dua Lipa',
		album: 'Future Nostalgia',
		duration: '3:03',
		imageUrl:
			'https://i.scdn.co/image/ab67616d0000b273f907de96b9a4fbc04accc0d5',
	},
	{
		id: '6',
		title: 'bad guy',
		artist: 'Billie Eilish',
		album: 'WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?',
		duration: '3:14',
		imageUrl:
			'https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce',
	},
	{
		id: '7',
		title: 'Happier Than Ever',
		artist: 'Billie Eilish',
		album: 'Happier Than Ever',
		duration: '4:58',
		imageUrl:
			'https://i.scdn.co/image/ab67616d0000b2734a6c0376235e5aa44a29c2a6',
	},
	{
		id: '8',
		title: 'Stay',
		artist: 'The Kid LAROI, Justin Bieber',
		album: 'F*CK LOVE 3: OVER YOU',
		duration: '2:21',
		imageUrl:
			'https://i.scdn.co/image/ab67616d0000b273c5f4b87e074097d8f9e1b3c2',
	},
	{
		id: '9',
		title: 'Peaches',
		artist: 'Justin Bieber',
		album: 'Justice',
		duration: '3:18',
		imageUrl:
			'https://i.scdn.co/image/ab67616d0000b273d6ec808748fa5b0c2d3a6618',
	},
	{
		id: '10',
		title: 'Shape of You',
		artist: 'Ed Sheeran',
		album: '÷ (Divide)',
		duration: '3:53',
		imageUrl:
			'https://i.scdn.co/image/ab67616d0000b2737d8dfcfd507069d7f8720aed',
	},
];

interface Song {
	id: string;
	title: string;
	artist: string;
	album: string;
	duration: string;
	imageUrl: string;
}

interface SongSearchProps {
	onSongSelect: (song: Song) => void;
}

export default function SongSearch({ onSongSelect }: SongSearchProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [songs, setSongs] = useState<Song[]>([]);

	const handleSearch = () => {
		// In a real app, this would call an API
		// For now, we'll filter the mock data
		const filteredSongs = mockSongs.filter(
			(song) =>
				song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				song.artist.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setSongs(filteredSongs);
	};

	return (
		<div className='space-y-4'>
			<div className='flex gap-2'>
				<Input
					placeholder='Search for a song...'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							handleSearch();
						}
					}}
					className='focus:ring-orange-600'
				/>
				<Button
					onClick={handleSearch}
					className='bg-orange-600 hover:bg-orange-700'
				>
					<Search className='h-4 w-4 mr-2' />
					Search
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{songs.map((song) => (
					<Card
						key={song.id}
						className='cursor-pointer hover:bg-orange-50 transition-colors'
						onClick={() => onSongSelect(song)}
					>
						<CardHeader className='flex flex-row items-center gap-4'>
							<img
								src={song.imageUrl}
								alt={song.title}
								className='w-16 h-16 rounded-md object-cover'
							/>
							<div>
								<CardTitle className='text-lg text-orange-600'>
									{song.title}
								</CardTitle>
								<CardDescription>{song.artist}</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<p className='text-sm text-gray-500'>
								{song.album} • {song.duration}
							</p>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
