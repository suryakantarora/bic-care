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
    loadChildren: () => import('./pages/account/dashboard/dashboard.module').then( m => m.DashboardPageModule),
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
    loadChildren: () => import('./pages/qr/scan-qr/scan-qr.module').then( m => m.ScanQrPageModule)
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
  {
    path: 'settings',
    loadChildren: () => import('./pages/tabs/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'kyc-status',
    loadChildren: () => import('./pages/wallet/kyc/kyc-status/kyc-status.module').then( m => m.KycStatusPageModule)
  },
  {
    path: 'wallet-qr',
    loadChildren: () => import('./pages/qr/wallet-qr/wallet-qr.module').then( m => m.WalletQrPageModule)
  },
  {
    path: 'account-qr',
    loadChildren: () => import('./pages/qr/account-qr/account-qr.module').then( m => m.AccountQrPageModule)
  },
  {
    path: 'link-card',
    loadChildren: () => import('./pages/wallet/link-card/link-card.module').then( m => m.LinkCardPageModule)
  },
  {
    path: 'update-kyc',
    loadChildren: () => import('./pages/wallet/kyc/update-kyc/update-kyc.module').then( m => m.UpdateKycPageModule)
  },
  {
    path: 'qr-option',
    loadChildren: () => import('./pages/qr/qr-option/qr-option.module').then( m => m.QrOptionPageModule)
  },
  {
    path: 'account-list',
    loadChildren: () => import('./shared/modals/account-list/account-list.module').then( m => m.AccountListPageModule)
  },
  {
    path: 'verify-otp',
    loadChildren: () => import('./shared/modals/verify-otp/verify-otp.module').then( m => m.VerifyOtpPageModule)
  },
  {
    path: 'manage-card',
    loadChildren: () => import('./pages/account/manage-card/manage-card.module').then( m => m.ManageCardPageModule)
  },
  {
    path: 'ft-bic-bic',
    loadChildren: () => import('./pages/account/transfer/ft-bic-bic/ft-bic-bic.module').then( m => m.FtBicBicPageModule)
  },
  {
    path: 'ft-bic-bcel',
    loadChildren: () => import('./pages/account/transfer/ft-bic-bcel/ft-bic-bcel.module').then( m => m.FtBicBcelPageModule)
  },
  {
    path: 'ft-bic-lapnet',
    loadChildren: () => import('./pages/account/transfer/ft-bic-lapnet/ft-bic-lapnet.module').then( m => m.FtBicLapnetPageModule)
  },
  {
    path: 'ft-bic-umoney',
    loadChildren: () => import('./pages/account/transfer/ft-bic-umoney/ft-bic-umoney.module').then( m => m.FtBicUmoneyPageModule)
  },
  {
    path: 'ft-bic-mmoney',
    loadChildren: () => import('./pages/account/transfer/ft-bic-mmoney/ft-bic-mmoney.module').then( m => m.FtBicMmoneyPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
