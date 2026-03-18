#!/bin/bash

# Wait for MySQL to be ready
echo "Waiting for MySQL..."
until php -r "new PDO('mysql:host=${DB_HOST};dbname=${DB_DATABASE}', '${DB_USERNAME}', '${DB_PASSWORD}');" 2>/dev/null; do
    sleep 2
done
echo "MySQL is ready!"

# Run Laravel setup
php artisan key:generate --force
php artisan migrate --force
php artisan db:seed --force

# Start PHP-FPM in background
php-fpm &

# Start Nginx
nginx -g "daemon off;"
