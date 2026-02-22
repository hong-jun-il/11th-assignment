export function formatLocalDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatKorDate(date: string) {
  if (!date) {
    return "";
  }

  const [year, month, day] = date.split("-");

  return `${year}년 ${month}월 ${day}일`;
}
