
// Carrito de Compras - Bazar


// Clase Producto
class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Clase ItemCarrito (producto + cantidad)
class ItemCarrito {
  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
  }

  //Subtotal del item
  subtotal() {
    return this.producto.precio * this.cantidad;
  }
}

// Clase Carrito
class Carrito {
  constructor() {
    this.items = [];
  }

  //Agregar un producto al carrito
  agregarProducto(producto, cantidad) {
    let existente = this.items.find(item => item.producto.id === producto.id);

    //Si existe en el carrito, se agrega solo la cantidad
    if (existente) {
      existente.cantidad += cantidad;
    } 

    //Si no se encuentra crea uno nuevo
    else {
      this.items.push(new ItemCarrito(producto, cantidad));
    }

    //Mensaje al usuario de que se agrego el producto
    alert(cantidad + ' ' + producto.nombre + '(s) agregado(s) al carrito.');
  }

  //Eliminar un producto al carrito
  eliminarProducto(idProducto, cantidad) {
    let item = this.items.find(item => item.producto.id === idProducto);

    //Si no se encuentra en el carrito da el mensaje que no lo encontro
    if (!item) {
      alert("Producto no encontrado en el carrito.");
    }

    //Si esta en el carrito busca en el array el producto. Si la cantidad es menor al total de unidades, solo disminuye la cantidad. Caso contrario borra todas las cantidades del producto
    else if (cantidad >= item.cantidad) {
      this.items = this.items.filter(i => i.producto.id !== idProducto);
      alert('Se eliminaron todas las unidades de ' + item.producto.nombre + '.');
    } else {
      item.cantidad -= cantidad;
      alert('Se eliminaron ' + cantidad + ' ' + item.producto.nombre + '(s). Quedan ' + item.cantidad + '.');
    }
  }

  //Mostrar el detalle del carrito: ID del producto, descripcion, cantidad y subtotal
  mostrarCarrito() {
    console.log("\nTu carrito:");
    if (this.items.length === 0) {
      console.log("Carrito vacío.");
    } else {
      for(let i=0; i<this.items.length; i++){
        console.log(this.items[i].producto.id + '. ' + this.items[i].producto.nombre + ' x' + this.items[i].cantidad + ' - $' + this.items[i].subtotal());
      }
      console.log('Total: $' + this.calcularTotal());
    }
  }
  
  //Calcula el total del carrito
  calcularTotal() {
    return this.items.reduce((acc, item) => acc + item.subtotal(), 0);
  }

  //Genera un ticket al finalizar la compra indicando los productos, subtotales y el total de la compra
  generarTicket() {
    console.log("\n===============================");
    console.log("=============TICKET============");
    console.log("===============================");

    for(let i=0; i<this.items.length; i++){
        console.log(this.items[i].producto.nombre + ' x' + this.items[i].cantidad + ' - $' + this.items[i].subtotal());
    }
    console.log("-------------------------------");
    console.log('TOTAL A PAGAR: $' + this.calcularTotal());
    console.log("===============================");
    console.log("¡Gracias por tu compra!");
  }

  //Vacia el carrito
  vaciar() {
    this.items = [];
  }
}

// Clase Tienda
class Tienda {
  constructor() {
    this.productos = [
      new Producto(1, "Copa", 1000),
      new Producto(2, "Plato", 300),
      new Producto(3, "Cuchara", 10),
      new Producto(4, "Vaso", 40),
      new Producto(5, "Olla", 1500)
    ];
    this.carrito = new Carrito();
  }

  //Muestra en consola los productos disponibles que se encuentra en el array "productos", atributo de la clase Tienda
  mostrarProductos() {
    console.log("PRODUCTOS DISPONIBLES");

    for(let i=0; i<this.productos.length; i++){
        console.log(this.productos[i].id + '. ' + this.productos[i].nombre + ' - $' + this.productos[i].precio);
    }
  }

  //Inicia el programa
  iniciar() {
    let continuar = true;

    while (continuar) {
      //Se limpia la consola y se muestran tanto los productos disponibles como el carrito
      console.clear();
      this.mostrarProductos();
      this.carrito.mostrarCarrito();

      //El usuario elige una opcion
      let opcion = prompt(
        "\nSeleccione una opción:\n1. Agregar producto\n2. Eliminar producto\n3. Finalizar compra\n4. Salir"
      );

      switch (opcion) {
        case "1":
          this.opcionAgregar();
          break;
        case "2":
          this.opcionEliminar();
          break;
        case "3":
          this.finalizarCompra();
          break;
        case "4":
          continuar = !confirm("¿Seguro que quieres salir?");
          break;
        default:
          alert("Opción inválida.");
      }
    }

    console.log("Programa finalizado.");
  }

  //Se valida el dato del ID, en caso correcto se activa el metodo agregarProducto de la clase Carrito
  opcionAgregar() {
    let id = parseInt(prompt("Ingrese el ID del producto que desea agregar:"));

    let producto = this.productos.find(p => p.id === id);

    if (!producto) {
      alert("Producto no encontrado.");
    }
    else {
        let cantidad = parseInt(prompt('¿Cuántos ' + producto.nombre + '(s) desea agregar?'));

        if(!isNaN(cantidad) || cantidad > 0){
            this.carrito.agregarProducto(producto, cantidad);
        }
        else{
            alert("Cantidad inválida.");
        }     
    }
}      
    

  //Se valida el dato ingresado por el usuario y si es correcto se activa el metodo eliminarProducto de la clase Carrito
  opcionEliminar() {
    if (this.carrito.items.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    let id = parseInt(prompt("Ingrese el ID del producto que desea eliminar:"));
    let item = this.carrito.items.find(i => i.producto.id === id);

    if (!item) {
      alert("Ese producto no está en tu carrito.");
    }
    else{
        let cantidad = parseInt(prompt('¿Cuántas unidades desea eliminar? En carrito: ' + item.cantidad + ' unidades') );
        if (!isNaN(cantidad) || cantidad > 0){
            
            this.carrito.eliminarProducto(id, cantidad);
        }
        else{
            alert("Cantidad inválida.");
        }
    }
    
  }        


  //Opcion finalizar compra. Genera ticket y se vacia el carrito
  finalizarCompra() {
    console.clear();
    this.carrito.generarTicket(); // ticket en consola
    let total = this.carrito.calcularTotal();
    alert('¡Gracias por tu compra!\nTotal a pagar: $' + total);
    this.carrito.vaciar();
  }
}

// Ejecutar el programa

let tienda = new Tienda();
tienda.iniciar();
