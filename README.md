Test code compara.cl
========================

Implementación de "test code poker".

Framework : Symfony 2.8

Installation
--------------

Install:

* php5-intl

Configuración
--------------

Luego de clonar el repositorio ejecutar: composer install

En caso de instalar en servidor apache:
    Cambiar "var url = 'http://localhost/app_dev.php/check-winner'" por var "url = 'http://localhost/test-compara-poker/web/app_dev.php/check-winner'";

Instalar assets: * php app/console assets:install --symlink;
                 * php app/console assets:install;
