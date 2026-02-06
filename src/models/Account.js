import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    default: 1000, // Start with fake $1000
  },
  transactions: [
    {
      type: {
        type: String,
        enum: ['Deposit', 'Withdrawal', 'Transfer'],
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
      to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
});

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);