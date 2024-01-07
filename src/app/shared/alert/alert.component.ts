import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { InfoService } from '../services/info.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input("message") alertMessage: string = "";

  constructor(private infoService: InfoService) {}

  onClose() {
    this.infoService.infoFetchError.next("");
  }
}
