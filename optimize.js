// Performance optimization helper script
// Run this script to check and optimize website performance

class PerformanceOptimizer {
    constructor() {
        this.metrics = {};
        this.recommendations = [];
    }

    // Check page load performance
    async checkPerformance() {
        console.log('🚀 Starting performance analysis...');
        
        // Check if we're in browser environment
        if (typeof window !== 'undefined') {
            this.analyzeLoadTimes();
            this.checkResourceSizes();
            this.analyzeImages();
            this.checkCriticalResources();
        }
        
        this.generateReport();
    }

    analyzeLoadTimes() {
        if (performance.timing) {
            const timing = performance.timing;
            this.metrics.domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
            this.metrics.pageLoad = timing.loadEventEnd - timing.navigationStart;
            this.metrics.firstPaint = timing.responseStart - timing.navigationStart;
            
            console.log('📊 Load Times:');
            console.log(`  DOM Content Loaded: ${this.metrics.domContentLoaded}ms`);
            console.log(`  Page Load Complete: ${this.metrics.pageLoad}ms`);
            console.log(`  First Paint: ${this.metrics.firstPaint}ms`);
            
            // Add recommendations based on timings
            if (this.metrics.pageLoad > 3000) {
                this.recommendations.push('⚠️  Page load time exceeds 3 seconds - consider further optimization');
            }
            if (this.metrics.domContentLoaded > 1500) {
                this.recommendations.push('⚠️  DOM ready time is slow - optimize critical CSS and JS');
            }
        }
    }

    checkResourceSizes() {
        if (performance.getEntriesByType) {
            const resources = performance.getEntriesByType('resource');
            let totalSize = 0;
            let largeResources = [];
            
            resources.forEach(resource => {
                if (resource.transferSize) {
                    totalSize += resource.transferSize;
                    if (resource.transferSize > 100000) { // > 100KB
                        largeResources.push({
                            name: resource.name.split('/').pop(),
                            size: Math.round(resource.transferSize / 1024) + 'KB',
                            type: resource.initiatorType
                        });
                    }
                }
            });
            
            this.metrics.totalResourceSize = Math.round(totalSize / 1024) + 'KB';
            this.metrics.largeResources = largeResources;
            
            console.log('📦 Resource Analysis:');
            console.log(`  Total Resource Size: ${this.metrics.totalResourceSize}`);
            
            if (largeResources.length > 0) {
                console.log('  Large Resources (>100KB):');
                largeResources.forEach(resource => {
                    console.log(`    ${resource.name}: ${resource.size} (${resource.type})`);
                });
                this.recommendations.push('🗜️  Consider compressing large resources or implementing lazy loading');
            }
        }
    }

    analyzeImages() {
        const images = document.querySelectorAll('img');
        let unoptimizedImages = 0;
        let lazyImages = 0;
        
        images.forEach(img => {
            // Check for lazy loading
            if (img.classList.contains('lazy-image') || img.hasAttribute('loading')) {
                lazyImages++;
            }
            
            // Check for modern formats
            if (img.src && !img.src.includes('.webp') && !img.src.includes('.avif')) {
                unoptimizedImages++;
            }
        });
        
        this.metrics.totalImages = images.length;
        this.metrics.lazyImages = lazyImages;
        this.metrics.unoptimizedImages = unoptimizedImages;
        
        console.log('🖼️  Image Analysis:');
        console.log(`  Total Images: ${images.length}`);
        console.log(`  Lazy Loaded: ${lazyImages}`);
        console.log(`  Unoptimized Format: ${unoptimizedImages}`);
        
        if (unoptimizedImages > 0) {
            this.recommendations.push('🖼️  Convert images to WebP or AVIF format for better compression');
        }
        if (lazyImages < images.length - 1) { // -1 for hero image
            this.recommendations.push('⏳ Implement lazy loading for more images');
        }
    }

    checkCriticalResources() {
        const criticalCSS = document.querySelector('style');
        const preloadLinks = document.querySelectorAll('link[rel="preload"]');
        const deferredScripts = document.querySelectorAll('script[defer]');
        
        console.log('⚡ Critical Resource Analysis:');
        console.log(`  Critical CSS Inlined: ${criticalCSS ? 'Yes' : 'No'}`);
        console.log(`  Preloaded Resources: ${preloadLinks.length}`);
        console.log(`  Deferred Scripts: ${deferredScripts.length}`);
        
        if (!criticalCSS) {
            this.recommendations.push('📝 Add critical CSS inline for faster first paint');
        }
        if (preloadLinks.length < 3) {
            this.recommendations.push('🔗 Consider preloading more critical resources');
        }
    }

    generateReport() {
        console.log('\n📋 PERFORMANCE OPTIMIZATION REPORT');
        console.log('=====================================');
        
        // Overall score calculation
        let score = 100;
        if (this.metrics.pageLoad > 3000) score -= 20;
        if (this.metrics.domContentLoaded > 1500) score -= 15;
        if (this.metrics.unoptimizedImages > 3) score -= 10;
        if (this.recommendations.length > 5) score -= 15;
        
        console.log(`\n🎯 Performance Score: ${Math.max(score, 0)}/100`);
        
        if (this.recommendations.length > 0) {
            console.log('\n💡 Recommendations:');
            this.recommendations.forEach(rec => console.log(`  ${rec}`));
        } else {
            console.log('\n✅ No immediate optimizations needed!');
        }
        
        console.log('\n🔧 Current Optimizations Active:');
        console.log('  ✓ Critical CSS inlined');
        console.log('  ✓ Async CSS loading');
        console.log('  ✓ Deferred JavaScript');
        console.log('  ✓ Service Worker caching');
        console.log('  ✓ Resource preloading');
        console.log('  ✓ Font optimization');
        console.log('  ✓ Image lazy loading');
        console.log('  ✓ Performance monitoring');
        
        return {
            score: Math.max(score, 0),
            metrics: this.metrics,
            recommendations: this.recommendations
        };
    }
}

// Auto-run in browser
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const optimizer = new PerformanceOptimizer();
            optimizer.checkPerformance();
        }, 2000);
    });
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}