#/bin/bash

/usr/local/bin/php /var/www/html/artisan storage:link
/usr/local/bin/php /var/www/html/artisan migrate
/usr/local/bin/apache2-foreground