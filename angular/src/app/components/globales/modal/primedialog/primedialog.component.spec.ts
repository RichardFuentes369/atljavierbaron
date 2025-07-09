import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimedialogComponent } from './primedialog.component';

describe('PrimedialogComponent', () => {
  let component: PrimedialogComponent;
  let fixture: ComponentFixture<PrimedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimedialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
