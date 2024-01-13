import { Component, Directive, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfoService } from '../services/info.service';
import { InfoItem } from '../models/info-item.model';
import { Subscription } from 'rxjs';

@Directive()
export abstract class SearchEngineComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  private searchSub: Subscription;
  infoItemList: InfoItem[] = [];
  filteredItemList: InfoItem[] = [];

  constructor(private route: ActivatedRoute, private infoService: InfoService) {}

  ngOnInit(): void {
    this.routeSub = this.route.data.subscribe({
      next: resolvedData => {
        this.infoItemList = resolvedData ? resolvedData[0] : [];
        this.filteredItemList = this.infoItemList;
      }
    });

    this.searchSub = this.infoService.searchParam.subscribe({
      next: searchParam => {
        this.filteredItemList = this.filterItemList(searchParam);
      }
    });
  }

  filterItemList(searchParam: string): InfoItem[] {
    if (!searchParam)
      return this.infoItemList;

    const searchParamLowercase: string = searchParam.toLocaleLowerCase('sk');
    return this.infoItemList.filter(item => 
      item.header.toLocaleLowerCase('sk').includes(searchParamLowercase) 
      || 
      item.summary.toLocaleLowerCase('sk').includes(searchParamLowercase)
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.searchSub.unsubscribe();
  }
}
