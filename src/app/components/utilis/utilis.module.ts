import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UtilisComponent } from './utilis.component';
import { PlansSectionsComponent } from './plans-sections/plans-sections.component';

const routes: Routes = [
  {
    path: 'planSection',
    component: PlansSectionsComponent,
  },
];

@NgModule({
  declarations: [UtilisComponent, PlansSectionsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class UtilisModule {}
