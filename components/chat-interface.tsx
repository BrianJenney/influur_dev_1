'use client';

import React from 'react';
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Send } from 'lucide-react';
import CampaignGoal from './campaign-goal';
import CampaignName from './campaign-name';
import SpotifySearch from './spotify-search';
import BudgetSlider from './budget-slider';
import RegionSelector from './region-selector';
import InfluencerList from './influencer-list';
import CampaignConfirmation from './campaign-confirmation';
import ProposalDraft from './proposal-draft';
import CampaignSuccess from './campaign-success';
import CampaignTracking from './campaign-tracking';
import StartDate from './start-date';
import CreativeDetails from './creative-details';

type MessageRole = 'system' | 'user' | 'assistant';

interface Message {
	id: string;
	role: MessageRole;
	content: string;
	component?: React.ReactElement<{
		onComplete?: (response: any) => void;
		campaignData?: CampaignData;
	}>;
	expectsResponse?: boolean;
}

interface CampaignData {
	goal: string;
	name: string;
	song: any;
	budget: number;
	region: string;
	startDate: Date;
	creative: string;
	reference: string;
	selectedInfluencers: any[];
	id?: string;
}

// Define the campaign steps
const CAMPAIGN_STEPS = [
	{
		id: 'goal',
		prompt: "Let's start by defining your campaign goal. What are you trying to achieve with this campaign?",
		component: <CampaignGoal />,
		expectsResponse: true,
	},
	{
		id: 'name',
		prompt: "Great! Now, let's give your campaign a name:",
		component: <CampaignName />,
		expectsResponse: true,
	},
	{
		id: 'song',
		prompt: "Now, let's find the perfect song for your campaign. Please search for a song:",
		component: <SpotifySearch />,
		expectsResponse: true,
	},
	{
		id: 'budget',
		prompt: "Let's set your campaign budget:",
		component: <BudgetSlider />,
		expectsResponse: true,
	},
	{
		id: 'region',
		prompt: 'Which region would you like to target for this campaign?',
		component: <RegionSelector />,
		expectsResponse: true,
	},
	{
		id: 'startDate',
		prompt: 'When would you like to start this campaign?',
		component: <StartDate />,
		expectsResponse: true,
	},
	{
		id: 'creative',
		prompt: 'Please provide your creative brief and any reference materials:',
		component: <CreativeDetails />,
		expectsResponse: true,
	},
	{
		id: 'influencers',
		prompt: 'Based on your selections, here are the recommended influencers for your campaign:',
		component: <InfluencerList />,
		expectsResponse: true,
	},
	{
		id: 'confirmation',
		prompt: "Here's a summary of your campaign. Please review and confirm:",
		component: <CampaignConfirmation />,
		expectsResponse: true,
	},
	{
		id: 'proposal',
		prompt: "Based on your campaign goals and song choice, here's a draft proposal and recommended clip:",
		component: <ProposalDraft />,
		expectsResponse: true,
	},
	{
		id: 'success',
		prompt: 'Your proposals have been sent successfully! You can now track your campaign progress:',
		component: <CampaignSuccess campaignId='1' />,
		expectsResponse: true,
	},
	{
		id: 'tracking',
		prompt: "Here's your campaign dashboard:",
		component: <CampaignTracking />,
		expectsResponse: false,
	},
];

// Dummy campaign data
const DUMMY_CAMPAIGN_DATA: CampaignData = {
	goal: 'Increase song streams and engagement on social media',
	name: 'Summer Vibes Campaign',
	song: {
		id: '1',
		name: 'Blinding Lights',
		artist: 'The Weeknd',
		album: 'After Hours',
		image: '/songs/blinding-lights.jpg',
	},
	budget: 10000,
	region: 'global',
	startDate: new Date(),
	creative: 'Looking for energetic dance content with summer vibes',
	reference: 'https://example.com/reference-doc',
	selectedInfluencers: [
		{
			id: '1',
			name: 'Alex Johnson',
			handle: '@alexjdancer',
			avatar: '/influencers/alex.jpg',
			followers: 1200000,
			engagement: 3.2,
			price: 2500,
			platforms: ['instagram', 'tiktok'],
			categories: ['dance', 'lifestyle'],
			region: 'us',
		},
		{
			id: '2',
			name: 'Maria Garcia',
			handle: '@mariamusic',
			avatar: '/influencers/maria.jpg',
			followers: 850000,
			engagement: 4.5,
			price: 1800,
			platforms: ['instagram', 'youtube'],
			categories: ['music', 'fashion'],
			region: 'latam',
		},
	],
	id: '1',
};

export default function ChatInterface() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: '1',
			role: 'system',
			content:
				"Welcome to Influur Campaign Builder! I'll help you create a new marketing campaign for your song promotion.",
		},
		{
			id: '2',
			role: 'assistant',
			content: CAMPAIGN_STEPS[0].prompt,
			component: CAMPAIGN_STEPS[0].component,
			expectsResponse: CAMPAIGN_STEPS[0].expectsResponse,
		},
	]);

	const [input, setInput] = useState('');
	const [currentStep, setCurrentStep] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [campaignData, setCampaignData] = useState<CampaignData>({
		goal: '',
		name: '',
		song: null,
		budget: 5000,
		region: '',
		startDate: new Date(),
		creative: '',
		reference: '',
		selectedInfluencers: [],
	});
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	// Manual scroll function - only called explicitly when needed
	const scrollToBottom = () => {
		if (messagesContainerRef.current) {
			const container = messagesContainerRef.current;
			container.scrollTop = container.scrollHeight;
		}
	};

	const updateCampaignData = (key: string, value: any) => {
		setCampaignData((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const proceedToNextStep = (userResponse?: string) => {
		if (isLoading) return;

		if (userResponse) {
			const userMessage = {
				id: `user-${Date.now()}`,
				role: 'user' as MessageRole,
				content: userResponse,
			};

			setMessages((prev) => [...prev, userMessage]);
		}

		setIsLoading(true);

		setTimeout(scrollToBottom, 100);

		setTimeout(() => {
			if (currentStep < CAMPAIGN_STEPS.length - 1) {
				const nextStep = currentStep + 1;

				// Add assistant response with next step
				const assistantMessage = {
					id: `assistant-${Date.now()}`,
					role: 'assistant' as MessageRole,
					content: CAMPAIGN_STEPS[nextStep].prompt,
					component: CAMPAIGN_STEPS[nextStep].component,
					expectsResponse: CAMPAIGN_STEPS[nextStep].expectsResponse,
				};

				setMessages((prev) => [...prev, assistantMessage]);
				setCurrentStep(nextStep);
				setIsLoading(false);

				// Scroll after adding assistant message
				setTimeout(scrollToBottom, 100);
			} else {
				setIsLoading(false);
			}
		}, 1000);
	};

	const handleSend = () => {
		if (input.trim() === '' || isLoading) return;

		const userResponse = input;
		setInput('');

		proceedToNextStep(userResponse);
	};

	const handleComponentResponse = (response: any) => {
		// Update campaign data based on the step
		const stepId = CAMPAIGN_STEPS[currentStep].id;
		const fieldName =
			stepId === 'influencers' ? 'selectedInfluencers' : stepId;
		updateCampaignData(fieldName, response);

		// If we're at the confirmation step and the response is true, update with dummy data
		if (stepId === 'confirmation' && response === true) {
			setCampaignData(DUMMY_CAMPAIGN_DATA);
		}

		// Proceed to next step
		proceedToNextStep();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	return (
		<div className='flex flex-col h-[600px]'>
			<div
				ref={messagesContainerRef}
				className='flex-1 overflow-y-auto p-4 space-y-4'
			>
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${
							message.role === 'user'
								? 'justify-end'
								: 'justify-start'
						}`}
					>
						<div
							className={`max-w-[80%] rounded-lg p-3 ${
								message.role === 'user'
									? 'bg-primary text-primary-foreground'
									: 'bg-muted'
							}`}
						>
							<p>{message.content}</p>
							{message.component && (
								<div className='mt-3'>
									{React.cloneElement(message.component, {
										onComplete: handleComponentResponse,
										campaignData: campaignData,
									} as any)}
								</div>
							)}
						</div>
					</div>
				))}

				{isLoading && (
					<div className='flex justify-start'>
						<div className='max-w-[80%] rounded-lg p-3 bg-muted'>
							<Loader2 className='h-5 w-5 animate-spin' />
						</div>
					</div>
				)}
			</div>

			<div className='border-t p-4'>
				<div className='flex items-center space-x-2'>
					<Input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder='Type your message...'
						disabled={
							isLoading ||
							!messages[messages.length - 1]?.expectsResponse
						}
						className='flex-1'
					/>
					<Button
						onClick={handleSend}
						disabled={
							isLoading ||
							!messages[messages.length - 1]?.expectsResponse
						}
					>
						<Send className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</div>
	);
}
