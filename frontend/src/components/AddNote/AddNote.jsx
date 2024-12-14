import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { FaPlus } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

const AddNote = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [tags, setTags] = useState([]);

  const onSubmit = (data) => {
    console.log("Form Data:", { ...data, tags });
    reset();
    setTags([]);
  };

  const addTag = () => {
    const tagValue = document.getElementById("tagInput").value.trim();
    if (!tagValue) {
      alert("Tag cannot be empty");
      return;
    }
    if (tags.includes(`#${tagValue}`)) {
      alert("Tag already exists");
      return;
    }
    setTags([...tags, `#${tagValue}`]);
    setValue("tagInput", ""); // Clear the input field
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Add a New Note</DialogTitle>
        <DialogDescription>Click save when you&apos;re done.</DialogDescription>
      </DialogHeader>
      <form
        className="mt-10 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title Field */}
        <div className="flex flex-col gap-2">
          <Label className="font-semibold text-md uppercase" htmlFor="title">
            Title
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Content Field */}
        <div className="flex flex-col gap-2">
          <Label className="font-semibold text-md" htmlFor="content">
            Content
          </Label>
          <Textarea className='h-32'
            id="content"
            placeholder="Enter content"
            {...register("content", { required: "Content is required" })}
          ></Textarea>
          {errors.content && (
            <span className="text-red-500 text-sm">
              {errors.content.message}
            </span>
          )}
        </div>

        {/* Tags Field */}
        <div className="flex flex-col gap-2">
          <Label className="font-semibold text-md" htmlFor="tags">
            Tags
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="tagInput"
              className="w-32"
              placeholder="Add tag"
              {...register("tagInput")}
            />
            <FaPlus
              className="w-6 h-6 font-bold text-teal-500 cursor-pointer"
              onClick={addTag}
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-300 text-primary px-2 py-1 rounded"
              >
                <span>{tag}</span>
                <button
                  type="button"
                  className="ml-2 text-red-500 font-bold cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  <ImCross />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            className="w-full bg-blue-500 font-semibold text-md text-white p-2 rounded hover:bg-blue-600"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
