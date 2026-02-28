import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, RangeControl, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/collection-section', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'px-4 md:px-12 pb-32 bg-bronze-50'
        });

        const { heading, subheading, postsPerPage, category } = attributes;

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

        // Stagger classes for visual rhythm
        const getStaggerClass = (index) => {
            const pattern = ['', 'md:mt-16', '', 'md:mt-16', '', 'md:mt-32'];
            return pattern[index % pattern.length];
        };

        // Aspect ratio variations
        const getAspectClass = (index) => {
            const pattern = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[3/5]', 'aspect-square'];
            return pattern[index % pattern.length];
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

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Collection Settings', 'dedwards')}>
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
                            min={3}
                            max={12}
                        />
                        <SelectControl
                            label={__('Category Filter', 'dedwards')}
                            value={category}
                            options={categoryOptions}
                            onChange={(value) => setAttributes({ category: value })}
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

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-10">
                        {works.length === 0 ? (
                            <p className="col-span-full text-center text-bronze-600">
                                {__('No works found. Add some work posts to display them here.', 'dedwards')}
                            </p>
                        ) : (
                            works.map((work, index) => (
                                <div key={work.id} className={`group cursor-pointer ${getStaggerClass(index)}`}>
                                    <div className={`relative overflow-hidden ${getAspectClass(index)} bg-stone-200 shadow-xl`}>
                                        <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                                        <img 
                                            src={getFeaturedImage(work)} 
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                            alt={work.title.rendered}
                                        />
                                    </div>
                                    <div className="mt-6 flex flex-col items-center text-center">
                                        <h3 className="font-serif text-2xl italic text-stone-800">
                                            {work.title.rendered}
                                        </h3>
                                        <p className="text-[10px] uppercase tracking-[0.2em] text-bronze-600 mt-2">
                                            {getWorkInfo(work)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
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
