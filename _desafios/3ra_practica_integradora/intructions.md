# Desafío Complementario 3

Fecha: April 27, 2023 → May 4, 2023
Hecho: No
Proyecto: https://www.notion.so/Programaci-n-Backend-61ef391715bb4a23add5da040ced0165

# ****Tercera práctica integradora****

## ****Práctica de integración sobre tu ecommerce****

### **Consigna**

Con base en el proyecto que venimos desarrollando, toca solidificar algunos procesos

### **Aspectos a incluir**

- Realizar un sistema de recuperación de contraseña, la cual envíe por medio de un correo un botón que redireccione a una página para restablecer la contraseña (no recuperarla).
    - link del correo debe expirar después de 1 hora de enviado.
    - Si se trata de restablecer la contraseña con la misma contraseña del usuario, debe impedirlo e indicarle que no se puede colocar la misma contraseña
    - Si el link expiró, debe redirigir a una vista que le permita generar nuevamente el correo de restablecimiento, el cual contará con una nueva duración de 1 hora.
- Establecer un nuevo rol para el schema del usuario llamado “premium” el cual estará habilitado también para crear productos
- Modificar el schema de producto para contar con un campo “owner”, el cual haga referencia a la persona que creó el producto
    - Si un producto se crea sin owner, se debe colocar por defecto “admin”.
    - El campo owner deberá guardar sólo el correo electrónico (o _id, lo dejamos a tu conveniencia) del usuario que lo haya creado (Sólo podrá recibir usuarios premium)
- Modificar los permisos de modificación y eliminación de productos para que:
    - Un usuario premium sólo pueda borrar los productos que le pertenecen.
    - El admin pueda borrar cualquier producto, aún si es de un owner.

### **Aspectos a incluir**

- Además, modificar la lógica de carrito para que un usuario premium NO pueda agregar a su carrito un producto que le pertenece
- Implementar una nueva ruta en el router de api/users, la cual será **/api/users/premium/:uid** la cual permitirá cambiar el rol de un usuario, de “user” a “premium” y viceversa.

### **Formato**

- Link al repositorio de GitHub con el proyecto completo (No incluir node_modules).

**Sugerencias**

- Te recomendamos testear muy bien todas las políticas de acceso. ¡Son la parte fuerte de este entregable!