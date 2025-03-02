import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent {

  headerService = inject(HeaderService)
  
    ngOnInit(): void {
      this.headerService.titulo.set("Carrito")
    }
}
