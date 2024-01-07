import { JsonPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TOPIC_CHOICE_LIST, TOPIC_LIST } from '../shared/constants/choice-lists';
import { InfoService } from '../shared/services/info.service';
import { InfoItem } from '../shared/models/info-item.model';

@Component({
  selector: 'app-info-create',
  standalone: true,
  imports: [FormsModule, JsonPipe, NgFor],
  templateUrl: './info-create.component.html',
  styleUrl: './info-create.component.css'
})
export class InfoCreateComponent {
  topics_cl = TOPIC_CHOICE_LIST;
  topicsList = TOPIC_LIST;
  defaultTopic = this.topicsList[0];
  
  constructor(private infoService: InfoService) {}

  onCreate(form: NgForm) {
    const infoItem: InfoItem = new InfoItem(
      form.value['topic'],
      form.value['header'],
      form.value['content'],
      form.value['summary']
    );
    this.infoService.create(infoItem);
  }
}
