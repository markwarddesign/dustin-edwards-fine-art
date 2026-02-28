import { registerBlockType } from '@wordpress/blocks';
import { RichText, MediaUpload, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/artist-section', {
    edit: ({ attributes, setAttributes }) => {
        const { 
            imageUrl, imageAlt, yearWatermark, sectionLabel, 
            headingLine1, headingLine2, 
            paragraph1, paragraph2, paragraph3,
            stat1Label, stat1Value, stat2Label, stat2Value
        } = attributes;
        
        const blockProps = useBlockProps({
            className: 'bg-stone-850 text-bronze-50 py-32 px-6 md:px-12 overflow-hidden relative'
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Artist Image', 'dedwards')}>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ imageUrl: media.url, imageAlt: media.alt })}
                            allowedTypes={['image']}
                            value={imageUrl}
                            render={({ open }) => (
                                <Button onClick={open} variant="secondary">
                                    {imageUrl ? __('Change Image', 'dedwards') : __('Upload Image', 'dedwards')}
                                </Button>
                            )}
                        />
                        <TextControl
                            label={__('Year Watermark', 'dedwards')}
                            value={yearWatermark}
                            onChange={(value) => setAttributes({ yearWatermark: value })}
                        />
                    </PanelBody>
                    <PanelBody title={__('Stats', 'dedwards')}>
                        <TextControl
                            label={__('Stat 1 Label', 'dedwards')}
                            value={stat1Label}
                            onChange={(value) => setAttributes({ stat1Label: value })}
                        />
                        <TextControl
                            label={__('Stat 1 Value', 'dedwards')}
                            value={stat1Value}
                            onChange={(value) => setAttributes({ stat1Value: value })}
                        />
                        <TextControl
                            label={__('Stat 2 Label', 'dedwards')}
                            value={stat2Label}
                            onChange={(value) => setAttributes({ stat2Label: value })}
                        />
                        <TextControl
                            label={__('Stat 2 Value', 'dedwards')}
                            value={stat2Value}
                            onChange={(value) => setAttributes({ stat2Value: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                <section {...blockProps}>
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center relative z-10">
                        <div className="w-full lg:w-5/12 relative">
                            <div className="absolute -top-4 -left-4 w-full h-full border border-bronze-500/30"></div>
                            {imageUrl ? (
                                <img src={imageUrl} alt={imageAlt} className="w-full h-auto grayscale opacity-90 relative z-10 shadow-2xl" />
                            ) : (
                                <div className="w-full h-96 bg-stone-700 flex items-center justify-center relative z-10">
                                    <span className="text-bronze-500">Upload Image</span>
                                </div>
                            )}
                            <div className="absolute -bottom-6 -right-6 text-bronze-900/5 font-display text-9xl font-bold -z-10 select-none">
                                {yearWatermark}
                            </div>
                        </div>
                        
                        <div className="w-full lg:w-7/12 space-y-8">
                            <div className="inline-block border-b border-bronze-500 pb-2 mb-4">
                                <RichText
                                    tagName="span"
                                    value={sectionLabel}
                                    onChange={(value) => setAttributes({ sectionLabel: value })}
                                    placeholder={__('Section Label', 'dedwards')}
                                    className="text-xs uppercase tracking-[0.3em] text-bronze-400"
                                />
                            </div>
                            
                            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                                <RichText
                                    tagName="span"
                                    value={headingLine1}
                                    onChange={(value) => setAttributes({ headingLine1: value })}
                                    placeholder={__('Heading Line 1', 'dedwards')}
                                />
                                <br/>
                                <RichText
                                    tagName="span"
                                    value={headingLine2}
                                    onChange={(value) => setAttributes({ headingLine2: value })}
                                    placeholder={__('Heading Line 2', 'dedwards')}
                                    className="italic text-bronze-300"
                                />
                            </h2>
                            
                            <div className="space-y-6 text-bronze-100/80 font-light text-lg leading-relaxed">
                                <RichText
                                    tagName="p"
                                    value={paragraph1}
                                    onChange={(value) => setAttributes({ paragraph1: value })}
                                    placeholder={__('First paragraph...', 'dedwards')}
                                />
                                <RichText
                                    tagName="p"
                                    value={paragraph2}
                                    onChange={(value) => setAttributes({ paragraph2: value })}
                                    placeholder={__('Second paragraph...', 'dedwards')}
                                />
                                <RichText
                                    tagName="p"
                                    value={paragraph3}
                                    onChange={(value) => setAttributes({ paragraph3: value })}
                                    placeholder={__('Third paragraph...', 'dedwards')}
                                />
                            </div>
                            
                            <div className="pt-8 grid grid-cols-2 gap-8 border-t border-white/10 mt-8">
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-bronze-500 mb-2">
                                        {stat1Label}
                                    </h4>
                                    <p className="font-serif text-xl">{stat1Value}</p>
                                </div>
                                <div>
                                    <h4 className="text-[10px] uppercase tracking-widest text-bronze-500 mb-2">
                                        {stat2Label}
                                    </h4>
                                    <p className="font-serif text-xl">{stat2Value}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    },

    save: ({ attributes }) => {
        const { 
            imageUrl, imageAlt, yearWatermark, sectionLabel, 
            headingLine1, headingLine2, 
            paragraph1, paragraph2, paragraph3,
            stat1Label, stat1Value, stat2Label, stat2Value
        } = attributes;
        
        const blockProps = useBlockProps.save({
            className: 'bg-stone-850 text-bronze-50 py-32 px-6 md:px-12 overflow-hidden relative'
        });

        return (
            <section {...blockProps}>
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center relative z-10">
                    <div className="w-full lg:w-5/12 relative">
                        <div className="absolute -top-4 -left-4 w-full h-full border border-bronze-500/30"></div>
                        {imageUrl && (
                            <img src={imageUrl} alt={imageAlt} className="w-full h-auto grayscale opacity-90 relative z-10 shadow-2xl" />
                        )}
                        <div className="absolute -bottom-6 -right-6 text-bronze-900/5 font-display text-9xl font-bold -z-10 select-none">
                            {yearWatermark}
                        </div>
                    </div>
                    
                    <div className="w-full lg:w-7/12 space-y-8">
                        <div className="inline-block border-b border-bronze-500 pb-2 mb-4">
                            <RichText.Content
                                tagName="span"
                                value={sectionLabel}
                                className="text-xs uppercase tracking-[0.3em] text-bronze-400"
                            />
                        </div>
                        
                        <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                            <RichText.Content tagName="span" value={headingLine1} />
                            <br/>
                            <RichText.Content 
                                tagName="span" 
                                value={headingLine2}
                                className="italic text-bronze-300"
                            />
                        </h2>
                        
                        <div className="space-y-6 text-bronze-100/80 font-light text-lg leading-relaxed">
                            <RichText.Content tagName="p" value={paragraph1} />
                            <RichText.Content tagName="p" value={paragraph2} />
                            <RichText.Content tagName="p" value={paragraph3} />
                        </div>
                        
                        <div className="pt-8 grid grid-cols-2 gap-8 border-t border-white/10 mt-8">
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-bronze-500 mb-2">
                                    {stat1Label}
                                </h4>
                                <p className="font-serif text-xl">{stat1Value}</p>
                            </div>
                            <div>
                                <h4 className="text-[10px] uppercase tracking-widest text-bronze-500 mb-2">
                                    {stat2Label}
                                </h4>
                                <p className="font-serif text-xl">{stat2Value}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});
