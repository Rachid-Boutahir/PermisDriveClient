import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMoniteursComponent } from './all-moniteurs.component';

describe('AllMoniteursComponent', () => {
  let component: AllMoniteursComponent;
  let fixture: ComponentFixture<AllMoniteursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMoniteursComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllMoniteursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
