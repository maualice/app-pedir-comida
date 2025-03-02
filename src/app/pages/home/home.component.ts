import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  headerService = inject(HeaderService)

  ngOnInit(): void {
    this.headerService.titulo.set("Home")
    this.headerService.extendido.set(true)
  }

  ngOnDestroy(): void {
    this.headerService.extendido.set(false)
  }
}
