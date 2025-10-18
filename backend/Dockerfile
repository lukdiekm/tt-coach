FROM php:8.4-apache

COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN sed -ri -e 's!AllowOverride None!AllowOverride All!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN apt-get update && apt-get install -y libsqlite3-dev libxml2-dev git unzip
RUN docker-php-ext-install xml pdo_mysql
RUN a2enmod rewrite
COPY . /var/www/html/
RUN composer install --prefer-dist
RUN chown -R www-data:www-data /var/www/html
ENTRYPOINT [ "/bin/bash", "/var/www/html/container-run.sh" ]