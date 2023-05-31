# Desafío Entregable 9

Fecha: April 18, 2023 → April 25, 2023
Hecho: No
Proyecto: Programación Backend (https://www.notion.so/Programaci-n-Backend-61ef391715bb4a23add5da040ced0165)

# **Logging y performance**

## ****Implementación de logger****

### **Consigna**

- Basado en nuestro proyecto principal, implementar un logger

### **Aspectos a incluir**

- Primero, definir un sistema de niveles que tenga la siguiente prioridad (de menor a mayor):

**debug, http, info, warning, error, fatal**

- Después implementar un logger para desarrollo y un logger para producción, el logger de desarrollo deberá loggear a partir del nivel debug, sólo en consola
- Sin embargo, el logger del entorno productivo debería loggear sólo a partir de nivel info.
- Además, el logger deberá enviar en un transporte de archivos a partir del nivel de error en un nombre “errors.log”
- Agregar logs de valor alto en los puntos importantes de tu servidor (errores, advertencias, etc) y modificar los **console.log**() habituales que tenemos para que muestren todo a partir de winston.
- Crear un endpoint /loggerTest que permita probar todos los logs

### **Formato**

- link al repositorio de Github con el proyecto sin node_modules

### **Sugerencias**

- Puedes revisar el testing del entregable **[Aquí](https://docs.google.com/document/d/1t--s1L7rv9cg5GENOveul9sHM6LcSclkIC1UWYU3TKs/edit)**
- La ruta loggerTest es muy importante para que tu entrega pueda ser calificada de manera rápida y eficiente. ¡No olvides colocarla!