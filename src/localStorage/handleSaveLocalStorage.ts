import Show from '@/interfaces/Show';

export default function handleLocalStorageSave(prevValue: Show[], newValue: Show) {
  if (prevValue.length > 0) {
    localStorage.setItem('showSchedule', JSON.stringify([...prevValue, newValue]));
  } else {
    localStorage.setItem('showSchedule', JSON.stringify([newValue]));
  }
};
