import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharAppComponent } from './char-app.component';

describe('CharAppComponent', () => {
  let component: CharAppComponent;
  let fixture: ComponentFixture<CharAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
