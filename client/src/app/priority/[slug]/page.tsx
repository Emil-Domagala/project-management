import { Priority } from "@/state/api";
import ReusableLayout from "../reusableLayout/ReusableLayout";

const PriorityPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params; // ✅ Await params before using it

  if (!slug) return <p>No priority selected</p>;

  // Capitalize first letter to match Priority enum
  const formattedSlug = slug.charAt(0).toUpperCase() + slug.slice(1);
  console.log(formattedSlug);

  if (!Object.values(Priority).includes(formattedSlug as Priority))
    return <p>Invalid priority</p>;

  return <ReusableLayout priority={formattedSlug as Priority} />;
};

export default PriorityPage;
