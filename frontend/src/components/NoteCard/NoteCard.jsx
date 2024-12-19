import { MdCreate, MdDelete, MdOutlinePushPin } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

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
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <MdOutlinePushPin
          onClick={onPinNote}
          className={`text-xl cursor-pointer ${
            isPinned ? "text-blue-500" : "text-slate-500"
          }`}
        />
      </div>
      <p className="mt-2 mb-1">{content?.slice(0, 55)}</p>
      <div className="text-xs font-semibold text-slate-500 flex gap-2">
        {tags.length > 0 ? `${tags.join(", ")}` : "No tags available"}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <MdCreate
          onClick={onEdit}
          className="text-xl text-slate-700 hover:text-green-700 cursor-pointer transition ease-in-out duration-100"
        />

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="text-xl text-red-500 hover:text-red-600 cursor-pointer transition ease-in-out duration-100">
              <MdDelete />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The note will be permanently
                deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>
                <button onClick={onDelete} className="  font-medium">
                  Delete
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default NoteCard;
