document.addEventListener('DOMContentLoaded', function() {
    const galleries = document.querySelectorAll('.masonry-gallery');
    
    galleries.forEach(function(elem) {
        // Wait for images to load before initializing
        const images = elem.querySelectorAll('img');
        let loadedImages = 0;
        
        function initMasonry() {
            const msnry = new Masonry(elem, {
                itemSelector: '.masonry-item',
                columnWidth: '.masonry-sizer',
                gutter: '.masonry-gutter',
                percentPosition: true
            });
            
            // Re-layout after a short delay to ensure everything is rendered
            setTimeout(function() {
                msnry.layout();
            }, 100);
        }
        
        if (images.length === 0) {
            // No images, initialize immediately
            initMasonry();
        } else {
            // Wait for all images to load
            images.forEach(function(img) {
                if (img.complete) {
                    loadedImages++;
                } else {
                    img.addEventListener('load', function() {
                        loadedImages++;
                        if (loadedImages === images.length) {
                            initMasonry();
                        }
                    });
                    
                    img.addEventListener('error', function() {
                        loadedImages++;
                        if (loadedImages === images.length) {
                            initMasonry();
                        }
                    });
                }
            });
            
            // If all images were already loaded
            if (loadedImages === images.length) {
                initMasonry();
            }
        }
    });
});