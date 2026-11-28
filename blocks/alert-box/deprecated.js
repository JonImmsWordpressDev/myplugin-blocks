import { useBlockProps, RichText } from '@wordpress/block-editor';
import metadata from './block.json';

const { attributes, supports } = metadata;

// Markup saved before the dismiss button moved to view.js. The second entry is
// the same markup after wp_kses_post removed the inline onclick (users without
// unfiltered_html), which never matched save() and showed as invalid.
function legacySave(withInlineHandler) {
    return function save({ attributes: { message, alertType, isDismissible } }) {
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
                        className="alert-close"
                        aria-label="Close alert"
                        onClick={
                            withInlineHandler
                                ? "this.parentElement.style.display='none'"
                                : undefined
                        }
                    >
                        &times;
                    </button>
                )}
            </div>
        );
    };
}

export default [
    { attributes, supports, save: legacySave(true) },
    { attributes, supports, save: legacySave(false) },
];
