import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SihlComponent } from './sihl.component';

describe('SihlComponent', () => {
  let component: SihlComponent;
  let fixture: ComponentFixture<SihlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SihlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SihlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
