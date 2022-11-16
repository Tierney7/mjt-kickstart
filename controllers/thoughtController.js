const { User, Thought } = require("../models");

module.exports = {
    getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
    getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "no thought found" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        res.status(404).json({ message: "No thought with that id" });
      } else {
        await User.findOneAndUpdate(
          { user: req.params.userId },
          { $pull: { user: req.params.thoughtId } },
          { new: true }
        );
        res.json({ message: "thought successfully deleted" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  postReaction(req, res) {
    Reaction.create(req.body)
      .then((reaction) => res.json(reaction))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
   async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findOneAndRemove({
        _id: req.params.reaction,
      });
      if (!reaction) {
        res.status(404).json({ message: "no reaction with that id" });
      } else {
        await Thought.findOneAndUpdate(
          { thought: req.params.thoughtId },
          { $pull: { user: req.params.reactionId } },
          { new: true }
        );
        res.json({ message: "Successfully deleted" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};