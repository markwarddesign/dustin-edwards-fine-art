import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, Flex, FlexItem, BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/adaptive-gallery', {
    edit: ({ attributes, setAttributes }) => {
        const { images } = attributes;
        const blockProps = useBlockProps();

        const onSelectImages = (media) => {
            const newImages = media.map(item => ({
                id: item.id,
                url: item.url,
                alt: item.alt || '',
                title: item.title || '',
                caption: item.caption || ''
            }));
            setAttributes({ images: newImages });
        };

        const updateImage = (index, field, value) => {
            const newImages = [...images];
            newImages[index][field] = value;
            setAttributes({ images: newImages });
        };

        const removeImage = (index) => {
            const newImages = images.filter((_, i) => i !== index);
            setAttributes({ images: newImages });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Gallery Settings', 'dedwards')}>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={onSelectImages}
                                allowedTypes={['image']}
                                multiple={true}
                                gallery={true}
                                value={images.map(img => img.id)}
                                render={({ open }) => (
                                    <BaseControl>
                                        <Button onClick={open} variant="secondary" size="default">
                                            {images.length > 0 
                                                ? __('Edit Gallery', 'dedwards') 
                                                : __('Create Gallery', 'dedwards')
                                            }
                                        </Button>
                                        {images.length > 0 && (
                                            <Button 
                                                onClick={() => setAttributes({ images: [] })}
                                                variant="tertiary"
                                                isDestructive
                                                style={{ marginLeft: '8px' }}
                                            >
                                                {__('Clear Gallery', 'dedwards')}
                                            </Button>
                                        )}
                                    </BaseControl>
                                )}
                            />
                        </MediaUploadCheck>
                        
                        {images.length > 0 && (
                            <div style={{ marginTop: '16px' }}>
                                <strong>{images.length} {images.length === 1 ? 'image' : 'images'} selected</strong>
                            </div>
                        )}
                        
                        {images.map((image, index) => (
                            <PanelBody key={image.id} title={`Image ${index + 1}`} initialOpen={false}>
                                <img src={image.url} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
                                <TextControl
                                    label={__('Title', 'dedwards')}
                                    value={image.title}
                                    onChange={(value) => updateImage(index, 'title', value)}
                                />
                                <TextControl
                                    label={__('Caption', 'dedwards')}
                                    value={image.caption}
                                    onChange={(value) => updateImage(index, 'caption', value)}
                                />
                                <Button 
                                    onClick={() => removeImage(index)}
                                    isDestructive
                                >
                                    {__('Remove Image', 'dedwards')}
                                </Button>
                            </PanelBody>
                        ))}
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <main className="max-w-[1600px] mx-auto px-8 md:px-12 pb-40">
                        {images.length === 0 ? (
                            <div className="text-center py-20 border-2 border-dashed border-stone-300">
                                <p className="text-stone-500">Add images to create your adaptive gallery</p>
                            </div>
                        ) : (
                            <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
                                {images.map((image, index) => {
                                    // Vary the sizes for visual interest
                                    let sizeClass = 'w-full';
                                    let marginClass = 'mb-8';
                                    
                                    switch (index % 6) {
                                        case 0:
                                            sizeClass = 'w-full'; // Full width
                                            marginClass = 'mb-12';
                                            break;
                                        case 1:
                                            sizeClass = 'w-full'; // Full width
                                            marginClass = 'mb-6';
                                            break;
                                        case 2:
                                            sizeClass = 'w-full'; // Full width
                                            marginClass = 'mb-10';
                                            break;
                                        case 3:
                                            sizeClass = 'w-full'; // Full width
                                            marginClass = 'mb-8';
                                            break;
                                        case 4:
                                            sizeClass = 'w-full'; // Full width
                                            marginClass = 'mb-14';
                                            break;
                                        case 5:
                                            sizeClass = 'w-full'; // Full width
                                            marginClass = 'mb-6';
                                            break;
                                    }

                                    return (
                                        <div key={image.id} className={`${sizeClass} ${marginClass} break-inside-avoid reveal`}>
                                            <div className="img-wrapper overflow-hidden bg-stone-100">
                                                <img 
                                                    src={image.url} 
                                                    alt={image.alt} 
                                                    className="w-full h-auto transition-transform duration-700 hover:scale-105"
                                                />
                                            </div>
                                            {(image.title || image.caption) && (
                                                <div className="mt-6 text-left">
                                                    {image.title && (
                                                        <h3 className="font-serif text-xl md:text-2xl font-light italic text-stone-900">
                                                            {image.title}
                                                        </h3>
                                                    )}
                                                    {image.caption && (
                                                        <p className="text-[9px] uppercase tracking-[0.3em] text-stone-500 mt-1">
                                                            {image.caption}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </main>
                </div>
            </>
        );
    }
});