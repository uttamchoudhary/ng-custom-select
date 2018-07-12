import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './components/modal-header.component';
import { ModalContentComponent } from './components/modal-content.component';
import { ModalFooterComponent } from './components/modal-footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModalComponent, ModalHeaderComponent, ModalContentComponent, ModalFooterComponent],
  exports : [ModalComponent, ModalHeaderComponent, ModalContentComponent, ModalFooterComponent]
})
export class ModalModule { }
