import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-articulo',
  standalone: false,
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.scss'
})
export class ArticuloComponent {

  headerService = inject(HeaderService)
  
    ngOnInit(): void {
      this.headerService.titulo.set("Articulo")
    }
}
