import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InfoItem } from '../../shared/models/info-item.model';
import { InfoService } from '../../shared/services/info.service';
import { TOPIC_CHOICE_LIST } from '../../shared/constants/choice-lists';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-info-detail',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './info-detail.component.html',
  styleUrl: './info-detail.component.css'
})
export class InfoDetailComponent implements OnInit, OnDestroy {
private infoItemSub: Subscription;
infoItem: InfoItem;
topic_cl = TOPIC_CHOICE_LIST;

  constructor(private infoService: InfoService) {}

  ngOnInit(): void {
    this.infoItemSub = this.infoService.infoItemSubject.subscribe({
      next: infoItem => {
        this.infoItem = infoItem;
      }
    });
  }

  ngOnDestroy(): void {
    this.infoItemSub.unsubscribe();
  }
}
