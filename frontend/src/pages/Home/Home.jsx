import AddNote from "@/components/AddNote/AddNote";
import EmptyCard from "@/components/EmprtyCard/EmptyCard";
import NoteCard from "@/components/NoteCard/NoteCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useAuthStore from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const fetchNotes = async (token) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/notes/all-notes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.notes;
};

const Home = () => {
  const { token } = useAuthStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [tags, setTags] = useState([]);

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

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setNoteToEdit(null);
    setTags([]);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onEditSubmit = async (data) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/notes/edit-note/${noteToEdit._id}`,
        {
          title: data.title,
          content: data.content,
          tags: tags,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Note updated successfully");
      refetch();
      handleEditDialogClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update the note");
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/notes/delete-note/${noteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Note deleted successfully");
      refetch();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete the note");
    }
  };

  const handleAddTag = (tag) => {
    if (tag && !tags.includes(tag)) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const togglePinNote = async (noteId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/notes/update-note-pinned/${noteId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Note pin state updated");
      refetch();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update pin state"
      );
    }
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
              date={note.createdAt}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => {
                setNoteToEdit(note);
                setEditDialogOpen(true);
                setTags(note.tags || []);
                reset({
                  title: note.title,
                  content: note.content,
                });
              }}
              onPinNote={() => togglePinNote(note._id)}
              onDelete={() => deleteNote(note._id)}
            />
          ))}
      </div>

      {/* Add Note Dialog */}
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

      {/* Edit Note Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="w-11/12 sm:max-w-md rounded-md">
          {noteToEdit && (
            <div>
              <h2 className="text-lg font-bold mb-4">Edit Note</h2>
              <form onSubmit={handleSubmit(onEditSubmit)}>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    {...register("title", { required: "Title is required" })}
                    className="w-full border rounded px-2 py-1"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Content</label>
                  <textarea
                    {...register("content", {
                      required: "Content is required",
                    })}
                    className="w-full border rounded px-2 py-1"
                  />
                  {errors.content && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.content.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Tags</label>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      id="newTag"
                      className="border rounded px-2 py-1 flex-grow"
                      placeholder="Add a tag"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        handleAddTag(document.getElementById("newTag").value)
                      }
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.length > 0 ? (
                      tags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-gray-200 text-sm px-2 py-1 rounded flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-red-500 font-bold"
                          >
                            &times;
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No tags available</p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
