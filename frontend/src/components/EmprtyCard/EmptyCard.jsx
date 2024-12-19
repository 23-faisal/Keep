const EmptyCard = () => {
  return (
    <div className=" mt-10 lg:mt-0 flex flex-col items-center justify-center text-center">
      <img
        className="w-full sm:w-1/2 h-1/2 object-contain"
        src="https://cdn3d.iconscout.com/3d/premium/thumb/task-list-3d-icon-download-in-png-blend-fbx-gltf-file-formats--todo-to-do-plan-checklist-business-pack-icons-6777694.png?f=webp"
        alt="Empty image"
      />
      <h1 className="px-4 font-semibold text-slate-700 text-md leading-7">
        Start creating your first note. Click the &apos;+&apos; button to jot
        down your thoughts, ideas, and reminders. <br />
        <span className="text-xl font-bold text-blue-500">
          Let&apos;s get started!
        </span>
      </h1>
    </div>
  );
};

export default EmptyCard;
