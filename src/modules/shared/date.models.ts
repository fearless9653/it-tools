import { format } from 'date-fns';

export { getUrlFriendlyDateTime, getCompactDateTime };

function getUrlFriendlyDateTime({ date = new Date() }: { date?: Date } = {}) {
  return format(date, 'yyyy-MM-dd-HH-mm-ss');
}

function getCompactDateTime({ date = new Date() }: { date?: Date } = {}) {
  return format(date, 'yyyyMMdd-HHmmss');
}
