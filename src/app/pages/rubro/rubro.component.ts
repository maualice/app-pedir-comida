import { Component, inject } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-rubro',
  standalone: false,
  templateUrl: './rubro.component.html',
  styleUrl: './rubro.component.scss'
})
export class RubroComponent {
  
  headerService = inject(HeaderService)

  ngOnInit(): void {
    this.headerService.titulo.set("Rubro")
  }
}
