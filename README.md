## Uso

### Clona el repositorio
Comando para clonar el repositorio

```bash
git clone -b master https://github.com/RichardFuentes369/atljavierbaron 
```

### Nota importante 1
Dentro de atljavierbaron, abra una carpeta json la cual contendra un archivo llamado "prueba.json" que se uso para precargar la data inicial del front. <br>
Se creo un boton para crear a deseo nuevos elementos. 

## Proyecto angular

### Ingresa a la carpeta (atljavierbaron)
```bash 
cd atljavierbaron
```
### Ingresa al proyecto de angular
```bash
cd angular
```
### Instala los paquetes de node
```bash
npm i
```
### Corre el proyecto
```bash
ng serve
```

### Nota importante 2
Dentro de atljavierbaron>php>postman, abra una archivo json el cual se podra importar a postamn para el consumo de las apis. (GET|POST|DELETE) http://atl.local/contacts/ => Se creo un entorno virtual en apache el cual se llamo atl.local

```
METHODO GET => http://atl.local/contacts/1 (LISTA INDIVIDUALMENTE, EL NÚMERO ES EL ID)
METHODO GET => http://atl.local/contacts (LISTA TODOS LOS CONTACTOS)
METHODO POST => http://atl.local/contacts (CREA UN CONTACTOS)
    => datos a enviar
    {
        "name": "Jorge",
        "lastname": "Perez",
        "email": "jorge.perez@example.com",
        "phones": [
            "1234567890",
            "0987654321"
        ]
    }
METHODO DELETE => http://atl.local/contacts/1 (ELIMINA UN CONTACTOS, EL NÚMERO ES EL ID)
```

## Proyecto php

### Ingresa a la carpeta (atljavierbaron)
```bash
cd atljavierbaron
```
### Ingresa al proyecto de php
```bash
cd php
```

### Creacion bd en mysql
En el archivo *"php>database>databases.sql"*, encontraremos la base de datos llamada *atl_prueba*
```
CREATE DATABASE atl_prueba;
USE atl_prueba;

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE phones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contact_id INT NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
);
```

### Configura la conexion a la bd

En el archivo *"php>src>config>databases.php"*, encontraras dichas variables las cuales fueron creadas para la prueba (alterar de acuerdo a la conexion de la bd que tengan ustedes)

```
define('DB_HOST', 'localhost');<br>
define('DB_USER', 'root');<br>
define('DB_PASSWORD', '9601');<br> 
define('DB_NAME', 'atl_prueba');<br> 
```

### Una vez configuremos la conexion a base de datos

Ejecutamos el siguiente codigo, si estamos usando o usaremos apache2
DIRECTORIO_DESCARGA => donde tenemos el proyecto

```
sudo cp -r DIRECTORIO_DESCARGA/atl_prueba/php/ /var/www/html/
```

Lo que hace esto es copiar el proyecto que descargamos de git en /var/www/html/

## Configuracion apache2

### Creacion del virtual host
```bash
sudo nano /etc/apache2/sites-available/atl.local.conf
```
Aquí es importante el ServerName, el DocumentRoot y Directory <br>
pues son los que apuntan al proyecto
```
<VirtualHost *:80>
    ServerAdmin webmaster@atl.local
    ServerName atl.local
    ServerAlias www.atl.local

    DocumentRoot /var/www/html/php/public

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    <Directory /var/www/html/php/public>
        Options Indexes FollowSymLinks
        AllowOverride All         
        Require all granted

        <LimitExcept GET POST PUT DELETE>
            Require all denied
        </LimitExcept>
    </Directory>
</VirtualHost>

```
Luego de creado ejecutamos lo siguiente para habilitar el dominio
```
sudo a2ensite atl.local.conf
sudo systemctl restart apache2
```
Verificamos si hay errores <br>
Si no nos sale en rojo y nos dice *"Syntax OK"*, quiere decir que vamos por buen camino
```
sudo apache2ctl configtest
```
### Creacion del dominio local
Luego nos dirigimos a crear el dominio en nuestra carpeta etc <br>
```
sudo nano /etc/hosts
```
Se nos abrira un archivo en el cual pondremos, debajo de localhost o iniciando el archivo
```
127.0.0.1 atl.local
```
Luego reiniciamos apache2
```
sudo systemctl restart apache2
```
Ya podremos usar el proyecto de php => esto es para un SO linux