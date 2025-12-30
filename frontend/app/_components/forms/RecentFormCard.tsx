import FormType from "@/_types/formType";
import Link from "next/link";

type Props = Pick<FormType, "title" | "description" | "questions"> & {
  _id?: string;
};

export default function RecentFormCard({
  _id,
  title,
  description,
  questions,
}: Props) {
  return (
    <Link href={`/forms/${_id}`}>
      <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer border-t-4 border-violet-700 p-4 h-[180px] flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold line-clamp-1">
            {title || "Untitled Form"}
          </h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {description || "No description"}
          </p>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          {questions?.length || 0} questions
        </div>
      </div>
    </Link>
  );
}
