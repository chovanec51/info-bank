import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { InfoPanelComponent } from '../main/info-panel/info-panel.component';
import { SearchEngineComponent } from '../shared/search-engine/search-engine.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, InfoPanelComponent, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent extends SearchEngineComponent {
}
