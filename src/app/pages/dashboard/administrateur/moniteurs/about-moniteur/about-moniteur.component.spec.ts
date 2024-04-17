import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMoniteurComponent } from './about-moniteur.component';

describe('AboutMoniteurComponent', () => {
  let component: AboutMoniteurComponent;
  let fixture: ComponentFixture<AboutMoniteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMoniteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutMoniteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
