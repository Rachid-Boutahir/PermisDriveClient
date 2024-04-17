import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMoniteurComponent } from './edit-moniteur.component';

describe('EditMoniteurComponent', () => {
  let component: EditMoniteurComponent;
  let fixture: ComponentFixture<EditMoniteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMoniteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMoniteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
