import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollComponent, PHOTOS_PER_PAGE } from './infinite-scroll.component';

const SEARCHED_PHOTO_TEXT = 'Photo 100';
const SEARCHED_PHOTO_ID = '100';

describe('InfiniteScrollComponent', () => {
  let component: InfiniteScrollComponent;
  let fixture: ComponentFixture<InfiniteScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    describe('When the components inits',  () => {

        it('_populatePhotos is called', () => {
            spyOn(component, '_populatePhotos');
            component.ngOnInit();
            expect(component._populatePhotos).toHaveBeenCalled();
        });

        it('addPhotos is called', () => {
            spyOn(component, 'addPhotos');
            component.ngOnInit();
            expect(component.addPhotos).toHaveBeenCalled();
        });
    });

    describe('addPhotos', () => {
        it('takes the first 400 images from allPhotos  on first stage',  () => {
            const expectedResult = component.photos.length;
            expect(expectedResult).toBe(PHOTOS_PER_PAGE);
        });

        it('On second load, it will have the double of images', () => {
            component.addPhotos();
            const expectedResult = component.photos.length;
            expect(expectedResult).toBe(PHOTOS_PER_PAGE * 2);
        });


    });

    describe('onSearch', () => {
        describe('Searching by ID', () => {
            it('When search by an existing element, returns an array with that element', () => {
                component.selectedSearch = 'id'
                component.searchInput = SEARCHED_PHOTO_ID;
                component.onSearch();

                expect(component.photos.length).toBe(1);
                expect(component.photos[0].id).toBe(parseInt(SEARCHED_PHOTO_ID));
            });
        });

        describe('Searching by Text', () => {
            it('When search by an existing element, returns an array with that element', () => {
                component.selectedSearch = 'text'
                component.searchInput = SEARCHED_PHOTO_TEXT;
                component.onSearch();

                expect(component.photos.length).toBe(1);
                expect(component.photos[0].text).toBe(SEARCHED_PHOTO_TEXT);
            });
        });
    });

    describe('onReset', () => {
        it('Reset the searchInput filter', () => {
            component.searchInput = SEARCHED_PHOTO_TEXT;

            component.onReset();
            expect(component.searchInput).toBe('')

        })

        it('Reset the selectedSearch filter', () => {
            component.selectedSearch = 'text';

            component.onReset();
            expect(component.selectedSearch).toBe('')

        })

        it('Set photos to the initial state', () => {
            component.photos = [];
            component.onReset();
            const expectedResult = component.photos.length;

            expect(expectedResult).toBe(PHOTOS_PER_PAGE);
        })
    })

});
