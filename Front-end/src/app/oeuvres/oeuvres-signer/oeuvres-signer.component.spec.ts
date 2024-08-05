import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeuvresSignerComponent } from './oeuvres-signer.component';

describe('OeuvresSignerComponent', () => {
  let component: OeuvresSignerComponent;
  let fixture: ComponentFixture<OeuvresSignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OeuvresSignerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OeuvresSignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
