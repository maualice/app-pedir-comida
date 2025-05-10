import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Producto } from '../../core/interfaces/productos';
import { TarjetaProductoComponent } from '../../core/components/tarjeta-producto/tarjeta-producto.component';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../core/services/categorias.service';

@Component({
  selector: 'app-rubro',
  standalone: true,
  templateUrl: './rubro.component.html',
  styleUrl: './rubro.component.scss',
  imports: [TarjetaProductoComponent, CommonModule, RouterModule]
})
export class RubroComponent {

  headerService = inject(HeaderService)
  categoriaService = inject(CategoriasService)

  ac = inject(ActivatedRoute)
  productos: WritableSignal<Producto[]> = signal([])

  ngOnInit(): void {
    this.headerService.titulo.set("Rubro")
    this.ac.params.subscribe(params => {
      if (params['id']) {
        this.categoriaService.getById(parseInt(params['id']))
          .then(categoria => {
            if (categoria) {
              this.productos.set(categoria.productos)
              this.headerService.titulo.set(categoria.nombre)
            }
          })
      }
    }
    )
  }
}
//2810