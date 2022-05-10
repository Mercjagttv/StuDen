import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WebService {

    private accommodationID: any;
    accommodation_list: any;
    filter:any;
    filter_accommodation_list: any;
    constructor(public http: HttpClient) {

    }

    

    getAccommodation(page: number) {
        return this.http.get('http://localhost:5000/api/v1.0/studen?pn=' + page);
       
    }

    getSaccommodation(id: any) {
        this.accommodationID = id;
        return this.http.get('http://localhost:5000/api/v1.0/studen/'+ id);
        }
    
    getReviews(id: any) {
        return this.http.get('http://localhost:5000/api/v1.0/studen/'+ id + '/reviews');
        }
    
    getLandlordreviews(id: any) {
        return this.http.get('http://localhost:5000/api/v1.0/studen/'+ id + '/landlordreviews');
        }
    
    postReview(review: any) {
        let postData = new FormData();
        postData.append("username", review.username);
        postData.append("comment", review.comment);
        postData.append("stars", review.stars);
    
        return this.http.post('http://localhost:5000/api/v1.0/studen/' +
                                   this.accommodationID + '/reviews', postData);
    }

    postLandlordreview(landlordreview: any) {
        let postData = new FormData();
        postData.append("username", landlordreview.username);
        postData.append("comment", landlordreview.comment);
        postData.append("stars", landlordreview.stars);
    
        return this.http.post('http://localhost:5000/api/v1.0/studen/' +
                                   this.accommodationID + '/landlordreviews', postData);
    }

    deleteAccommodation(id: any) {
        return this.http.delete('http://localhost:5000/api/v1.0/studen/'+ id);
    }

    deleteReview(id: any, rid: any) {
        return this.http.delete('http://localhost:5000/api/v1.0/studen/'+ id + '/reviews/' + rid);
    }

    deleteLandlordreview(id: any, lrid: any) {
        return this.http.delete('http://localhost:5000/api/v1.0/studen/'+ id + '/landlordreviews/' + lrid);
    }

    postAccommodation(accommodation: any) {
        let postData = new FormData();
        postData.append("name", accommodation.name);
        postData.append("university", accommodation.university);
        postData.append("number", accommodation.number);
        postData.append("street", accommodation.street);
        postData.append("type", accommodation.type);
        postData.append("rooms", accommodation.rooms);
        postData.append("monthlyprice", accommodation.monthlyprice);
        postData.append("image", accommodation.image);

        return this.http.post('http://localhost:5000/api/v1.0/studen', postData);
    
        
    }
    
    async SearchAccommodation(val: any){
        return this.http.get("http://localhost:5000/api/v1.0/search/studen/" + val);
    }

    async FilterAccommodation(filter: string){
        return this.http.get("http://localhost:5000/api/v1.0/studen/filtered/" + filter).subscribe((response: any) => {this.filter_accommodation_list = response;});
    }
}
