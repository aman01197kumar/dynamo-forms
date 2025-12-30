import connectDB from "@/_lib/mongoose";
import UserForm from "@/_models/userFormSchema";
import RecentFormCard from "../forms/RecentFormCard";
import FormType from "@/_types/formType";

const RecentForms = async () => {
  await connectDB();

  const forms = await UserForm.find()
    .sort({ createdAt: -1 })
    .lean<FormType[]>();

  return (
    <section className="w-full px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6">Recent Forms</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {forms.map((form) => (
          <RecentFormCard key={form._id} {...form} />
        ))}
      </div>
    </section>
  );
};

export default RecentForms;
