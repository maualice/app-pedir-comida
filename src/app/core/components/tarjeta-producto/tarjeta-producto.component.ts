import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Producto } from '../../interfaces/productos';

@Component({
  selector: 'app-tarjeta-producto',
  standalone: true,
  templateUrl: './tarjeta-producto.component.html',
  styleUrl: './tarjeta-producto.component.scss',
  imports:[CommonModule]
})
export class TarjetaProductoComponent {

  @Input({required:true}) producto!:Producto;
}
