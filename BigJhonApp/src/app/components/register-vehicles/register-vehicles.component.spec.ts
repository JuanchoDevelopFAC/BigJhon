import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterVehiclesComponent } from './register-vehicles.component';

describe('RegisterVehiclesComponent', () => {
  let component: RegisterVehiclesComponent;
  let fixture: ComponentFixture<RegisterVehiclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterVehiclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
