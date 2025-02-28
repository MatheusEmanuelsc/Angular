import { Routes } from '@angular/router';
import { CouterComponent } from './pages/couter/couter.component';
import { HeroComponent } from './pages/hero/hero.component';

export const routes: Routes = [
  { path: '', component: CouterComponent },
  {
    path: 'hero',
    component: HeroComponent,
  },
];
