import { Component, ElementRef, inject, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CartService } from '../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { ContadorCantidadComponent } from "../../core/components/contador-cantidad/contador-cantidad.component";
import { Producto } from '../../core/interfaces/productos';
import { ProductosService } from '../../core/services/productos.service';
import { Router, RouterModule } from '@angular/router';
import { PerfilService } from '../../core/services/perfil.service';
import { NUMERO_WHTSAPP } from '../../core/constants/telefono';
import { ConfigService } from '../../core/services/config.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss',
  imports: [CommonModule, ContadorCantidadComponent, RouterModule],
})
export class CarritoComponent {

  headerService = inject(HeaderService)
  cartService = inject(CartService)
  productService = inject(ProductosService)
  perfilService = inject(PerfilService)
  configService = inject(ConfigService)
  router = inject(Router)

  productosCarrito: WritableSignal<Producto[]> = signal([]);

  subtotal = 0;
  total = 0;
  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito")
    this.buscarInformacionProductos().then(() => {
      this.calcularInformacion();
    })
  }

  async buscarInformacionProductos() {
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      const itemCarrito = this.cartService.carrito[i];
      const res = await this.productService.getById(itemCarrito.idProducto)
      if (res) this.productosCarrito.set([...this.productosCarrito(), res]); //this.productosCarrito.push(res)
    }
  }

  eliminarProducto(idProducto: number) {
    this.cartService.eliminarProducto(idProducto)
  }

  calcularInformacion() {
    this.subtotal = 0;
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      this.subtotal += this.productosCarrito()[i].precio * this.cartService.carrito[i].cantidad
    }
    this.total = this.subtotal + this.configService.configuracion().costoEnvio; //usar signal computed para delivery
  }

  cambiarCantidadProducto(id: number, cantidad: number) {
    this.cartService.cambiarCantidadProducto(id, cantidad)
    this.calcularInformacion()
  }

  async enviarMensaje() {
    let pedido = ""
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      const producto = await this.productService.getById(this.cartService.carrito[i].idProducto)//se puede usar productosCarrito[i]
      pedido += `* ${this.cartService.carrito[i].cantidad} X ${producto?.nombre}
`
    }
    const mensaje = `
Hola soy ${this.perfilService.perfil()?.nombre}, y te quiero hacer el siguiente pedido:
${pedido}
Si te queres comunicar conmigo hacelo al N° del que te hablo o al ${this.perfilService.perfil()?.telefono}.
La direccion de envio es: ${this.perfilService.perfil()?.direccion} - ${this.perfilService.perfil()?.detalleEntrega}.
Muchas gracias
`
    const link = `https://wa.me/${NUMERO_WHTSAPP}?text=${encodeURI(mensaje)}`
    window.open(link, "_blank")
    this.dialog.nativeElement.showModal()
  }

  finalizarPedido() {
    this.cartService.vaciar()
    this.dialog.nativeElement.close()
    this.router.navigate(['/'])
  }

  editarPedido() {
    this.dialog.nativeElement.close()
  }
}

