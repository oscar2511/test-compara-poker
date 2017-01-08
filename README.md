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
    Cambiar "var url = 'http://localhost/app_dev.php/check-winner'" por var "url = 'http://localhost/test-compara-poker/web/app_dev.php/check-winner'" en el archivo
    "test-compara-poker/src/TestBundle/Resources/public/compara/angular/controllers/pokerController.js" o la ubicación de su host virtual.

Instalar assets: * php app/console assets:install --symlink;
                 * php app/console assets:install;
