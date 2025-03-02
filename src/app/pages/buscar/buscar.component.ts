import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-buscar',
  standalone: false,
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss'
})
export class BuscarComponent {

  headerService = inject(HeaderService)
  
    ngOnInit(): void {
      this.headerService.titulo.set("Buscar")
    }
}
