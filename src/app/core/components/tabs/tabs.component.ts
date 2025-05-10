import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  standalone: false,
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {

  constructor(public router: Router) {
  }

  colorDesactivado = "#555555"
  colorActivado = "#000000"

  navegar(direccion: string) {
    this.router.navigate([direccion])
  }
}
