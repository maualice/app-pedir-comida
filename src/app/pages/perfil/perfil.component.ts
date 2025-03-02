import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  
  headerService = inject(HeaderService)

  ngOnInit(): void {
    this.headerService.titulo.set("Perfil")
  }
}
