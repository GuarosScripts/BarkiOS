# 1. Usamos la imagen oficial de PHP con Apache
FROM php:8.2-apache

# 2. Instalamos dependencias del sistema y extensiones de PHP necesarias para MySQL
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    curl \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql gd

# 3. Habilitamos el módulo rewrite de Apache (crucial para rutas en PHP/Laravel/proyectos web)
RUN a2enmod rewrite

# 4. Instalamos Composer directamente desde su imagen oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 5. Establecemos el directorio de trabajo
WORKDIR /var/www/html

# 6. Copiamos los archivos de configuración de dependencias primero 
# (Esto optimiza el tiempo de construcción de la imagen si no cambian las librerías)
COPY composer.json composer.lock* ./

# 7. Instalamos las dependencias de Composer
RUN composer install --no-interaction --no-scripts --no-dev --optimize-autoloader

# 8. Copiamos el resto del código de tu proyecto
COPY . .

# 9. Ajustamos los permisos para que Apache pueda leer y escribir en el proyecto
RUN chown -R www-data:www-data /var/www/html

# 10. Exponemos el puerto 80
EXPOSE 80

# 11. Iniciamos Apache en el primer plano
CMD ["apache2-foreground"]