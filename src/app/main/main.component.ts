import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { NgFor } from '@angular/common';
import { SearchEngineComponent } from '../shared/search-engine/search-engine.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, RouterLink, InfoPanelComponent, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent extends SearchEngineComponent {
}
