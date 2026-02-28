document.addEventListener('DOMContentLoaded', function() {
    // Initialize masonry after a short delay to ensure everything is loaded
    setTimeout(function() {
        var elem = document.querySelector('.masonry-gallery');
        if (elem && typeof Masonry !== 'undefined') {
            var msnry = new Masonry(elem, {
                itemSelector: '.masonry-item',
                columnWidth: '.masonry-sizer',
                gutter: '.masonry-gutter',
                percentPosition: true
            });
            
            // Force layout after initialization
            setTimeout(function() {
                msnry.layout();
            }, 100);
        }
    }, 500);
});