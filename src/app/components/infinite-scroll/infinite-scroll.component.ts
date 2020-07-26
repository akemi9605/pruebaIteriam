import { Component, HostListener, OnInit } from '@angular/core';

import {Photo} from '../../models/Photo';

// exported just for
export const PHOTOS_PER_PAGE = 400;
const MAX_PHOTOS = 4000;

@Component({
    selector: 'app-infinite-scroll',
    templateUrl: './infinite-scroll.component.html',
    styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements OnInit {

    public photos: Array<Photo>;
    private allPhotos: Array<Photo>;
    public searchInput: string;
    public selectedSearch: string;
    private finishPage = 10;
    private actualPage: number;
    private showGoUpButton: boolean;

    private showScrollHeight = 400;
    private hideScrollHeight = 200;

    constructor() {
        this.actualPage = 1;
        this.showGoUpButton = false;
    }

    ngOnInit() {
        this.photos = new Array<Photo>();
        this.allPhotos = new Array<Photo>();
        this._populatePhotos()
        this.addPhotos();
    }

    _populatePhotos() {
        for (let i: number = 0; i < MAX_PHOTOS; i++) {
            this.allPhotos.push(this._createPhotoElement(i))
        }
    }


    addPhotos() {
        const currentLenght = this.photos.length;
        const elementsAdded = currentLenght + PHOTOS_PER_PAGE
        const addedPhotos = this.photos.concat(this.allPhotos.slice(currentLenght, elementsAdded));

        this.photos = addedPhotos;
    }

    _createPhotoElement (i: number): Photo {
        const newPhoto: Photo = {
            id: i,
            photo: `https://picsum.photos/${i}`,  // 'https:www.myphoto' + 'i'
            text: `Photo ${i}`
        };

        return newPhoto;
    }

    onScroll() {
        if (this.actualPage < this.finishPage) {
            this.addPhotos();
            this.actualPage ++;
        } else {
            console.log('No more lines. Finish page!');
        }
    }

    _findOPhotoById(photo: Photo) {
        return photo.id === parseInt(this.searchInput);
    }

    _findOPhotoByText(photo: Photo) {
        return photo.text ===  this.searchInput;
    }

    onSearch() {
        let resultSearched: Photo;
        if (this.selectedSearch === 'id') {
            resultSearched = this.allPhotos.find(this._findOPhotoById.bind(this));
        } else {
            resultSearched = this.allPhotos.find(this._findOPhotoByText.bind(this));
        }

        this.photos = [resultSearched];
    }

    onReset() {
        this.photos = [];
        this.addPhotos();
        this.searchInput = '';
        this.selectedSearch = '';
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        if (( window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > this.showScrollHeight) {
            this.showGoUpButton = true;
        } else if ( this.showGoUpButton &&
        (window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop)
        < this.hideScrollHeight) {
            this.showGoUpButton = false;
        }
    }
}
