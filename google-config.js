// ===== GOOGLE ANALYTICS & SEARCH CONSOLE CONFIGURATION =====
// Advanced SEO tracking and analytics setup

// Google Analytics 4 Configuration
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA4 Measurement ID

// Initialize Google Analytics 4
function initializeGA4() {
    // Load gtag
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Configure gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
        // Enhanced ecommerce for AI service tracking
        send_page_view: true,
        // Custom parameters for AI model tracking
        custom_map: {
            'custom_parameter_1': 'ai_model_version',
            'custom_parameter_2': 'user_interaction_type'
        }
    });

    // Track custom events for AI interactions
    window.trackAIInteraction = function(action, model_version = '1.0') {
        gtag('event', action, {
            event_category: 'AI_Interaction',
            event_label: 'Qwen-Image',
            ai_model_version: model_version,
            page_title: document.title,
            page_location: window.location.href
        });
    };

    // Track image gallery interactions
    window.trackImageView = function(imageName, imageCategory) {
        gtag('event', 'view_item', {
            event_category: 'Image_Gallery',
            event_label: imageName,
            item_category: imageCategory,
            value: 1
        });
    };

    // Track demo interactions
    window.trackDemoInteraction = function(demoType) {
        gtag('event', 'engage_with_demo', {
            event_category: 'Demo_Interaction',
            event_label: demoType,
            engagement_time_msec: Date.now()
        });
    };
}

// Google Search Console verification and sitemap submission
function configureSearchConsole() {
    // Add meta verification tag
    const meta = document.createElement('meta');
    meta.name = 'google-site-verification';
    meta.content = 'YOUR_VERIFICATION_CODE_HERE'; // Replace with actual code
    document.head.appendChild(meta);

    // Auto-submit sitemap to Google
    const submitSitemap = async () => {
        try {
            const sitemapUrl = `${window.location.origin}/sitemap.xml`;
            console.log(`Sitemap available at: ${sitemapUrl}`);
            
            // Log sitemap submission for manual verification
            console.log('Submit this sitemap URL to Google Search Console:', sitemapUrl);
        } catch (error) {
            console.error('Sitemap submission error:', error);
        }
    };

    submitSitemap();
}

// Core Web Vitals monitoring
function monitorCoreWebVitals() {
    // Import web-vitals library
    const script = document.createElement('script');
    script.type = 'module';
    script.textContent = `
        import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'https://unpkg.com/web-vitals@3/dist/web-vitals.js';

        function sendToAnalytics(metric) {
            gtag('event', metric.name, {
                event_category: 'Core Web Vitals',
                value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                event_label: metric.id,
                non_interaction: true,
            });
        }

        getCLS(sendToAnalytics);
        getFID(sendToAnalytics);
        getFCP(sendToAnalytics);
        getLCP(sendToAnalytics);
        getTTFB(sendToAnalytics);
    `;
    document.head.appendChild(script);
}

// SEO monitoring and reporting
function initializeSEOMonitoring() {
    const seoMetrics = {
        pageLoadTime: 0,
        imagesLoaded: 0,
        totalImages: 0,
        externalLinksClicked: 0,
        internalLinksClicked: 0,
        timeOnPage: 0,
        scrollDepth: 0
    };

    // Track page load time
    window.addEventListener('load', function() {
        seoMetrics.pageLoadTime = performance.now();
        
        gtag('event', 'page_load_time', {
            event_category: 'Performance',
            value: Math.round(seoMetrics.pageLoadTime),
            event_label: 'Initial Load'
        });
    });

    // Track image loading
    const images = document.querySelectorAll('img');
    seoMetrics.totalImages = images.length;
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            seoMetrics.imagesLoaded++;
            
            if (seoMetrics.imagesLoaded === seoMetrics.totalImages) {
                gtag('event', 'all_images_loaded', {
                    event_category: 'Performance',
                    value: seoMetrics.totalImages,
                    event_label: 'Image Loading Complete'
                });
            }
        });
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            seoMetrics.scrollDepth = maxScroll;
            
            // Track milestone scroll depths
            if ([25, 50, 75, 90].includes(scrollPercent)) {
                gtag('event', 'scroll_depth', {
                    event_category: 'Engagement',
                    value: scrollPercent,
                    event_label: `${scrollPercent}% Scrolled`
                });
            }
        }
    });

    // Track time on page
    const startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        seoMetrics.timeOnPage = timeSpent;
        
        gtag('event', 'time_on_page', {
            event_category: 'Engagement',
            value: timeSpent,
            event_label: 'Seconds Spent'
        });
    });

    // Track link clicks
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            const href = e.target.href;
            const isExternal = !href.includes(window.location.hostname);
            
            if (isExternal) {
                seoMetrics.externalLinksClicked++;
                gtag('event', 'click', {
                    event_category: 'External Link',
                    event_label: href,
                    value: 1
                });
            } else {
                seoMetrics.internalLinksClicked++;
                gtag('event', 'click', {
                    event_category: 'Internal Link',
                    event_label: href,
                    value: 1
                });
            }
        }
    });

    // Export metrics for debugging
    window.getSEOMetrics = () => seoMetrics;
}

// Structured data validation
function validateStructuredData() {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    let validSchemas = 0;
    
    scripts.forEach(script => {
        try {
            const data = JSON.parse(script.textContent);
            if (data['@context'] && data['@type']) {
                validSchemas++;
            }
        } catch (error) {
            console.error('Invalid structured data:', error);
        }
    });

    gtag('event', 'structured_data_validation', {
        event_category: 'SEO',
        value: validSchemas,
        event_label: 'Valid Schemas Found'
    });

    console.log(`Found ${validSchemas} valid structured data schemas`);
}

// Initialize all SEO tracking
function initializeSEOTracking() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initializeGA4();
            configureSearchConsole();
            monitorCoreWebVitals();
            initializeSEOMonitoring();
            validateStructuredData();
        });
    } else {
        initializeGA4();
        configureSearchConsole();
        monitorCoreWebVitals();
        initializeSEOMonitoring();
        validateStructuredData();
    }
}

// Auto-initialize when script loads
initializeSEOTracking();

// Export functions for manual use
window.QwenImageSEO = {
    trackAIInteraction: window.trackAIInteraction,
    trackImageView: window.trackImageView,
    trackDemoInteraction: window.trackDemoInteraction,
    getSEOMetrics: window.getSEOMetrics,
    validateStructuredData
};

console.log('🚀 Qwen-Image SEO tracking initialized successfully!');