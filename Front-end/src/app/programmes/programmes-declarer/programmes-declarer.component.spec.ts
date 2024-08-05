import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammesDeclarerComponent } from './programmes-declarer.component';

describe('ProgrammesDeclarerComponent', () => {
  let component: ProgrammesDeclarerComponent;
  let fixture: ComponentFixture<ProgrammesDeclarerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgrammesDeclarerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgrammesDeclarerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
