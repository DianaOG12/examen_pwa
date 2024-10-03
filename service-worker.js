// Instalación
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('pwa-cache-v2').then((cache) => {
            // Añadir archivos esenciales a la caché
            return cache.addAll([
                '/',
                '/examen_pwa/script.js',
                '/examen_pwa/style.css',
                '/examen_pwa/index.html',
                '/examen_pwa/manifest.json'  
            ]);
        }).catch((error) => {
            console.error('Error al abrir la caché: ', error);
        })
    );
});

// Activación
self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['pwa-cache-v2'];
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).catch((error) => {
            console.error('Error al activar y limpiar caché: ', error);
        })
    );
});

// peticiones fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response; // Si el recurso está en la caché, lo devuelve
            }

            // Si el recurso no está en la caché, lo pide a la red
            return fetch(event.request).catch(() => {
                // y si la red flla manda un er4ror
                console.error('Error al intentar obtener el recurso:', event.request.url);
            });
        })
    );
});
