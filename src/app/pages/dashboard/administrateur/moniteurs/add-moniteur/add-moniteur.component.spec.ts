import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMoniteurComponent } from './add-moniteur.component';

describe('AddMoniteurComponent', () => {
  let component: AddMoniteurComponent;
  let fixture: ComponentFixture<AddMoniteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMoniteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMoniteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
