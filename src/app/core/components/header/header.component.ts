import { Component, effect, inject, signal } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  headerService = inject(HeaderService);
  claseAplicada = signal("");
  tituloMostrado = signal("");

  esconderTitulo = effect(() => {
    if (this.headerService.titulo()) {
      this.claseAplicada.set("fade-out")
    }
  }) //se ejecuta cada vez que la signal dentro cambie

  mostrarTituloNuevo(e:AnimationEvent) {//se ejecuta cuando termina la animacion por animationend
    if(e.animationName.includes("fade-out")){
      this.tituloMostrado.set(this.headerService.titulo())
      this.claseAplicada.set("fade-in")
      setTimeout(()=> this.claseAplicada.set(""),250)//??
    }
  }
//3320
}
