import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { message, alertType, isDismissible } = attributes;
    const blockProps = useBlockProps.save({
        className: `alert-box alert-${alertType}`,
    });

    return (
        <div {...blockProps}>
            <RichText.Content
                tagName="p"
                className="alert-message"
                value={message}
            />
            {isDismissible && (
                <button
                    type="button"
                    className="alert-close"
                    aria-label="Close alert"
                >
                    &times;
                </button>
            )}
        </div>
    );
}
