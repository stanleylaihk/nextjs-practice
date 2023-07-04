import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
  userId: {
    type: Number,
  },
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  body: {
    type: String,
  },
});

const Post = models.Post || model("Post", PostSchema);

export default Post;
