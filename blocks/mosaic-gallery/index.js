import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { 
    PanelBody, 
    TextControl, 
    RangeControl, 
    SelectControl,
    ToggleControl 
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/mosaic-gallery', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'px-4 md:px-12 pb-32 bg-bronze-50'
        });

        const { 
            heading, 
            subheading, 
            postsPerPage, 
            category, 
            showTitles, 
            showMetadata,
            mosaicPattern 
        } = attributes;

        // Fetch work posts
        const { works, categories } = useSelect((select) => {
            const { getEntityRecords } = select('core');
            
            const query = {
                per_page: postsPerPage,
                status: 'publish',
                _embed: true
            };

            if (category) {
                query.work_category = category;
            }

            return {
                works: getEntityRecords('postType', 'work', query) || [],
                categories: getEntityRecords('taxonomy', 'work_category', { per_page: -1 }) || []
            };
        }, [postsPerPage, category]);

        // Helper to get meta value
        const getMeta = (work, metaKey) => {
            return work?.meta?.[metaKey] || '';
        };

        // Helper to get featured image
        const getFeaturedImage = (work) => {
            if (work?._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
                return work._embedded['wp:featuredmedia'][0].source_url;
            }
            return 'https://images.unsplash.com/photo-1628607153673-455b550117d9?q=80&w=1500&auto=format&fit=crop';
        };

        // Mosaic layout patterns - creates varied sizes and positions
        const getMosaicClasses = (index, total) => {
            const patterns = {
                dynamic: [
                    'col-span-2 row-span-2', // Large 2x2
                    'col-span-1 row-span-1', // Regular 1x1
                    'col-span-1 row-span-2', // Tall 1x2
                    'col-span-2 row-span-1', // Wide 2x1
                    'col-span-1 row-span-1', // Regular 1x1
                    'col-span-1 row-span-1', // Regular 1x1
                    'col-span-2 row-span-1', // Wide 2x1
                    'col-span-1 row-span-2', // Tall 1x2
                    'col-span-1 row-span-1', // Regular 1x1
                    'col-span-2 row-span-2', // Large 2x2
                ],
                uniform: [
                    'col-span-1 row-span-1', // All uniform
                ],
                featured: [
                    'col-span-2 row-span-3', // Hero piece
                    'col-span-1 row-span-1',
                    'col-span-1 row-span-1',
                    'col-span-1 row-span-2',
                    'col-span-1 row-span-1',
                    'col-span-1 row-span-1',
                    'col-span-2 row-span-1',
                    'col-span-1 row-span-1',
                ]
            };

            const pattern = patterns[mosaicPattern] || patterns.dynamic;
            return pattern[index % pattern.length];
        };

        // Get aspect ratio class based on mosaic size
        const getAspectClass = (gridClass) => {
            if (gridClass.includes('row-span-3')) return 'aspect-[3/4]';
            if (gridClass.includes('row-span-2') && gridClass.includes('col-span-2')) return 'aspect-[4/3]';
            if (gridClass.includes('row-span-2')) return 'aspect-[3/5]';
            if (gridClass.includes('col-span-2')) return 'aspect-[5/3]';
            return 'aspect-square';
        };

        // Format material/edition info
        const getWorkInfo = (work) => {
            const material = getMeta(work, '_work_material');
            const edition = getMeta(work, '_work_edition');
            const dimensions = getMeta(work, '_work_dimensions');
            
            if (edition) {
                return `${material || 'Bronze'} ${edition}`;
            } else if (dimensions) {
                return `${material || 'Bronze'}, ${dimensions}`;
            } else if (material) {
                return material;
            }
            return 'Bronze';
        };

        const categoryOptions = [
            { label: __('All Categories', 'dedwards'), value: '' },
            ...(categories.map(cat => ({
                label: cat.name,
                value: cat.id.toString()
            })))
        ];

        const mosaicPatternOptions = [
            { label: __('Dynamic Mosaic', 'dedwards'), value: 'dynamic' },
            { label: __('Uniform Grid', 'dedwards'), value: 'uniform' },
            { label: __('Featured First', 'dedwards'), value: 'featured' }
        ];

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Gallery Settings', 'dedwards')}>
                        <TextControl
                            label={__('Heading', 'dedwards')}
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                        />
                        <TextControl
                            label={__('Subheading', 'dedwards')}
                            value={subheading}
                            onChange={(value) => setAttributes({ subheading: value })}
                        />
                        <RangeControl
                            label={__('Number of Works', 'dedwards')}
                            value={postsPerPage}
                            onChange={(value) => setAttributes({ postsPerPage: value })}
                            min={4}
                            max={16}
                        />
                        <SelectControl
                            label={__('Category Filter', 'dedwards')}
                            value={category}
                            options={categoryOptions}
                            onChange={(value) => setAttributes({ category: value })}
                        />
                    </PanelBody>
                    
                    <PanelBody title={__('Layout Options', 'dedwards')}>
                        <SelectControl
                            label={__('Mosaic Pattern', 'dedwards')}
                            value={mosaicPattern}
                            options={mosaicPatternOptions}
                            onChange={(value) => setAttributes({ mosaicPattern: value })}
                        />
                        <ToggleControl
                            label={__('Show Titles', 'dedwards')}
                            checked={showTitles}
                            onChange={(value) => setAttributes({ showTitles: value })}
                        />
                        <ToggleControl
                            label={__('Show Metadata', 'dedwards')}
                            checked={showMetadata}
                            onChange={(value) => setAttributes({ showMetadata: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                <section {...blockProps}>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-bronze-200 pb-6">
                        <h2 className="text-sm font-display uppercase tracking-widest text-bronze-800">
                            {heading}
                        </h2>
                        <span className="text-xs font-sans uppercase tracking-[0.2em] text-bronze-500 mt-2 md:mt-0">
                            {subheading}
                        </span>
                    </div>

                    {/* Mosaic Grid Container */}
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] gap-4">
                        {works.length === 0 ? (
                            <div className="col-span-full flex items-center justify-center h-64 text-center text-bronze-600 bg-bronze-100 rounded-lg">
                                <p>{__('No works found. Add some work posts to display them here.', 'dedwards')}</p>
                            </div>
                        ) : (
                            works.map((work, index) => {
                                const gridClass = getMosaicClasses(index, works.length);
                                const aspectClass = getAspectClass(gridClass);
                                
                                return (
                                    <div 
                                        key={work.id} 
                                        className={`group cursor-pointer relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${gridClass}`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                                        
                                        <img 
                                            src={getFeaturedImage(work)} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                            alt={work.title.rendered}
                                        />
                                        
                                        {/* Overlay Content */}
                                        {(showTitles || showMetadata) && (
                                            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                                                {showTitles && (
                                                    <h3 className="font-serif text-white text-lg leading-tight mb-1">
                                                        {work.title.rendered}
                                                    </h3>
                                                )}
                                                {showMetadata && (
                                                    <p className="text-xs uppercase tracking-wider text-white/80">
                                                        {getWorkInfo(work)}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                        
                                        {/* Hover indicator */}
                                        <div className="absolute top-4 right-4 w-6 h-6 border-2 border-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                            <div className="w-full h-full bg-white rounded-full transform scale-0 group-hover:scale-75 transition-transform duration-200"></div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    
                    {/* Gallery Info */}
                    <div className="mt-12 text-center">
                        <p className="text-xs uppercase tracking-[0.3em] text-bronze-500">
                            {works.length} {works.length === 1 ? __('Work', 'dedwards') : __('Works', 'dedwards')}
                        </p>
                    </div>
                </section>
            </>
        );
    },

    save: () => {
        // Rendered via PHP
        return null;
    }
});