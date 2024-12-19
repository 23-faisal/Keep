import AddNote from "@/components/AddNote/AddNote";
import NoteCard from "@/components/NoteCard/NoteCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useAuthStore from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MdAdd } from "react-icons/md";

const fetchNotes = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/notes/all-notes`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in Authorization header
      },
    }
  );
  return response.data.notes; // Assuming `notes` is the array returned
};

const Home = () => {
  const { token } = useAuthStore();

  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notes", token], // Unique key for caching
    queryFn: () => fetchNotes(token), // Fetch function
    enabled: !!token, // Only fetch if token is available
  });

  if (isLoading) {
    return <p>Loading notes...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="mt-10 container px-4 mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
        {notes?.length > 0 ? (
          notes.map((note) => (
            <NoteCard
              key={note._id}
              title={note.title}
              date={note.date}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => {}}
              onPinNote={() => {}}
            />
          ))
        ) : (
          <p>No notes available.</p>
        )}
      </div>

      <div className="w-full">
        <Dialog className="mx-4">
          <DialogTrigger asChild>
            <button className="bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10 rounded-md">
              <MdAdd className="w-12 h-12 text-lg text-white extrabold" />
            </button>
          </DialogTrigger>
          <DialogContent className="w-11/12 sm:max-w-md rounded-md">
            <AddNote />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;
