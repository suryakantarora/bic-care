import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/account/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'acc-details',
    loadChildren: () => import('./pages/account/acc-details/acc-details.module').then( m => m.AccDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./prelogin/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-pin',
    loadChildren: () => import('./prelogin/forgot-pin/forgot-pin.module').then( m => m.ForgotPinPageModule)
  },
  {
    path: 'atm-location',
    loadChildren: () => import('./prelogin/atm-location/atm-location.module').then( m => m.AtmLocationPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./shared/error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: 'select-lang',
    loadChildren: () => import('./shared/popovers/select-lang/select-lang.module').then( m => m.SelectLangPageModule)
  },
  {
    path: 'pin-login',
    loadChildren: () => import('./prelogin/pin-login/pin-login.module').then( m => m.PinLoginPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./prelogin/start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./prelogin/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'alert',
    loadChildren: () => import('./shared/popovers/alert/alert.module').then( m => m.AlertPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./shared/popovers/loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'scan-qr',
    loadChildren: () => import('./pages/scan-qr/scan-qr.module').then( m => m.ScanQrPageModule)
  },
  {
    path: 'user-login',
    loadChildren: () => import('./prelogin/user-login/user-login.module').then( m => m.UserLoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./prelogin/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'rates',
    loadChildren: () => import('./prelogin/rates/rates.module').then( m => m.RatesPageModule)
  },
  {
    path: 'txn-fee',
    loadChildren: () => import('./prelogin/txn-fee/txn-fee.module').then( m => m.TxnFeePageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./prelogin/support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./prelogin/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'terms-condition',
    loadChildren: () => import('./prelogin/terms-condition/terms-condition.module').then( m => m.TermsConditionPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'ft-options',
    loadChildren: () => import('./shared/modals/ft-options/ft-options.module').then( m => m.FtOptionsPageModule)
  },
  {
    path: 'wallet-dashboard',
    loadChildren: () => import('./pages/wallet/wallet-dashboard/wallet-dashboard.module').then( m => m.WalletDashboardPageModule)
  },
  {
    path: 'select-date',
    loadChildren: () => import('./shared/popovers/select-date/select-date.module').then( m => m.SelectDatePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
