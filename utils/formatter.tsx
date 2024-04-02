function formatDate(date: Date) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hours = date.getHours() % 12 || 12; // 12 saatlik saat formatı için
  const minutes = date.getMinutes() === 0 ? '00' : date.getMinutes();
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${month} ${day}, ${hours}.${minutes} ${ampm}`;
}

export { formatDate };
