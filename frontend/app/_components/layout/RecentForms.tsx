import FormType from "@/_types/formType";
import RecentFormCard from "../forms/RecentFormCard";

const RecentForms = async () => {
  const res = await fetch("http://localhost:3000/api/form", {
    cache: "no-store",
  });

  const forms: FormType[] = await res.json();

  return (
    <section className="w-full px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6">Recent Forms</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {forms.map(({ _id, title, description, questions }) => (
          <RecentFormCard
            key={_id}
            _id={_id}
            title={title}
            description={description}
            questions={questions}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentForms;
