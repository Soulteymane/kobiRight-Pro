import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeuvresDeclarerComponent } from './oeuvres-declarer.component';

describe('OeuvresDeclarerComponent', () => {
  let component: OeuvresDeclarerComponent;
  let fixture: ComponentFixture<OeuvresDeclarerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OeuvresDeclarerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OeuvresDeclarerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
