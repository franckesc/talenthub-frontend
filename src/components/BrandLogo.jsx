import { FiBriefcase } from "react-icons/fi";
import { Link } from "react-router-dom";

function BrandLogo({ to = "/" }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 text-lg font-bold text-[#103f73]"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#103f73] text-white">
        <FiBriefcase size={15} />
      </span>

      <span>TalentHub</span>
    </Link>
  );
}

export default BrandLogo;