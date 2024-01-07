import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute, RouterLink } from '@angular/router';
import { InfoPanelComponent } from './info-panel/info-panel.component';
import { Subscription } from 'rxjs';
import { InfoItem } from '../shared/models/info-item.model';
import { NgFor } from '@angular/common';
import { InfoService } from '../shared/services/info.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, RouterLink, InfoPanelComponent, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, OnDestroy {
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
