'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatInterface from './chat-interface';
import FormInterface from './form-interface';

export default function CampaignBuilder() {
	const [_, setInterfaceType] = useState<'chat' | 'form'>('chat');

	return (
		<div className='border rounded-lg shadow-sm'>
			<Tabs
				defaultValue='chat'
				onValueChange={(value) =>
					setInterfaceType(value as 'chat' | 'form')
				}
			>
				<div className='flex justify-between items-center p-4 border-b'>
					<h2 className='text-xl font-semibold'>
						Create New Campaign
					</h2>
					<TabsList>
						<TabsTrigger value='chat'>Chat</TabsTrigger>
						<TabsTrigger value='form'>Form</TabsTrigger>
					</TabsList>
				</div>

				<TabsContent value='chat' className='mx-auto'>
					<ChatInterface />
				</TabsContent>

				<TabsContent value='form' className='m-0'>
					<FormInterface />
				</TabsContent>
			</Tabs>
		</div>
	);
}
