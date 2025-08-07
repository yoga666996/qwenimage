// Service Worker for Qwen-Image website caching
const CACHE_NAME = 'qwen-image-v1.2';
const CACHE_URLS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/about.html',
    '/help.html',
    '/blog.html',
    '/terms.html',
    '/privacy.html',
    '/merge3.jpg',
    '/bench.png',
    '/aliyun.png',
    '/tongyi.png',
    '/book.png',
    '/small.png',
    '/s2.jpg',
    '/bi.png',
    '/s3.jpg'
];

// Install event - cache resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching essential resources');
                return cache.addAll(CACHE_URLS);
            })
            .then(() => {
                console.log('Service Worker installed successfully');
                return self.skipWaiting();
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            );
        }).then(() => {
            console.log('Service Worker activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip external requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version if available
                if (response) {
                    console.log('Serving from cache:', event.request.url);
                    return response;
                }

                // Otherwise fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Don't cache if not a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Add to cache for future use
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // Network failed, try to serve offline page for HTML requests
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// Background sync for analytics
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // Perform background tasks like sending analytics data
    console.log('Background sync triggered');
}

// Push notifications (if needed in future)
self.addEventListener('push', event => {
    if (event.data) {
        const options = {
            body: event.data.text(),
            icon: '/favicon.ico',
            badge: '/favicon.ico'
        };

        event.waitUntil(
            self.registration.showNotification('Qwen-Image Update', options)
        );
    }
});