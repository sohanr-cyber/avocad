import mongoose from "mongoose";

const StructureShema = new mongoose.Schema(
  {
    userId: { type: String },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

const Structure =
  mongoose.models.Structure || mongoose.model("Structure", StructureShema);
export default Structure;
