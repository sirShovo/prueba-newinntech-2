import { Schema, model } from `mongoose`;

const UserSchema = new Schema({
  name: String,
  userid: String,
  updated_at: { type: Date, default: Date.now },
});

const newLocal = "find-or-create";
UserSchema.statics.findOrCreate = require(newLocal);

export default model('User', UserSchema);
