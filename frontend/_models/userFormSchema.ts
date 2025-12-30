import FormType from "@/_types/formType";
import { Schema, models, model } from "mongoose";

const userFormSchema = new Schema<FormType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [
      {
        value: { type: String, required: true },
        type: { type: String, required: true },
        options: [{ type: String }],
        required: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

// ✅ Prevent model overwrite error in Next.js
const UserForm = models.UserForm || model<FormType>("UserForm", userFormSchema);

export default UserForm;
