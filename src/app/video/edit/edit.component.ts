import { Component, Input, OnChanges, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() activeClip : IClip | null = null;
  inSubmission = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait, Updating the clip'
  @Output() update = new EventEmitter();

  title = new FormControl('', [Validators.required, Validators.minLength(3)])
  clipID = new FormControl('')

  editForm = new FormGroup({
    title : this.title,
    id : this.clipID
  })

  constructor(private modal : ModalService, private clipService : ClipService) { }

  ngOnInit(): void {
    this.modal.register('editClip')
  
  }

  ngOnChanges(){
    if(!this.activeClip){
      return
    }

    this.inSubmission = false;
    this.showAlert = false;

    this.clipID.setValue(this.activeClip.docID);
    this.title.setValue(this.activeClip.title);
  }

  ngOnDestroy(){
    this.modal.unRegister('editClip')
    
  }

 async submit(){

  if(!this.activeClip){
    return
  }

    this.inSubmission = true;
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = 'Please wait, Updating clip';

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value)
    } catch (error) {
      this.inSubmission = false;
      this.alertColor = 'red';
      this.alertMsg = 'Error Could not update the Clip. please try again later!';
      return;
    }

    this.activeClip.title = this.title.value;
    this.update.emit(this.activeClip);

    this.inSubmission = false;
    this.alertColor = 'green';
    this.alertMsg = 'Clip Updated Successfully';
   
  }
}
