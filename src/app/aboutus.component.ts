import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';



@Component({
    selector: 'aboutus',
    templateUrl: './aboutus.component.html',
    styleUrls: ['./aboutus.component.css']
})

export class AboutusComponent implements OnInit{
    title = 'google-maps';

    ngOnInit(): void{
        let loader = new Loader({
            apiKey: 'AIzaSyCEQUtbgnwYusQ7XuWjUlBqgxPKn_5xVFo'
        })

        loader.load().then(() => {
            new google.maps.Map(document.getElementById("map")!,{
                center: { lat:54.475149, lng:-6.005778},
                zoom: 6
            })
        })
    }
} 
