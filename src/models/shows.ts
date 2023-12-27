import Show from '@/interfaces/Show';
import mongoose, { Schema } from 'mongoose';

const ShowsSchema = new Schema<{ username: string, shows: Show[] }>({
  username: { type: String, unique: true, required: true },
  shows: [
    { 
      name: String,
      image: { medium: String, original: String },
      staus: String,
      schedule: { time: String, days: [String] },
    }
  ]
});

const show = mongoose.model('Show', ShowsSchema);

export default show;
