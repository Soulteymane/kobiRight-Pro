import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOeuvreComponent } from './add-oeuvre.component';

describe('AddOeuvreComponent', () => {
  let component: AddOeuvreComponent;
  let fixture: ComponentFixture<AddOeuvreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOeuvreComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddOeuvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
