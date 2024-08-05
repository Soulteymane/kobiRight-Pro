import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeuvresCatalogueComponent } from './oeuvres-catalogue.component';

describe('OeuvresCatalogueComponent', () => {
  let component: OeuvresCatalogueComponent;
  let fixture: ComponentFixture<OeuvresCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OeuvresCatalogueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OeuvresCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
