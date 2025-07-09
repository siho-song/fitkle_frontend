import React, { useState } from "react";
import { AppButton } from "../common/AppButton";
import { SocialLoginButton } from "../common/SocialLoginButton";
import { Logo } from "../common/Logo";
import { useAuthStore } from "@/features/auth/store/authStore";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface LoginModalProps {
  onLoginSuccess?: () => void;
  onClose?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  onLoginSuccess,
  onClose,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login } = useAuthStore();
  const router = useRouter();

  const handleLogin = async () => {
    // 에러 초기화
    setEmailError("");
    setPasswordError("");

    try {
      setIsLoading(true);

      // 임시 로그인: 닉네임 자동 생성 (백엔드 없이 바로 로그인)
      const nickname = email.trim() ? email.split("@")[0] || "testuser" : "testuser";
      const userId = `user_${Date.now()}`;

      // 임시 로그인 성공 시뮬레이션 (짧은 지연)
      await new Promise((resolve) => setTimeout(resolve, 500));

      // authStore에 로그인 상태 저장
      await login({ nickname, userId });

      // 성공 콜백 호출
      if (onLoginSuccess) onLoginSuccess();
      if (onClose) onClose();
    } catch (error) {
      setPasswordError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      setEmailError("");
      setPasswordError("");

      // SNS 로그인 시뮬레이션
      const nickname = `${provider}_user`;
      const userId = `${provider}_${Date.now()}`;

      await new Promise((resolve) => setTimeout(resolve, 800));
      await login({ nickname, userId });

      if (onLoginSuccess) onLoginSuccess();
      if (onClose) onClose();
    } catch (error) {
      setPasswordError(
        `${provider.toUpperCase()} 로그인 중 오류가 발생했습니다.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupClick = () => {
    if (onClose) onClose();
    router.push(ROUTES.SIGNUP);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={(e) => {
        // 모달 외부 클릭 시 닫기
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full px-8 py-12 relative"
        style={{ maxWidth: "400px", minHeight: "580px" }}
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 이벤트 전파 중단
      >
        {/* Header: Logo + Close */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 cursor-pointer"
          onClick={onClose}
          aria-label="닫기"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            className="w-6 h-6"
          >
            <line
              x1="18"
              y1="6"
              x2="6"
              y2="18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="6"
              y1="6"
              x2="18"
              y2="18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="flex justify-center mb-10">
          <Logo size="medium" />
        </div>

        {/* Email & Password Fields */}
        <div className="mb-4">
          <input
            type="email"
            className={`w-full h-13 px-4 border-[1px] rounded-lg focus:outline-none text-base placeholder:text-hintText text-black ${
              emailError
                ? "border-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-black"
            }`}
            placeholder="이메일을 입력해 주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1 ml-1">{emailError}</p>
          )}
        </div>

        <div className="mb-3">
          <input
            type="password"
            className={`w-full h-13 px-4 border-[1px] rounded-lg focus:outline-none text-base placeholder:text-hintText text-black ${
              passwordError
                ? "border-red-500 focus:border-red-500"
                : "border-gray-200 focus:border-black"
            }`}
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <p className="text-red-500 text-xs mt-1 ml-1">{passwordError}</p>
          )}
        </div>

        <AppButton
          variant="primary"
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full h-13 mt-1 mb-8"
          type="button"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </AppButton>

        {/* 로그인 유지 & 아이디/비밀번호 찾기 */}
        <div className="flex items-center justify-between mb-10">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={keepLogin}
              onChange={(e) => setKeepLogin(e.target.checked)}
              className="accent-primaryLight w-4 h-4 rounded border-gray-300 text-gray"
            />
            <span className="text-gray text-sm font-medium">로그인 유지</span>
          </label>
          <button
            className="text-sm text-gray hover:underline cursor-pointer"
            type="button"
          >
            아이디/비밀번호 찾기
          </button>
        </div>

        {/* SNS Divider */}
        <div className="flex items-center mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="mx-3 text-xs text-gray-400 font-medium whitespace-nowrap">
            SNS 간편 로그인
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* SNS Login Buttons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <SocialLoginButton
            type="kakao"
            onClick={() => handleSocialLogin("kakao")}
          />
          <SocialLoginButton
            type="naver"
            onClick={() => handleSocialLogin("naver")}
          />
          <SocialLoginButton
            type="google"
            onClick={() => handleSocialLogin("google")}
          />
          <SocialLoginButton
            type="facebook"
            onClick={() => handleSocialLogin("facebook")}
          />
        </div>

        {/* 회원가입 안내 */}
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-gray-400">아직 회원이 아니신가요?</span>
          <button
            className="text-black font-bold hover:underline cursor-pointer"
            type="button"
            onClick={handleSignupClick}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
};
