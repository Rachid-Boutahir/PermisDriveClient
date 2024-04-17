import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCandidatComponent } from './about-candidat.component';

describe('AboutCandidatComponent', () => {
  let component: AboutCandidatComponent;
  let fixture: ComponentFixture<AboutCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCandidatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
