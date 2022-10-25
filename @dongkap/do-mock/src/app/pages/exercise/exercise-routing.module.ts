import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseComponent } from './exercise.component';
import { ExercisePageComponent } from './exercise-page.component';
import { ExerciseWizardComponent } from './wizard/exercise-wizard.component';
import { ExerciseWizardStep1Component } from './wizard/step1/exercise-wizard-step1.component';
import { ExerciseWizardStep2Component } from './wizard/step2/exercise-wizard-step2.component';
import { ExerciseWizardStep3Component } from './wizard/step3/exercise-wizard-step3.component';

const routes: Routes = [
  {
    path: '',
    component: ExerciseComponent,
    children: [
      {
        path: 'common',
        component: ExercisePageComponent,
        data: {
          title: 'Exercise'
        },
      },
      {
        path: 'wizard',
        component: ExerciseWizardComponent,
        data: {
          name: 'Exercise Wizard',
        },
        children: [
          {
            path: 'step-1',
            component: ExerciseWizardStep1Component,
            data: {
              title: 'Personal Information',
            },
          },
          {
            path: 'step-2',
            component: ExerciseWizardStep2Component,
            data: {
              title: 'Profile',
            },
          },
          {
            path: 'step-3',
            component: ExerciseWizardStep3Component,
            data: {
              title: 'Skill',
            },
          },
          {
            path: '**',
            redirectTo: 'step-1',
          },
        ],
      },
      {
        path: '',
        redirectTo: 'common',
        pathMatch: 'full',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule {}
