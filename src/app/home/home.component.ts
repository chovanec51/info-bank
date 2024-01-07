import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { InfoItem } from '../shared/models/info-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { InfoService } from '../shared/services/info.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private routeSub: Subscription;
  infoItemList: InfoItem[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private infoService: InfoService) {}

  ngOnInit(): void {
    this.routeSub = this.route.data.subscribe({
      next: resolvedData => {
        this.infoItemList = resolvedData ? resolvedData[0] : [];
      }
    });
  }

  onDummyAdd() {
    const item: InfoItem = new InfoItem('coding', 'Angular Universal', 'Angular universal je rozsirenie pre angular, ktore umoznuje vyuzit SSR.', 'SSR rozsirenie');
    this.infoService.create(item);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
