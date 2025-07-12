// 인증 관련 요청 DTO

export interface LoginRequestDto {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupRequestDto {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  userType: 'student' | 'tutor';
  termsAccepted: boolean;
  privacyAccepted: boolean;
  marketingAccepted?: boolean;
}

export interface EmailVerificationRequestDto {
  email: string;
}

export interface EmailVerificationConfirmDto {
  email: string;
  verificationCode: string;
}

export interface PasswordResetRequestDto {
  email: string;
}

export interface PasswordResetConfirmDto {
  email: string;
  resetToken: string;
  newPassword: string;
  confirmPassword: string;
}

export interface PasswordChangeRequestDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface RefreshTokenRequestDto {
  refreshToken: string;
}

export interface LogoutRequestDto {
  refreshToken?: string;
}

export interface SocialLoginRequestDto {
  provider: 'google' | 'naver' | 'kakao';
  accessToken: string;
  userType: 'student' | 'tutor';
}