import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Busqueda } from '../../core/interfaces/busqueda';
import { ProductosService } from '../../core/services/productos.service';
import { Producto } from '../../core/interfaces/productos';
import { TarjetaProductoComponent } from '../../core/components/tarjeta-producto/tarjeta-producto.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buscar',
  standalone: true,
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss',
  imports: [CommonModule, FormsModule, TarjetaProductoComponent,RouterModule]
})
export class BuscarComponent {

  headerService = inject(HeaderService)
  productService = inject(ProductosService)
  productos: WritableSignal<Producto[]> = signal([])

  ngOnInit(): void {
    this.headerService.titulo.set("Buscar");
    this.productService.getAll().then(res => this.productos.set(res))
  }

  parametrosBusqueda: Busqueda = {
    texto: "",
    aptoCeliaco: false,
    aptoVegano: false
  }

  async buscar() {
    this.productos.set(await this.productService.buscar(this.parametrosBusqueda)) 
  }
}
