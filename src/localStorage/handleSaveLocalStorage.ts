import Show from '@/interfaces/Show';

export default function handleLocalStorageSave(key: string, prevValue: Show[], newValue: Show) {
  if (prevValue.length > 0) {
    localStorage.setItem(key, JSON.stringify([...prevValue, newValue]));
  } else {
    localStorage.setItem(key, JSON.stringify([newValue]));
  }
};
