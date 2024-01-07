import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { InfoItem } from '../../shared/models/info-item.model';
import { InfoService } from '../../shared/services/info.service';

@Component({
  selector: 'app-info-panel',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './info-panel.component.html',
  styleUrl: './info-panel.component.css'
})
export class InfoPanelComponent {
  @Input('infoItem') infoItem: InfoItem;
  @Input('index') index: number;

  constructor(private infoService: InfoService, private router: Router, private route: ActivatedRoute) {}

  onInfoItemClick() {
    this.router.navigate([this.index], {relativeTo: this.route});
    this.infoService.infoItemSubject.next(this.infoItem);
  }
}
