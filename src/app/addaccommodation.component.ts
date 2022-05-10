import { Component } from '@angular/core';
import { WebService } from './web.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'addaccommodation',
    templateUrl: './addaccommodation.component.html',
    styleUrls: ['./addaccommodation.component.css']
})

export class AddaccommodationComponent { 

    accommodationForm: any;

    constructor(public webService: WebService,
                public formBuilder: FormBuilder) {}

    ngOnInit() {

        this.accommodationForm = this.formBuilder.group({
            name: ['', Validators.required],
            university: ['', Validators.required],
            number: ['', Validators.required],
            street: ['', Validators.required],
            type: ['', Validators.required],
            rooms: ['', Validators.required],
            monthlyprice: ['', Validators.required],
            image: ['', Validators.required],
        });
    }

    onSubmit() {
        this.webService.postAccommodation(this.accommodationForm.value)
          .subscribe((response: any) => {
            this.accommodationForm.reset();
    })
}


    isInvalid(control: any) {
        return this.accommodationForm.controls[control].invalid &&
               this.accommodationForm.controls[control].touched;
    }

    isUntouched() {
        return this.accommodationForm.controls.name.pristine ||
               this.accommodationForm.controls.university.pristine ||
               this.accommodationForm.controls.number.pristine ||
               this.accommodationForm.controls.street.pristine ||
               this.accommodationForm.controls.type.pristine ||
               this.accommodationForm.controls.rooms.pristine ||
               this.accommodationForm.controls.monthlyprice.pristine ||
               this.accommodationForm.controls.image.pristine;
    }
        isIncomplete() {
        return this.isInvalid('name') ||
               this.isInvalid('university') ||
               this.isInvalid('number') ||
               this.isInvalid('street') ||
               this.isInvalid('type') ||
               this.isInvalid('rooms') ||
               this.isInvalid('monthlyprice') ||
               this.isInvalid('image') ||
               this.isUntouched();
    }


    accommodation_list: any = [];
    page: number = 1;

}
