import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnuploadComponent } from './btnupload.component';

describe('BtnuploadComponent', () => {
  let component: BtnuploadComponent;
  let fixture: ComponentFixture<BtnuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnuploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
