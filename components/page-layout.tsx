interface PageLayoutProps {
	children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
	return (
		<div className='min-h-screen bg-gradient-to-b from-orange-50 to-white'>
			<div className='container mx-auto py-8'>{children}</div>
		</div>
	);
}
