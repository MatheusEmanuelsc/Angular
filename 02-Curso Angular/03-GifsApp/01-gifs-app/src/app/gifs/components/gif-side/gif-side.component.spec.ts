import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifSideComponent } from './gif-side.component';

describe('GifSideComponent', () => {
  let component: GifSideComponent;
  let fixture: ComponentFixture<GifSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GifSideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
