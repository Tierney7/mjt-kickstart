const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String, 
      unique: true,
      required: true,
      max_length: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max_length: 50,
    },
   
    thoughts: [thoughtsSchema]
    

     // friends: [assignmentSchema],
  },

  
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
