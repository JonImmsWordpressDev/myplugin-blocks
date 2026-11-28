import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { format } from '@wordpress/date';
import { decodeEntities } from '@wordpress/html-entities';
import './style.scss';

function Edit({ attributes, setAttributes }) {
    const { numberOfPosts, displayExcerpt, displayDate, displayAuthor, displayFeaturedImage, order } = attributes;

    const posts = useSelect(
        (select) => {
            return select('core').getEntityRecords('postType', 'post', {
                per_page: numberOfPosts,
                _embed: true,
                order: order,
                orderby: 'date',
            });
        },
        [numberOfPosts, order]
    );

    const blockProps = useBlockProps({
        className: 'latest-posts',
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Post Settings', 'myplugin-blocks')}>
                    <RangeControl
                        label={__('Number of Posts', 'myplugin-blocks')}
                        value={numberOfPosts}
                        onChange={(value) => setAttributes({ numberOfPosts: value })}
                        min={1}
                        max={10}
                    />
                    <SelectControl
                        label={__('Order', 'myplugin-blocks')}
                        value={order}
                        options={[
                            { label: __('Newest First', 'myplugin-blocks'), value: 'desc' },
                            { label: __('Oldest First', 'myplugin-blocks'), value: 'asc' },
                        ]}
                        onChange={(value) => setAttributes({ order: value })}
                    />
                </PanelBody>
                <PanelBody title={__('Display Settings', 'myplugin-blocks')}>
                    <ToggleControl
                        label={__('Display Featured Image', 'myplugin-blocks')}
                        checked={displayFeaturedImage}
                        onChange={(value) => setAttributes({ displayFeaturedImage: value })}
                    />
                    <ToggleControl
                        label={__('Display Date', 'myplugin-blocks')}
                        checked={displayDate}
                        onChange={(value) => setAttributes({ displayDate: value })}
                    />
                    <ToggleControl
                        label={__('Display Author', 'myplugin-blocks')}
                        checked={displayAuthor}
                        onChange={(value) => setAttributes({ displayAuthor: value })}
                    />
                    <ToggleControl
                        label={__('Display Excerpt', 'myplugin-blocks')}
                        checked={displayExcerpt}
                        onChange={(value) => setAttributes({ displayExcerpt: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <h3>{__('Latest Posts', 'myplugin-blocks')}</h3>
                {!posts ? (
                    <p>{__('Loading...', 'myplugin-blocks')}</p>
                ) : posts.length === 0 ? (
                    <p>{__('No posts found.', 'myplugin-blocks')}</p>
                ) : (
                    <ul className="latest-posts-list">
                        {posts.map((post) => {
                            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                            const author = post._embedded?.author?.[0]?.name;
                            const title = decodeEntities(post.title.rendered);

                            return (
                                <li key={post.id} className="latest-post-item">
                                    {displayFeaturedImage && featuredImage && (
                                        <div className="post-thumbnail">
                                            <img src={featuredImage} alt={title} />
                                        </div>
                                    )}
                                    <div className="post-content">
                                        <h4 className="post-title">
                                            <a href={post.link}>{title || __('(No title)', 'myplugin-blocks')}</a>
                                        </h4>
                                        <div className="post-meta">
                                            {displayDate && (
                                                <span className="post-date">
                                                    {format('F j, Y', post.date)}
                                                </span>
                                            )}
                                            {displayAuthor && author && (
                                                <span className="post-author">
                                                    {__('by', 'myplugin-blocks')} {author}
                                                </span>
                                            )}
                                        </div>
                                        {displayExcerpt && post.excerpt.rendered && (
                                            <div
                                                className="post-excerpt"
                                                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                            />
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </>
    );
}

registerBlockType('myplugin/latest-posts', {
    edit: Edit,
});
