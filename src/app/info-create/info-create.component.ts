import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { TOPIC_CHOICE_LIST, TOPIC_LIST } from '../shared/constants/choice-lists';
import { InfoService } from '../shared/services/info.service';
import { InfoItem } from '../shared/models/info-item.model';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-info-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, CKEditorModule],
  templateUrl: './info-create.component.html',
  styleUrl: './info-create.component.css'
})
export class InfoCreateComponent implements OnInit {
  @Input('infoItem') selectedItem: InfoItem;
  @Input('isInEditMode') isInEditMode: boolean = false;
  @Output('onEditModeClose') closeEditMode = new EventEmitter<void>();
  form: FormGroup;
  topics_cl = TOPIC_CHOICE_LIST;
  topicsList = TOPIC_LIST;
  editor = ClassicEditor;
  
  constructor(private infoService: InfoService, private fb: FormBuilder) {
    this.form = fb.group({
      topic: [this.topicsList[0]],
      header: ['', Validators.required],
      content: ['', Validators.required],
      summary: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.selectedItem) {
      this.fillForm();
    }
  }

  onCreate() { 
    if (this.isInEditMode) {
      this.infoService.edit(this.getFormInfoItem());
      this.closeEditMode.emit();
    }
    else {
      this.infoService.create(this.getFormInfoItem());
      this.form.reset();
      this.form.patchValue({
        topic: this.topicsList[0]
      });
    }
  }

  getFormInfoItem(): InfoItem {
    return new InfoItem(
      this.topic, 
      this.header, 
      this.content, 
      this.summary,
      this.selectedItem.dbId
    );
  }

  fillForm() {
    this.form.setValue({
      topic: this.selectedItem.topic,
      header: this.selectedItem.header,
      content: this.selectedItem.content,
      summary: this.selectedItem.summary
    });   
  }

  get topic() {
    return this.form.get('topic').value;
  }

  get header() {
    return this.form.get('header').value;
  }

  get content() {
    return this.form.get('content').value;
  }

  get summary() {
    return this.form.get('summary').value;
  }
}
