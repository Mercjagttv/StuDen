import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http'

@Component({
    selector: 'filteraccommodation',
    templateUrl: './filteraccommodation.component.html',
    styleUrls: ['./filteraccommodation.component.css']
})

export class FilteraccommodationComponent { 
    myControl = new FormControl();
    filterControl = new FormControl();
    options = []

    constructor(public webService: WebService,
                private formBuilder: FormBuilder,
                public router: Router,
                public route: ActivatedRoute) {
                }
    
    ngOnInit() {
            if (sessionStorage['page']) {
                this.page = Number(sessionStorage['page']);
        }
        this.accommodation_list = this.webService.getAccommodation(this.page).subscribe
        (
            data=>
            {
                this.accommodation_list = data
            }
        )
    }

    previousPage() {
        if (this.page > 1) {
            this.page = this.page - 1;
            sessionStorage['page'] = this.page;
            this.accommodation_list = this.webService.getAccommodation(this.page);
        }
    }

    nextPage() {
        this.page = this.page + 1;
        sessionStorage['page'] = this.page;
        this.accommodation_list = this.webService.getAccommodation(this.page);
    }

    filterAccommodation(FilterVal: any) {
        if (FilterVal === 'Clear') {
            this.webService.getAccommodation(1);
            this.router.navigate(['']);
        } else if (FilterVal === null) {
            this.webService.getAccommodation(1);
            this.router.navigate(['']);
        } else {
            this.webService.FilterAccommodation(FilterVal);
            this.router.navigate(['/filteraccommodation']);
        }
    }
    
accommodation_list: any = [];
accommodationlist: any;
FilterForm:any;
page: number = 1;

 
}
