import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SassViewComponent } from './sass-view/sass-view.component';
import { BootstrapViewComponent } from './bootstrap-view/bootstrap-view.component';
import { MaterialViewComponent } from './material-view/material-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/sass', pathMatch: 'full' },
  { path: 'sass', component: SassViewComponent },
  { path: 'bootstrap', component: BootstrapViewComponent },
  { path: 'material', component: MaterialViewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
