import AddNote from "@/components/AddNote/AddNote";
import EmptyCard from "@/components/EmprtyCard/EmptyCard";
import NoteCard from "@/components/NoteCard/NoteCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useAuthStore from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
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
  return response.data.notes;
};

const Home = () => {
  const { token } = useAuthStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data: notes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["notes", token],
    queryFn: () => fetchNotes(token),
    enabled: !!token,
  });

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return <p>Loading notes...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="mt-10 container px-4 mx-auto">
      {notes.length === 0 && <EmptyCard />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
        {notes?.length > 0 &&
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
          ))}
      </div>

      <div className="w-full">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10 rounded-md"
            >
              <MdAdd className="w-12 h-12 text-lg text-white extrabold" />
            </button>
          </DialogTrigger>
          <DialogContent className="w-11/12 sm:max-w-md rounded-md">
            <AddNote onClose={handleDialogClose} refetchNotes={refetch} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Home;
