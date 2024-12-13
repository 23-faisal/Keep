import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out ">
      <div className="flex items-center  justify-between ">
        <div>
          <h6 className="text-sm font-medium ">{title}</h6>
          <span className="text-xs text-slate-500 ">{date}</span>
        </div>
        <MdOutlinePushPin
          className={` text-xl cursor-pointer ${
            isPinned ? "text-blue-500  " : "text-slate-500"
          }`}
        />
      </div>
      <p className="mt-2 mb-1 ">{content?.slice(0, 55)}</p>

      <div className="">
        <div className="text-xs font-semibold  text-slate-500 ">
          #{tags[0]?.toUpperCase() + tags?.slice(1)}
        </div>
        <div className="flex items-center gap-2 mt-2 ">
          <MdCreate
            onClick={onEdit}
            className="text-xl  text-slate-700 hover:text-green-700  cursor-pointer transition ease-in-out duration-100 "
          />

          <MdDelete
            onClick={onDelete}
            className=" text-xl text-red-500 hover:text-red-600  cursor-pointer transition ease-in-out duration-100 "
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
