const { Schema, model } = require('mongoose');

// Schema to create a course model
const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
      },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
      
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // Sets a default value of 12 weeks from now
      // default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
    },
    // students: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Student',
    //   },
    // ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
