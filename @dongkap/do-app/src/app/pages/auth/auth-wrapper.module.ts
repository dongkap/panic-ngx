import { NgModule } from '@angular/core';
import { DoAuthModule } from '@dongkap/do-auth';

@NgModule({
  imports: [ DoAuthModule.forRoot() ],
})
export class AuthWrapperModule {}
