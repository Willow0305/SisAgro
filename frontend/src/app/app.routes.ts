import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { MainComponent } from './pages/main/main';
import { RegisterInformantComponent } from './pages/register-informant/register-informant';
import { RegisterEstablishmentComponent } from './pages/register-establishment/register-establishment';
import { SearchEstablishmentInformantComponent } from './pages/search-establishment-informant/search-establishment-informant';
import { ItemSelectionComponent } from './pages/item-selection/item-selection';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register-informant', component: RegisterInformantComponent },
  { path: 'register-establishment', component: RegisterEstablishmentComponent },
  { path: 'search-establishment-informant', component: SearchEstablishmentInformantComponent },
  { path: 'item-selection', component: ItemSelectionComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
];
