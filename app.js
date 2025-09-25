// ---------------------------
// Carrito de Compras - Bazar
// ---------------------------

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

  subtotal() {
    return this.producto.precio * this.cantidad;
  }
}

// Clase Carrito
class Carrito {
  constructor() {
    this.items = [];
  }

  agregarProducto(producto, cantidad) {
    let existente = this.items.find(item => item.producto.id === producto.id);
    if (existente) {
      existente.cantidad += cantidad;
    } else {
      this.items.push(new ItemCarrito(producto, cantidad));
    }
    alert(cantidad + ' ' + producto.nombre + '(s) agregado(s) al carrito.');
  }

  eliminarProducto(idProducto, cantidad) {
    let item = this.items.find(item => item.producto.id === idProducto);
    if (!item) {
      alert("Producto no encontrado en el carrito.");
    }
    else if (cantidad >= item.cantidad) {
      this.items = this.items.filter(i => i.producto.id !== idProducto);
      alert('Se eliminaron todas las unidades de ' + item.producto.nombre + '.');
    } else {
      item.cantidad -= cantidad;
      alert('Se eliminaron ' + cantidad + ' ' + item.producto.nombre + '(s). Quedan ' + item.cantidad + '.');
    }
  }

  mostrarCarrito() {
    console.log("\nTu carrito:");
    if (this.items.length === 0) {
      console.log("Carrito vacío.");
    } else {
      //this.items.forEach((item, i) => {
        //console.log(
          //`${i + 1}. ${item.producto.nombre} x${item.cantidad} - $${item.subtotal()}`
        //);
      //});
      for(let i=0; i<this.items.length; i++){
        console.log(this.items[i].producto.id + '. ' + this.items[i].producto.nombre + ' x' + this.items[i].cantidad + ' - $' + this.items[i].subtotal());
      }
      console.log('Total: $' + this.calcularTotal());
    }
  }

  calcularTotal() {
    return this.items.reduce((acc, item) => acc + item.subtotal(), 0);
  }

  generarTicket() {
    console.log("\n===============================");
    console.log("=============TICKET============");
    console.log("===============================");
    //this.items.forEach(item => {
      //console.log(
        //`${item.producto.nombre} x${item.cantidad} - $${item.subtotal()}`
      //);
    //});
    for(let i=0; i<this.items.length; i++){
        console.log(this.items[i].producto.nombre + ' x' + this.items[i].cantidad + ' - $' + this.items[i].subtotal());
    }
    console.log("-------------------------------");
    console.log('TOTAL A PAGAR: $' + this.calcularTotal());
    console.log("===============================");
    console.log("¡Gracias por tu compra!");
  }

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

  mostrarProductos() {
    console.log("PRODUCTOS DISPONIBLES");
    //this.productos.forEach(p => {
      //console.log(`${p.id}. ${p.nombre} - $${p.precio}`);
    //});
    for(let i=0; i<this.productos.length; i++){
        console.log(this.productos[i].id + '. ' + this.productos[i].nombre + ' - $' + this.productos[i].precio);
    }
  }

  iniciar() {
    let continuar = true;

    while (continuar) {
      console.clear();
      this.mostrarProductos();
      this.carrito.mostrarCarrito();

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



  finalizarCompra() {
    console.clear();
    this.carrito.generarTicket(); // ticket en consola
    let total = this.carrito.calcularTotal();
    alert('¡Gracias por tu compra!\nTotal a pagar: $' + total);
    this.carrito.vaciar();
  }
}

// ---------------------------
// Ejecutar el programa
// ---------------------------
let tienda = new Tienda();
tienda.iniciar();
