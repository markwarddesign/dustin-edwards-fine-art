import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText, MediaUpload, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, RangeControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/hero-section', {
	edit: ({ attributes, setAttributes }) => {
		const { topLine, heading, headingAccent, quote, backgroundImage, overlayOpacity, showDivider, showScrollIndicator } = attributes;
		
		const blockProps = useBlockProps({
			className: 'relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone-850',
			style: {
				minHeight: '600px',
			}
		});

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Hero Settings', 'dedwards')}>
						<div style={{ marginBottom: '16px' }}>
							<p style={{ fontWeight: '600', marginBottom: '8px' }}>
								{__('Background Image', 'dedwards')}
							</p>
							<MediaUpload
								onSelect={(media) => setAttributes({ backgroundImage: media.url })}
								allowedTypes={['image']}
								value={backgroundImage}
								render={({ open }) => (
									<div>
										{backgroundImage && (
											<img
												src={backgroundImage}
												alt=""
												style={{ width: '100%', height: 'auto', marginBottom: '8px', borderRadius: '4px' }}
											/>
										)}
										<Button onClick={open} variant="secondary" style={{ width: '100%' }}>
											{backgroundImage ? __('Replace Image', 'dedwards') : __('Upload Image', 'dedwards')}
										</Button>
										{backgroundImage && (
											<Button 
												onClick={() => setAttributes({ backgroundImage: '' })} 
												variant="tertiary" 
												isDestructive
												style={{ width: '100%', marginTop: '8px' }}
											>
												{__('Remove Image', 'dedwards')}
											</Button>
										)}
									</div>
								)}
							/>
						</div>
						<RangeControl
							label={__('Overlay Opacity', 'dedwards')}
							value={overlayOpacity}
							onChange={(value) => setAttributes({ overlayOpacity: value })}
							min={0}
							max={100}
						/>
						<ToggleControl
							label={__('Show Divider', 'dedwards')}
							checked={showDivider}
							onChange={(value) => setAttributes({ showDivider: value })}
						/>
						<ToggleControl
							label={__('Show Scroll Indicator', 'dedwards')}
							checked={showScrollIndicator}
							onChange={(value) => setAttributes({ showScrollIndicator: value })}
						/>
					</PanelBody>
				</InspectorControls>

				<div {...blockProps}>
					{/* Background Image */}
					{backgroundImage && (
						<div className="absolute inset-0 z-0" style={{ opacity: overlayOpacity / 100 }}>
							<img
								src={backgroundImage}
								alt=""
								className="w-full h-full object-cover"
							/>
						</div>
					)}
					
					{/* Placeholder if no background */}
					{!backgroundImage && (
						<div className="absolute inset-0 z-0 bg-stone-900 flex items-center justify-center">
							<p className="text-white/30 text-sm">
								{__('Add background image in sidebar →', 'dedwards')}
							</p>
						</div>
					)}

					{/* Texture Overlay */}
					<div 
						className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
						style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
					></div>

					{/* Content */}
					<div className="relative z-10 text-center text-bronze-50 px-4 max-w-4xl mx-auto">
						<RichText
							tagName="p"
							value={topLine}
							onChange={(value) => setAttributes({ topLine: value })}
							placeholder={__('Idaho • Bronze • Fine Art', 'dedwards')}
							className="text-xs md:text-sm font-sans uppercase tracking-[0.4em] mb-8 text-bronze-200"
							style={{ fontFamily: 'Inter, sans-serif' }}
						/>
						
						<div className="mb-10">
							<RichText
								tagName="span"
								value={heading}
								onChange={(value) => setAttributes({ heading: value })}
								placeholder={__('To Reveal', 'dedwards')}
								className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-none"
								style={{ fontFamily: 'Playfair Display, serif' }}
							/>
							<br />
							<RichText
								tagName="span"
								value={headingAccent}
								onChange={(value) => setAttributes({ headingAccent: value })}
								placeholder={__('The Soul', 'dedwards')}
								className="text-5xl md:text-7xl lg:text-8xl font-display not-italic font-normal text-bronze-200 leading-none"
								style={{ fontFamily: 'Cinzel, serif' }}
							/>
						</div>

						{showDivider && (
							<div className="h-px w-24 bg-bronze-400 mx-auto mb-10"></div>
						)}

						<RichText
							tagName="p"
							value={quote}
							onChange={(value) => setAttributes({ quote: value })}
							placeholder={__('Add your quote...', 'dedwards')}
							className="font-serif text-lg md:text-xl italic text-bronze-100 opacity-90"
							style={{ fontFamily: 'Playfair Display, serif' }}
						/>
					</div>

					{/* Scroll Indicator */}
					{showScrollIndicator && (
						<div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
							</svg>
						</div>
					)}
				</div>
			</>
		);
	},

	save: ({ attributes }) => {
		const { topLine, heading, headingAccent, quote, backgroundImage, overlayOpacity, showDivider, showScrollIndicator } = attributes;
		
		const blockProps = useBlockProps.save({
			className: 'relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone-850',
		});

		return (
			<div {...blockProps}>
				{/* Background Image */}
				{backgroundImage && (
					<div className="absolute inset-0 z-0" style={{ opacity: overlayOpacity / 100 }}>
						<img
							src={backgroundImage}
							alt="Hero Background"
							className="w-full h-full object-cover"
						/>
					</div>
				)}

				{/* Texture Overlay */}
				<div 
					className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
					style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}
				></div>

				{/* Content */}
				<div className="relative z-10 text-center text-bronze-50 px-4 max-w-4xl mx-auto">
					<p className="text-xs md:text-sm font-sans uppercase tracking-[0.4em] mb-8 text-bronze-200 animate-slide-up" style={{ animationDelay: '0.2s' }}>
						<RichText.Content value={topLine} />
					</p>
					
					<h1 className="text-5xl md:text-7xl lg:text-8xl mb-10 leading-none animate-slide-up" style={{ animationDelay: '0.4s' }}>
						<span className="font-serif italic">
							<RichText.Content value={heading} />
						</span>
						<br />
						<span className="font-display not-italic font-normal text-bronze-200">
							<RichText.Content value={headingAccent} />
						</span>
					</h1>

					{showDivider && (
						<div className="h-px w-24 bg-bronze-400 mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.6s' }}></div>
					)}

					<p className="font-serif text-lg md:text-xl italic text-bronze-100 opacity-90 animate-slide-up" style={{ animationDelay: '0.8s', fontFamily: 'Playfair Display, serif' }}>
						<RichText.Content value={quote} />
					</p>
				</div>

				{/* Scroll Indicator */}
				{showScrollIndicator && (
					<div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce">
						<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
						</svg>
					</div>
				)}
			</div>
		);
	},
});
