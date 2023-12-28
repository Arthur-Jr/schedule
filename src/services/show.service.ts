import connectMongoDB from '@/config/mongodb';
import Show from '@/interfaces/Show';
import show from '@/models/shows';

async function addNewUser(username: string) {
  await connectMongoDB();
  await show.create({ username, shows: [] });
}

export async function getShows(username: string): Promise<{ username: string, shows: Show[] }> {
  await connectMongoDB();
  const result = await show.findOne({ username });

  if (!result) {
    await addNewUser(username);
    return { username, shows: [] };
  }

  return result;
}

export async function addShow(username: string, newShow: Show): Promise<void> {
  await connectMongoDB();
  await show.updateOne({ username }, { $addToSet: { shows: newShow } });
}

export async function removeShow(username: string, showToRemove: Show): Promise<void> {
  await connectMongoDB();
  await show.updateOne({ username }, { $pull: { shows: { name: showToRemove.name } } });
}