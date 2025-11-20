<?php
/**
 * Render callback for the Latest Posts block
 *
 * @param array    $attributes Block attributes
 * @param string   $content    Block content
 * @param WP_Block $block      Block instance
 * @return string Rendered block HTML
 */

// Extract attributes with defaults
$number_of_posts = isset($attributes['numberOfPosts']) ? absint($attributes['numberOfPosts']) : 5;
$display_excerpt = isset($attributes['displayExcerpt']) ? (bool) $attributes['displayExcerpt'] : true;
$display_date = isset($attributes['displayDate']) ? (bool) $attributes['displayDate'] : true;
$display_author = isset($attributes['displayAuthor']) ? (bool) $attributes['displayAuthor'] : false;
$display_featured_image = isset($attributes['displayFeaturedImage']) ? (bool) $attributes['displayFeaturedImage'] : false;
$order = isset($attributes['order']) ? sanitize_text_field($attributes['order']) : 'desc';

// Query posts
$query_args = array(
    'posts_per_page' => $number_of_posts,
    'post_status'    => 'publish',
    'order'          => $order,
    'orderby'        => 'date',
    'no_found_rows'  => true,
);

$recent_posts = new WP_Query($query_args);

// Generate wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes(array(
    'class' => 'latest-posts',
));

// Start output buffering
ob_start();
?>

<div <?php echo $wrapper_attributes; ?>>
    <h3><?php echo esc_html__('Latest Posts', 'myplugin-blocks'); ?></h3>

    <?php if ($recent_posts->have_posts()) : ?>
        <ul class="latest-posts-list">
            <?php while ($recent_posts->have_posts()) : $recent_posts->the_post(); ?>
                <li class="latest-post-item">
                    <?php if ($display_featured_image && has_post_thumbnail()) : ?>
                        <div class="post-thumbnail">
                            <a href="<?php echo esc_url(get_permalink()); ?>">
                                <?php the_post_thumbnail('medium'); ?>
                            </a>
                        </div>
                    <?php endif; ?>

                    <div class="post-content">
                        <h4 class="post-title">
                            <a href="<?php echo esc_url(get_permalink()); ?>">
                                <?php echo esc_html(get_the_title()); ?>
                            </a>
                        </h4>

                        <?php if ($display_date || $display_author) : ?>
                            <div class="post-meta">
                                <?php if ($display_date) : ?>
                                    <span class="post-date">
                                        <?php echo esc_html(get_the_date()); ?>
                                    </span>
                                <?php endif; ?>

                                <?php if ($display_author) : ?>
                                    <span class="post-author">
                                        <?php
                                        printf(
                                            /* translators: %s: author name */
                                            esc_html__('by %s', 'myplugin-blocks'),
                                            esc_html(get_the_author())
                                        );
                                        ?>
                                    </span>
                                <?php endif; ?>
                            </div>
                        <?php endif; ?>

                        <?php if ($display_excerpt) : ?>
                            <div class="post-excerpt">
                                <?php echo wp_kses_post(get_the_excerpt()); ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </li>
            <?php endwhile; ?>
        </ul>
    <?php else : ?>
        <p><?php echo esc_html__('No posts found.', 'myplugin-blocks'); ?></p>
    <?php endif; ?>
</div>

<?php
// Reset post data
wp_reset_postdata();

// Return buffered content
return ob_get_clean();
