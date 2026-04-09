import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterInformantComponent } from './pages/register-informant/register-informant.component';
import { RegisterEstablishmentComponent } from './pages/register-establishment/register-establishment.component';
import { SearchEstablishmentInformantComponent } from './pages/search-establishment-informant/search-establishment-informant.component';
import { ItemSelectionComponent } from './pages/item-selection/item-selection.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { ModalPesquisaComponent } from './pages/main/modals/modal-pesquisa.component'
import { ModalProdutoComponent } from './pages/main/modals/modal-produto.component'

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  { path: 'register-informant', component: RegisterInformantComponent },
  { path: 'register-establishment', component: RegisterEstablishmentComponent },
  { path: 'search-establishment-informant', component: SearchEstablishmentInformantComponent },
  { path: 'item-selection', component: ItemSelectionComponent },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'nova-pesquisa', component: ModalPesquisaComponent },
  { path: 'novo-produto', component: ModalProdutoComponent },
];
