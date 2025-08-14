import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { OverlayService } from './shared/service/overlay.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ammo-app');
  private overlayService = inject(OverlayService); // Inject to initialize

  constructor() {
    // The service will auto-initialize and fix overlay issues
  }
}
