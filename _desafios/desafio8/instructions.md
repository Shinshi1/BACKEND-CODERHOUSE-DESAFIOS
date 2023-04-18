# Desafío Entregable 8

Fecha: April 11, 2023 → April 18, 2023
Hecho: No
Proyecto: https://www.notion.so/Programaci-n-Backend-61ef391715bb4a23add5da040ced0165

clase 32

# ****Mocking y manejo de errores****

### **Consigna**

- Se aplicará un módulo de mocking y un manejador de errores a tu servidor actual

### **Formato**

- Link al repositorio de github sin node_modules

### **Sugerencias**

- Céntrate solo en los errores más comunes
- Puedes revisar el documento de testing aquí:

### **Aspectos a incluir**

- Generar un módulo de Mocking para el servidor, con el fin de que, al inicializarse pueda generar y entregar 100 productos con el mismo formato que entregaría una petición de Mongo. Ésto solo debe ocurrir en un endpoint determinado (‘/mockingproducts’)
- Además, generar un customizador de errores y crear un diccionario para tus errores más comunes al crear un producto, agregarlo al carrito, etc.