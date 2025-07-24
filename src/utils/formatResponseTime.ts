/**
 * 응답 시간을 분 단위에서 사용자 친화적인 형태로 변환합니다.
 * @param minutes - 응답 시간 (분 단위)
 * @returns 포맷된 응답 시간 문자열
 */
export function formatResponseTime(minutes: number): string {
  if (minutes < 60) {
    return `평균 응답 ${minutes}분 이내`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `평균 응답 ${hours}시간 이내`;
  }
  
  return `평균 응답 ${hours}시간 ${remainingMinutes}분 이내`;
}