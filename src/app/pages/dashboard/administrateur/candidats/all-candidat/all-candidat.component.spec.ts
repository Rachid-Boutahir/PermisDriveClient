import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCandidatComponent } from './all-candidat.component';

describe('AllCandidatComponent', () => {
  let component: AllCandidatComponent;
  let fixture: ComponentFixture<AllCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllCandidatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
