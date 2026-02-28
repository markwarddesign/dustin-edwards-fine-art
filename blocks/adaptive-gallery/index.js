import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, Flex, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/adaptive-gallery', {
    edit: ({ attributes, setAttributes }) => {
        const { images } = attributes;
        const blockProps = useBlockProps();

        const addImage = (media) => {
            const newImages = [...images, {
                id: media.id,
                url: media.url,
                alt: media.alt || '',
                title: '',
                caption: ''
            }];
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
                                onSelect={addImage}
                                allowedTypes={['image']}
                                multiple={false}
                                render={({ open }) => (
                                    <Button onClick={open} className="button button-large">
                                        {__('Add Image', 'dedwards')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        
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
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-x-20 items-end">
                                {images.map((image, index) => {
                                    // Dynamic layout patterns
                                    let colSpan = 'md:col-span-6';
                                    let aspectClass = 'aspect-[4/5]';
                                    let textAlign = 'text-left';
                                    
                                    switch (index % 5) {
                                        case 0:
                                            colSpan = 'md:col-span-8';
                                            aspectClass = 'aspect-[16/9]';
                                            break;
                                        case 1:
                                            colSpan = 'md:col-span-4';
                                            aspectClass = 'aspect-[3/4]';
                                            textAlign = 'md:text-left text-right';
                                            break;
                                        case 2:
                                            colSpan = 'md:col-span-5';
                                            aspectClass = 'aspect-[4/5]';
                                            break;
                                        case 3:
                                            colSpan = 'md:col-span-7';
                                            aspectClass = 'aspect-square';
                                            break;
                                        case 4:
                                            colSpan = 'md:col-start-3 md:col-span-8';
                                            aspectClass = 'aspect-[16/7]';
                                            textAlign = 'text-center';
                                            break;
                                    }

                                    return (
                                        <div key={image.id} className={`${colSpan} reveal`}>
                                            <div className={`img-wrapper ${aspectClass} overflow-hidden bg-stone-100`}>
                                                <img 
                                                    src={image.url} 
                                                    alt={image.alt} 
                                                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                                />
                                            </div>
                                            {(image.title || image.caption) && (
                                                <div className={`mt-8 ${textAlign}`}>
                                                    {image.title && (
                                                        <h3 className="font-serif text-3xl font-light italic text-stone-900">
                                                            {image.title}
                                                        </h3>
                                                    )}
                                                    {image.caption && (
                                                        <p className="text-[10px] uppercase tracking-[0.3em] text-stone-500 mt-2">
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