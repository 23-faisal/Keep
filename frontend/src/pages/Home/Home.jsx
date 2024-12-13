import NoteCard from "@/components/NoteCard/NoteCard";
import { Button } from "@/components/ui/button";
import { MdAdd } from "react-icons/md";

const Home = () => {
  return (
    <div className="mt-10 container px-4 mx-auto   ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center  ">
        <NoteCard
          title="Meeting on 7th april"
          date="3rd April 2024"
          content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed,
        consequatur delectus. Molestias inventore natus, tenetur magnam culpa
        sed odit consectetur voluptatem dolores, perspiciatis rem eligendi?
        Soluta officiis autem natus sequi?"
          tags="meeting"
          isPinned={true}
          onEdit={() => {}}
          onPinNote={() => {}}
        />
        <NoteCard
          title="Meeting on 7th april"
          date="3rd April 2024"
          content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed,
      consequatur delectus. Molestias inventore natus, tenetur magnam culpa
      sed odit consectetur voluptatem dolores, perspiciatis rem eligendi?
      Soluta officiis autem natus sequi?"
          tags="meeting"
          isPinned={true}
          onEdit={() => {}}
          onPinNote={() => {}}
        />
        <NoteCard
          title="Meeting on 7th april"
          date="3rd April 2024"
          content="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed,
    consequatur delectus. Molestias inventore natus, tenetur magnam culpa
    sed odit consectetur voluptatem dolores, perspiciatis rem eligendi?
    Soluta officiis autem natus sequi?"
          tags="meeting"
          isPinned={true}
          onEdit={() => {}}
          onPinNote={() => {}}
        />
      </div>
      <button className="bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10 rounded-md ">
        <MdAdd className="w-12 h-12 text-lg text-white  extrabold " />
      </button>
    </div>
  );
};

export default Home;
