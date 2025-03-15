import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifsSideMenuLogoComponent } from './gifs-side-menu-logo.component';

describe('GifsSideMenuLogoComponent', () => {
  let component: GifsSideMenuLogoComponent;
  let fixture: ComponentFixture<GifsSideMenuLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GifsSideMenuLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifsSideMenuLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
