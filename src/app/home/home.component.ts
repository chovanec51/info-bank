import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { InfoItem } from '../shared/models/info-item.model';
import { ActivatedRoute } from '@angular/router';
import { InfoService } from '../shared/services/info.service';
import { NgClass, NgFor } from '@angular/common';
import { InfoPanelComponent } from '../main/info-panel/info-panel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, InfoPanelComponent, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private routeSub: Subscription;
  infoItemList: InfoItem[] = [];

  constructor(private route: ActivatedRoute, private infoService: InfoService) {}

  ngOnInit(): void {
    this.routeSub = this.route.data.subscribe({
      next: resolvedData => {
        this.infoItemList = resolvedData ? resolvedData[0] : [];
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
