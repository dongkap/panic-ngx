import { Component } from '@angular/core';
import { DoWizardService } from '@dongkap/do-shared';

@Component({
  selector: 'ngx-exercise-wizard',
  templateUrl: 'exercise-wizard.component.html',
  styleUrls: ['./exercise-wizard.component.scss'],
})
export class ExerciseWizardComponent {

  constructor(private service: DoWizardService) { }

  formIsValid(): boolean {
    return this.service.formIsValid();
  }

  onSaveDraft(){
    console.log(this.service.getFormGroup().value);
  }

  onSend(){
    console.log(this.service.getFormGroup().value);
  }

}
