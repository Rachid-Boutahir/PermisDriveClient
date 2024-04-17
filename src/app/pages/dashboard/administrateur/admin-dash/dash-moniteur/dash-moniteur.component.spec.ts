import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashMoniteurComponent } from './dash-moniteur.component';

describe('DashMoniteurComponent', () => {
  let component: DashMoniteurComponent;
  let fixture: ComponentFixture<DashMoniteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashMoniteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashMoniteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
