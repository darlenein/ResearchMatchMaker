import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [
      AuthModule.forRoot({
        config: {
            authority: 'https://login.microsoftonline.com/7cf48d45-3ddb-4389-a9c1-c115526eb52e/',
            redirectUrl: 'https://rmm.bd.psu.edu/auth-callback',
            postLogoutRedirectUri: 'https://rmm.bd.psu.edu/',
            clientId: '2c8037bf-a5f2-455b-9020-df58af5387ab',
            scope: 'openid profile api1', // 'openid profile offline_access ' + your scopes
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            maxIdTokenIatOffsetAllowedInSeconds: 600,
            issValidationOff: false,
            autoUserInfo: false,      
        }
      })
    ],
    exports: [AuthModule],
})
export class AuthConfigModule {}
