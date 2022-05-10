import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { render} from 'creditcardpayments/creditCardPayments'

@Component({
    selector: 'saccommodation',
    templateUrl: './saccommodation.component.html',
    styleUrls: ['./saccommodation.component.css']
})

export class SaccommodationComponent { 

    reviewForm: any;
    landlordreviewForm: any;
    private accommodationID: any;

    constructor(private webService: WebService,
                private route: ActivatedRoute,
                private formBuilder: FormBuilder,
                public authService: AuthService,
                public router: Router,
                private http: HttpClient) {}
    

    
    ngOnInit() {

        this.reviewForm = this.formBuilder.group({
            username: ['', Validators.required],
            comment: ['', Validators.required],
            stars: 5
            });

        this.accommodation_list = this.webService.getSaccommodation(this.route.snapshot.params['id']);
        this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);

        this.landlordreviewForm = this.formBuilder.group({
            username: ['', Validators.required],
            comment: ['', Validators.required],
            stars: 5
            });

        this.accommodation_list = this.webService.getSaccommodation(this.route.snapshot.params['id']);
        this.landlordreviews = this.webService.getLandlordreviews(this.route.snapshot.params['id']);
    }

    onSubmit() {
        this.webService.postReview(this.reviewForm.value)
            .subscribe((response: any) => {
                this.reviewForm.reset();
                this.reviews = this.webService.getReviews(this.route.snapshot.params['id']);
        });

        this.webService.postLandlordreview(this.landlordreviewForm.value)
            .subscribe((response: any) => {
                this.landlordreviewForm.reset();
                this.landlordreviews = this.webService.getLandlordreviews(this.route.snapshot.params['id']);
        });
    }


    isInvalid(control: any) {
        return this.reviewForm.controls[control].invalid &&
               this.reviewForm.controls[control].touched;
        
    }

    isUntouched() {
        return this.landlordreviewForm.controls.username.pristine ||
               this.landlordreviewForm.controls.comment.pristine;
               
        
    }
        isIncomplete() {
        return this.isInvalid('username') ||
               this.isInvalid('comment') ||
               this.isUntouched();
    }

    DeleteAccommodation() {
        this.webService.deleteAccommodation(this.route.snapshot.params['id'])
        .subscribe((response: any) => {
            this.router.navigate(['/studen'])
        });
    }

    DeleteReview(rid: any) {
        this.webService.deleteReview(this.route.snapshot.params['id'], rid)
        .subscribe((response: any) => {
            this.reviews = this.webService.getReviews(this.route.snapshot.params['id'])
        });  
    
    }

    DeleteLandlordreview(rid: any) {
        this.webService.deleteLandlordreview(this.route.snapshot.params['id'], rid)
        .subscribe((response: any) => {
            this.reviews = this.webService.getLandlordreviews(this.route.snapshot.params['id'])
        });  
    
    }

    

    accommodation_list: any = [];
    reviews: any = [];
    landlordreviews: any = [];

 
}
