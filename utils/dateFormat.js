const addDateSuffix = date => {
  let dateStr = date.toString();
  const lastChar = dateStr.charAt(dateStr.length - 1);

  const suffixes = {
    '1': 'st',
    '2': 'nd',
    '3': 'rd',
  };

  dateStr += suffixes[lastChar] || 'th';
  return dateStr;
};

module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const dateObj = new Date(timestamp);
  const formattedMonth = monthLength === 'short' ? months[dateObj.getMonth()] : months[dateObj.getMonth()].substring(0, 3);
  const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
  const year = dateObj.getFullYear();
  let hour = dateObj.getHours() % 12 || 12;
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};
