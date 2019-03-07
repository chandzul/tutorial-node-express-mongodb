import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;