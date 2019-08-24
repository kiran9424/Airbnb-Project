import { NgModule } from '@angular/core';
import { EditableInputComponent } from './editable-input/editable-input.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditableTextareaComponent } from './editable-textarea/editable-textarea.component';
import { EditableSelectComponent } from './editable-select/editable-select.component';


@NgModule({
    imports:
        [
            FormsModule,
            CommonModule 
        ],
    declarations: [
        EditableInputComponent,
        EditableTextareaComponent,
        EditableSelectComponent
    ],
    providers: [],
    exports:
    [
        EditableInputComponent,
        EditableTextareaComponent,
        EditableSelectComponent
    ]
})
export class EditableModule { }