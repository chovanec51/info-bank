import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute, RouterLink } from '@angular/router';
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
  private topic: string;
  private routeSub: Subscription;
  infoItemList: InfoItem[] = [
    new InfoItem('Programovanie', 'Angular Universal', 'Angular universal je rozsirenie pre angular, ktore umoznuje vyuzit SSR.', 'SSR rozsirenie', 0)
  ];

  constructor(private route: ActivatedRoute, private router: Router, private infoService: InfoService) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe({
      next: params => {
        this.topic = params['topic'];
      }
    });
  }

  onDummyAdd() {
    const item: InfoItem = new InfoItem('Programovanie', 'Angular Universal', 'Angular universal je rozsirenie pre angular, ktore umoznuje vyuzit SSR.', 'SSR rozsirenie', 0);
    this.infoService.create(item);
  }

  onInfoItemClick(id: any) {
    this.router.navigate([id], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
