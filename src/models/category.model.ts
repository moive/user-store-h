import { model, Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
    unique: true,
  },
  available: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    Reflect.deleteProperty(ret, "_id"); // delete ret._id
  },
});
export const CategoryModel = model("Category", categorySchema);
