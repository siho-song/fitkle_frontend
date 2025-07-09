import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-6">로그인</h1>
      {/* TODO: 로그인 폼/입력/버튼 등 상위 구조만 우선 구현 */}
      <form className="space-y-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="mb-2 font-semibold">이메일</div>
          {/* 이메일 입력 필드 */}
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="mb-2 font-semibold">비밀번호</div>
          {/* 비밀번호 입력 필드 */}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded bg-gray-200 cursor-pointer hover:bg-gray-300"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-primary text-white cursor-pointer hover:bg-primary/80"
          >
            로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage; 