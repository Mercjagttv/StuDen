import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'accommodation',
    templateUrl: './accommodation.component.html',
    styleUrls: ['./accommodation.component.css']
})

export class AccommodationComponent { 
    myControl = new FormControl();
    filterControl = new FormControl();
    options = []

    constructor(public webService: WebService,
                private formBuilder: FormBuilder,
                public router: Router,
                public route: ActivatedRoute) {
                    this.accommodationlist = this.formBuilder.group({
                        search:['']
                    })
                }
    
    ngOnInit() {
            if (sessionStorage['page']) {
                this.page = Number(sessionStorage['page']);
        }
        this.accommodation_list = this.webService.getAccommodation(this.page);
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

    async onSubmit(){
        console.log(this.accommodationlist.value);
        var x = JSON.stringify(this.accommodationlist.value.search);
        var y = x.replace('"','');
        var z = y.replace('"', '');

            (await this.webService.SearchAccommodation(z)).subscribe((response: any) => {
                var val = response;
                this.router.navigate(['accommodation/' + val._id])
            });
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
            this.router.navigate(['/filtered']);
        }
    }


    
accommodation_list: any = [];
accommodationlist: any;
page: number = 1;

 
}
