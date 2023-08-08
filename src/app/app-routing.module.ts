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
  },  {
    path: 'qr-details',
    loadChildren: () => import('./pages/qr/qr-details/qr-details.module').then( m => m.QrDetailsPageModule)
  },
  {
    path: 'wallet-to-wallet',
    loadChildren: () => import('./pages/wallet/transfer/wallet-to-wallet/wallet-to-wallet.module').then( m => m.WalletToWalletPageModule)
  },
  {
    path: 'wallet-to-account',
    loadChildren: () => import('./pages/wallet/transfer/wallet-to-account/wallet-to-account.module').then( m => m.WalletToAccountPageModule)
  },
  {
    path: 'account-to-wallet',
    loadChildren: () => import('./pages/wallet/transfer/account-to-wallet/account-to-wallet.module').then( m => m.AccountToWalletPageModule)
  },
  {
    path: 'edl-payment',
    loadChildren: () => import('./pages/bill-payment/edl-payment/edl-payment.module').then( m => m.EdlPaymentPageModule)
  },
  {
    path: 'water-bill',
    loadChildren: () => import('./pages/bill-payment/water-bill/water-bill.module').then( m => m.WaterBillPageModule)
  },
  {
    path: 'road-tax',
    loadChildren: () => import('./pages/bill-payment/road-tax/road-tax.module').then( m => m.RoadTaxPageModule)
  },
  {
    path: 'internet',
    loadChildren: () => import('./pages/bill-payment/internet/internet.module').then( m => m.InternetPageModule)
  },
  {
    path: 'bill-payment',
    loadChildren: () => import('./pages/bill-payment/bill-payment.module').then( m => m.BillPaymentPageModule)
  },
  {
    path: 'acc-statement',
    loadChildren: () => import('./pages/account/acc-statement/acc-statement.module').then( m => m.AccStatementPageModule)
  },
  {
    path: 'province-list',
    loadChildren: () => import('./shared/modals/province-list/province-list.module').then( m => m.ProvinceListPageModule)
  },
  {
    path: 'confirm-transfer',
    loadChildren: () => import('./pages/account/transfer/confirm-transfer/confirm-transfer.module').then( m => m.ConfirmTransferPageModule)
  },
  {
    path: 'txn-result',
    loadChildren: () => import('./pages/account/transfer/txn-result/txn-result.module').then( m => m.TxnResultPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
