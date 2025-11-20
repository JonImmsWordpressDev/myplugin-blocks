import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import './style.scss';

export default function Edit({ attributes, setAttributes }) {
    const { message, alertType, isDismissible } = attributes;
    const blockProps = useBlockProps({
        className: `alert-box alert-${alertType}`,
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Alert Settings', 'myplugin-blocks')}>
                    <SelectControl
                        label={__('Alert Type', 'myplugin-blocks')}
                        value={alertType}
                        options={[
                            { label: __('Info', 'myplugin-blocks'), value: 'info' },
                            { label: __('Success', 'myplugin-blocks'), value: 'success' },
                            { label: __('Warning', 'myplugin-blocks'), value: 'warning' },
                            { label: __('Error', 'myplugin-blocks'), value: 'error' },
                        ]}
                        onChange={(value) => setAttributes({ alertType: value })}
                    />
                    <ToggleControl
                        label={__('Dismissible', 'myplugin-blocks')}
                        checked={isDismissible}
                        onChange={(value) => setAttributes({ isDismissible: value })}
                        help={__(
                            'Allow users to dismiss this alert',
                            'myplugin-blocks'
                        )}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <RichText
                    tagName="p"
                    className="alert-message"
                    value={message}
                    onChange={(value) => setAttributes({ message: value })}
                    placeholder={__('Enter alert message...', 'myplugin-blocks')}
                />
                {isDismissible && (
                    <button
                        className="alert-close"
                        aria-label={__('Close alert', 'myplugin-blocks')}
                    >
                        &times;
                    </button>
                )}
            </div>
        </>
    );
}
