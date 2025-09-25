//Carrito de compras - Bazar

//Clase producto
class Producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

    mostrarDetalle(){
        return this.id + ' ' + this.nombre + ' - $' + this.precio;
    }
}

//Clase carrito
class Carrito{
    constructor(){
        this.items = [];
    }

    agregar(producto, cantidad){
        //Verificar si se agrego el producto al carrito
        let existente = this.items.find(item => item.producto.id === producto.id);
        if(existente){
            existente.cantidad += cantidad;
        }
        else{
            this.items.push({producto, cantidad});
        }
        alert(producto.nombre + ' X ' + cantidad + ' agregado(s) al carrito');
    }

    eliminar(index){
        if(index >= 0 && index < this.items.length){
            let eliminado = this.items.splice(index, 1)[0];
            alert(eliminado.producto.nombre + ' fue eliminado del carrito');
        }
        else{
            alert('Numero invalido');
        }
    }

    mostrar(){
        console.log('\nTu carrito:');
        if(this.items.length === 0){
            console.log('Carrito vacio');
        }
        else{
            for(let i=0; i<this.items.length; i++){
                console.log(i+1 + '. ' + this.items[i].producto.nombre + ' - $' + this.items[i].producto.precio + ' X ' + this.items[i].cantidad + ' unidades');
            }
            console.log('Total: $' +this.total());
        }
    }

    total(){
        return this.items.reduce((acum, item) => acum + item.producto.precio * item.cantidad, 0);
    }

    vaciar(){
        this.items = [];
    }
}

//Productos disponibles

const productos = [
    new Producto(1, 'Olla', 700),
    new Producto(2, 'Plato', 50),
    new Producto(3, 'Tenedor', 5),
    new Producto(4, 'Sarten', 500),
    new Producto(5, 'Vaso', 10)
];

//Instanciar el carrito

let carrito = new Carrito();

//Funcion auxiliar
function mostrarProductos(){
    console.clear();
    console.log('Productos disponibles:');
    for(let i=0; i<productos.length; i++){
        console.log(productos[i].mostrarDetalle());
    }
}

//Funcion principal
function iniciarPrograma(){
    let continuar = true;

    while(continuar){
        mostrarProductos();
        carrito.mostrar();

        let opcion = prompt('\Seleccione una opcion:\n1. Agregar producto\n2. Eliminar producto\n3. Finalizar compra\n4. Salir');

        switch(opcion){
            case '1': {
                let id = parseInt(prompt('Ingrese el ID del producto que desea agregar:'));
                let producto = productos.find(p => p.id === id);
                
                if(producto){
                    let cantidad = parseInt(prompt('Ingrese la cantidad que desea comprar:'));
                    if(!isNaN(cantidad) && cantidad > 0){
                        carrito.agregar(producto, cantidad);
                    }
                    else{
                        alert('Valor invalido');
                    }
                }
                else{
                    alert('Producto no encontrado');
                }
                break;
            }

            case '2': {
                if(carrito.items.length === 0){
                    alert('Tu carrito esta vacio');
                }
                else{
                    let index = parseInt(prompt('Ingrese el numero del producto que desea eliminar del carrito')) - 1;
                    carrito.eliminar(index);
                }
                break;
            }

            case '3': {
                console.clear();
                carrito.mostrar();
                alert('¡Gracias por tu compra!\nTotal: $' + carrito.total());
                carrito.vaciar();
                break;
            }

            case '4': {
                continuar = !confirm('¿Seguro que queres salir?');
                break;
            }
            
            default:{
                alert('Opcion invalida');
            }
        }
        console.log('Gracias por su visita');
    }

}

//Ejecutar programa
    iniciarPrograma();