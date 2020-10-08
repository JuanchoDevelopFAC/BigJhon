Programas y versiones:

*Página Web:
    - Angular CLI: 9.0.7
    - Node: 12.4.1

*Servidor:
    -Node: 12.4.1
    -NPM: 6.14.4

*Base de datos:
    -MySQL: 8.0.19

Pasos para ejecutar la aplicación:

1. Asegurarse que las versiones son las que se describen anterior o superior a estas
2. Ejecutar el script de la base de datos que se encuentra en la carpeta "Scripts SQL" en MySQL
3. Crear instancia de MySQL y cambiar los datos de conexión en la carpeta "Server" en las rutas: "Server/models/empleadoModel.js" y "Server/models/vehiculoModel.js"
4. Instanciar un cmd y dirigirse a la carpeta "BigJhonApp" en esta ejecutar el comando: "ng serve --open"
5. Instanciar un cmd y dirigirse a la carpeta "Server" en esta ejecutar el comando: "npm run dev" 
6. Probar la aplicación en la ventana del navegador que se inicia.