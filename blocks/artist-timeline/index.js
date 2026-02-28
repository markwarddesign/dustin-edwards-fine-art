import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, TextControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

registerBlockType('dedwards/artist-timeline', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps({
            className: 'max-w-4xl mx-auto px-6 md:px-12 py-24 border-t border-stone-200 bg-white'
        });
        const { heading, events } = attributes;

        const addEvent = () => {
            const newEvents = [...events, { year: '', title: '', description: '' }];
            setAttributes({ events: newEvents });
        };

        const updateEvent = (index, field, value) => {
            const newEvents = [...events];
            newEvents[index][field] = value;
            setAttributes({ events: newEvents });
        };

        const removeEvent = (index) => {
            const newEvents = events.filter((_, i) => i !== index);
            setAttributes({ events: newEvents });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Timeline Settings', 'dedwards')}>
                        <TextControl
                            label={__('Heading', 'dedwards')}
                            value={heading}
                            onChange={(value) => setAttributes({ heading: value })}
                        />
                    </PanelBody>
                </InspectorControls>

                <div {...blockProps}>
                    <h3 className="font-display text-center text-xl uppercase tracking-widest mb-12">
                        {heading}
                    </h3>
                    <div className="space-y-12">
                        {events.map((event, index) => (
                            <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-12">
                                <input
                                    type="text"
                                    value={event.year}
                                    onChange={(e) => updateEvent(index, 'year', e.target.value)}
                                    placeholder="Year"
                                    className="font-display text-stone-400 w-full md:w-24 md:text-right border-b border-stone-300 focus:border-blue-400 outline-none"
                                />
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={event.title}
                                        onChange={(e) => updateEvent(index, 'title', e.target.value)}
                                        placeholder="Event Title"
                                        className="font-serif text-xl text-stone-900 mb-2 w-full border-b border-stone-300 focus:border-blue-400 outline-none"
                                    />
                                    <textarea
                                        value={event.description}
                                        onChange={(e) => updateEvent(index, 'description', e.target.value)}
                                        placeholder="Event Description"
                                        className="text-stone-500 font-light text-sm w-full border-b border-stone-300 focus:border-blue-400 outline-none resize-none"
                                        rows="2"
                                    />
                                    <Button
                                        variant="tertiary"
                                        isDestructive
                                        onClick={() => removeEvent(index)}
                                        className="mt-2"
                                    >
                                        Remove Event
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button
                        variant="secondary"
                        onClick={addEvent}
                        className="mt-8"
                    >
                        + Add Event
                    </Button>
                </div>
            </>
        );
    },

    save: () => {
        return null;
    }
});
