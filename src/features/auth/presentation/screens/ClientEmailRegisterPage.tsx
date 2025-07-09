"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CenteredLayout } from "@/components/layouts/CenteredLayout";
import { Eye, EyeOff } from "lucide-react";
import { LoginModal } from "@/components/login/LoginModal";
import { TEST_CREDENTIALS } from "@/utils/validation";

const ClientEmailRegisterPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type"); // 'tutee' or 'tutor'

  // Form state
  const [agreeAll, setAgreeAll] = useState(false);
  const [agree14, setAgree14] = useState(false);
  const [agreeService, setAgreeService] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Input values
  const [email, setEmail] = useState(TEST_CREDENTIALS.email);
  const [password, setPassword] = useState(TEST_CREDENTIALS.password);
  const [password2, setPassword2] = useState(TEST_CREDENTIALS.password);

  // Validation
  const [emailError, setEmailError] = useState<string | null>(null);
  
  // Refs for focus management
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  // Handle agreement changes
  const handleAgreeAllChange = (checked: boolean) => {
    setAgreeAll(checked);
    setAgree14(checked);
    setAgreeService(checked);
    setAgreePrivacy(checked);
    setAgreeMarketing(checked);
  };

  // Validate email
  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError(null);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("이메일 주소가 올바르지 않아요");
    } else {
      setEmailError(null);
    }
  };

  // Password validation
  const isPasswordValid = () => {
    const hasMinLength = password.length >= 8;
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$&*~]/.test(password);
    return hasMinLength && hasLetter && hasNumber && hasSpecial;
  };

  const isPasswordMatch = password === password2;
  const showPasswordError = password2 && !isPasswordMatch;

  // Handle form submission
  const handleSubmit = () => {
    if (isFormValid) {
      if (type === "tutor") {
        router.push("/expert-register-complete");
      } else {
        router.push("/identity-verification");
      }
    } else {
      // Focus on first invalid field
      if (!email) {
        emailRef.current?.focus();
      } else if (emailError) {
        emailRef.current?.focus();
      } else if (!password) {
        passwordRef.current?.focus();
      } else if (!isPasswordValid()) {
        passwordRef.current?.focus();
      } else if (!password2) {
        password2Ref.current?.focus();
      } else if (!isPasswordMatch) {
        password2Ref.current?.focus();
      } else if (!agree14) {
        // Scroll to agreement section
        const agreementSection = document.querySelector('[data-agreement="14"]');
        agreementSection?.scrollIntoView({ behavior: 'smooth' });
      } else if (!agreeService) {
        const agreementSection = document.querySelector('[data-agreement="service"]');
        agreementSection?.scrollIntoView({ behavior: 'smooth' });
      } else if (!agreePrivacy) {
        const agreementSection = document.querySelector('[data-agreement="privacy"]');
        agreementSection?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Check if form is valid
  const isFormValid =
    email &&
    password &&
    password2 &&
    isPasswordValid() &&
    isPasswordMatch &&
    agree14 &&
    agreeService &&
    agreePrivacy;

  return (
    <CenteredLayout showLogo={true} logoSize="big" maxWidth="lg">
      <div className="w-full max-w-lg mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-bold text-black leading-[1.2] mb-2">
            회원가입하고
          </h1>
          <h2 className="text-[28px] font-bold text-black leading-[1.2] mb-4">
            비즈니스 성공을 시작해 보세요!
          </h2>
          <div className="flex justify-center items-center gap-1">
            <span className="text-[#6B7280] text-[15px]">
              이미 계정이 있으신가요?
            </span>
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-[#2563EB] text-[15px] underline hover:no-underline cursor-pointer"
            >
              로그인하기
            </button>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-5 mb-8">
          {/* Email */}
          <div>
            <label className="block text-[15px] font-bold text-black mb-2">
              이메일
            </label>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              placeholder="이메일을 입력해 주세요"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors placeholder-hintText text-black"
            />
            {emailError && (
              <p className="text-red-500 text-[13px] mt-1 ml-1">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[15px] font-bold text-black">
                비밀번호
              </label>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#9CA3AF] hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="영문, 숫자, 특수문자가 모두 들어간 8자 이상"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors placeholder-hintText text-base text-black"
            />
          </div>

          {/* Password Confirm */}
          <div>
            <input
              ref={password2Ref}
              type={showPassword ? "text" : "password"}
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="비밀번호를 한번 더 입력해 주세요"
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors placeholder-hintText text-base text-black"
            />
            {showPasswordError && (
              <p className="text-red-500 text-[13px] mt-1 ml-1">
                비밀번호가 일치하지 않아요 확인해 주세요
              </p>
            )}
          </div>
        </div>

        {/* Agreement Section */}
        <div className="w-full p-6 bg-[#F9FAFB] border-2 border-[#F3F4F6] rounded-xl mb-8">
          <AgreementItem
            checked={agreeAll}
            onChange={handleAgreeAllChange}
            label="모두 동의합니다."
            bold
          />
          <div className="border-t border-[#E5E7EB] my-6" />

          <div className="space-y-3">
            <div data-agreement="14">
              <AgreementItem
                checked={agree14}
                onChange={setAgree14}
                label="만 14세 이상입니다."
              />
            </div>
            <div data-agreement="service">
              <AgreementItem
                checked={agreeService}
                onChange={setAgreeService}
                label={
                  <span>
                    <span className="text-[#2563EB] underline cursor-pointer">
                      서비스 이용약관
                    </span>
                    에 동의합니다.
                  </span>
                }
              />
            </div>
            <div data-agreement="privacy">
              <AgreementItem
                checked={agreePrivacy}
                onChange={setAgreePrivacy}
                label={
                  <span>
                    <span className="text-[#2563EB] underline cursor-pointer">
                      개인정보 수집 이용
                    </span>
                    에 동의합니다.
                  </span>
                }
              />
            </div>
            <AgreementItem
              checked={agreeMarketing}
              onChange={setAgreeMarketing}
              label={
                <div>
                  <div>
                    마케팅 수신 홍보목적의{" "}
                    <span className="text-[#2563EB] underline cursor-pointer">
                      개인정보 수집 및 이용
                    </span>
                  </div>
                  <div className="mt-1">에 동의합니다.(선택)</div>
                </div>
              }
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className={`w-full h-14 rounded-lg font-bold text-[18px] transition-colors cursor-pointer ${
            isFormValid
              ? "bg-primary text-black hover:bg-primaryDark"
              : "bg-grayLight text-black opacity-50"
          }`}
        >
          가입완료
        </button>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={() => {
            setShowLoginModal(false);
            router.push("/");
          }}
        />
      )}
    </CenteredLayout>
  );
};

interface AgreementItemProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  bold?: boolean;
}

const AgreementItem: React.FC<AgreementItemProps> = ({
  checked,
  onChange,
  label,
  bold = false,
}) => {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => onChange(!checked)}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-4 h-4 rounded border-2 border-[#D1D5DB] accent-black cursor-pointer flex-shrink-0"
      />
      <div
        className={`text-[15px] leading-[1.2] ${
          bold ? "font-bold text-black" : "text-[#374151]"
        }`}
      >
        {label}
      </div>
    </div>
  );
};

export default ClientEmailRegisterPage;
