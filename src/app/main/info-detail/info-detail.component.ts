import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InfoItem } from '../../shared/models/info-item.model';
import { InfoService } from '../../shared/services/info.service';
import { TOPIC_CHOICE_LIST } from '../../shared/constants/choice-lists';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { InfoCreateComponent } from '../../info-create/info-create.component';

@Component({
  selector: 'app-info-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, InfoCreateComponent],
  templateUrl: './info-detail.component.html',
  styleUrl: './info-detail.component.css'
})
export class InfoDetailComponent implements OnInit, OnDestroy {
private infoItemSub: Subscription;
private authSub: Subscription;
infoItem: InfoItem;
isInEditMode: boolean = false;
allowEditMode: boolean = false;
topic_cl = TOPIC_CHOICE_LIST;

  constructor(private infoService: InfoService, private authService: AuthService) {}

  ngOnInit(): void {
    this.infoItemSub = this.infoService.infoItemSubject.subscribe({
      next: infoItem => {
        this.infoItem = infoItem;
      }
    });

    this.authSub = this.authService.authenticatedUser.subscribe({
      next: authUser => {
        this.allowEditMode = authUser && authUser.token != null;
      }
    });
  }

  onEditSwitch() {
    this.isInEditMode = !this.isInEditMode;
  }

  onEditSave(form: NgForm) {

  }

  ngOnDestroy(): void {
    this.infoItemSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
