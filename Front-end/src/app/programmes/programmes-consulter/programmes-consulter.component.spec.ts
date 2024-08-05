import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammesConsulterComponent } from './programmes-consulter.component';

describe('ProgrammesConsulterComponent', () => {
  let component: ProgrammesConsulterComponent;
  let fixture: ComponentFixture<ProgrammesConsulterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgrammesConsulterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgrammesConsulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
