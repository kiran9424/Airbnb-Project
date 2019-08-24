import { Input, Output, OnInit, EventEmitter, OnChanges} from '@angular/core';

export class EditableComponent implements OnChanges {

    @Input() entity: any;

    @Input() set field(entityFields: string) {
        this.entityField = entityFields;
        this.originValue();
    }

    
    @Input() style: any;

    @Input() className: string;
    @Output() editRental = new EventEmitter();
    isActiveInput: boolean = false;

    entityField: string;
    orginiValue: any;

    constructor() { }

   

    ngOnChanges(){
        this.originValue();
        this.isActiveInput = false;
    }

    onSave() {
        const entityValue = this.entity[this.entityField];

        if (entityValue !== this.orginiValue) {

            this.editRental.emit({ [this.entityField]: this.entity[this.entityField] });
            this.originValue();
        }
        this.isActiveInput = false;
    }

    onCancel() {
        this.isActiveInput = false;
        this.entity[this.entityField] = this.orginiValue;
    }
    originValue() {
        this.orginiValue = this.entity[this.entityField];
    }
}