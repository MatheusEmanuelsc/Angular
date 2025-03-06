import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GifsSideMenuProfileComponent } from './gifs-side-menu-profile.component';

describe('GifsSideMenuProfileComponent', () => {
  let component: GifsSideMenuProfileComponent;
  let fixture: ComponentFixture<GifsSideMenuProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GifsSideMenuProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GifsSideMenuProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
