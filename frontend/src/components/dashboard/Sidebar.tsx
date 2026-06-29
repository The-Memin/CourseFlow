import NavItems from "./NavItems";

export default function Sidebar() {
  return (
    <aside
      className="
      hidden md:flex
      w-64
      flex-col
      border-r
      bg-background
      sticky top-0 h-screen
      "
    >
      <div className="p-6">
        <h2 className="font-bold text-xl">
          Course Tracker
        </h2>
      </div>

      <div className="px-4">
        <NavItems />
      </div>
    </aside>
  );
}