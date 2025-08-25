import { Routes } from '@angular/router';
import { EditorComponent } from './pages/editor/editor.component';
import { RegistrationComponent } from './pages/registration/registration.component';

export const routes: Routes = [
    { path: '', component: RegistrationComponent },
  { path: 'editor', component: EditorComponent }
];
