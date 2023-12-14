import Show from '@/interfaces/Show';

export default function handleLocalStorageRemove(value: Show[]) {
  localStorage.setItem('showSchedule', JSON.stringify(value));
};
