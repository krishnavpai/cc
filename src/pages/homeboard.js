import Image from "next/image";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/outline";
import CardItem from "../components/CardItem";
import BoardData from "../data/board-data.json";
import BoardData1 from "../data/board-data1.json";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";

function createGuidId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function Home(props) {
  const [ready, setReady] = useState(true);
  const [boardData, setBoardData] = useState(BoardData);
  const [showForm, setShowForm] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(0);
  const [res, setRes] = useState(null);
  const email = "krishna.pai@spit.ac.in";
  useEffect(() => {
    // Define the function to make the API request
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://skb3iqmycg.execute-api.eu-north-1.amazonaws.com/testing/user",
          {
            params: { email: props.email },
          }
        );
      } catch (error) {
        if(props.email == email)
        setBoardData(BoardData1);
      }
    };

    // Call the function to fetch data
    fetchData();
  }, []);

  const onDragEnd = (re) => {
    if (!re.destination) return;
    let newBoardData = boardData;
    var dragItem =
      newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
    newBoardData[parseInt(re.source.droppableId)].items.splice(
      re.source.index,
      1
    );
    newBoardData[parseInt(re.destination.droppableId)].items.splice(
      re.destination.index,
      0,
      dragItem
    );
    setBoardData(newBoardData);
  };

  const onTextAreaKeyPress = (e) => {
    if (e.keyCode === 13) {
      //Enter
      const val = e.target.value;
      if (val.length === 0) {
        setShowForm(false);
      } else {
        const boardId = e.target.attributes["data-id"].value;
        const item = {
          id: createGuidId(),
          title: val,
          priority: 0,
          chat: 0,
          attachment: 0,
          assignees: [],
        };
        let newBoardData = boardData;
        newBoardData[boardId].items.push(item);
        setBoardData(newBoardData);
        setShowForm(false);
        e.target.value = "";
      }
    }
  };

  return (
    <div className="min-w-full min-h-screen  h-screen overflow-hidden bg-blue-100">
       <p>{res}</p>
      <TopBar name={props.name} email={props.email} />
      <SideBar />
     
      <main className="pl-40 pt-16">
        <div className="p-10 flex flex-col h-screen">
          {/* Board header */}
          <div className="flex flex-initial justify-between">
            <div className="flex items-center">
              {/* <h4 className="text-4xl font-bold text-gray-600">Studio Board</h4> */}
              {/* <ChevronDownIcon
              className="w-9 h-9 text-gray-500 rounded-full
            p-1 bg-white ml-5 shadow-xl"
            /> */}
            </div>

            {/* <ul className="flex space-x-3">
            <li>
              <Image
                src="https://randomuser.me/api/portraits/men/75.jpg"
                width="36"
                height="36"
                objectFit="cover"
                className=" rounded-full "
              />
            </li>
            <li>
              <Image
                src="https://randomuser.me/api/portraits/men/76.jpg"
                width="36"
                height="36"
                objectFit="cover"
                className=" rounded-full "
              />
            </li>
            <li>
              <Image
                src="https://randomuser.me/api/portraits/men/78.jpg"
                width="36"
                height="36"
                objectFit="cover"
                className=" rounded-full "
              />
            </li>
            <li>
              <button
                className="border border-dashed flex items-center w-9 h-9 border-gray-500 justify-center
                rounded-full"
              >
                <PlusIcon className="w-5 h-5 text-gray-500" />
              </button>
            </li>
          </ul> */}
          </div>

          {/* Board columns */}
          {ready && (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="grid grid-cols-4 gap-5 my-5">
                {boardData.map((board, bIndex) => {
                  return (
                    <div key={board.name}>
                      <Droppable droppableId={bIndex.toString()}>
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            <div
                              className={`bg-gray-100 rounded-md shadow-md
                            flex flex-col relative overflow-hidden
                            ${snapshot.isDraggingOver && "bg-green-100"}`}
                            >
                              <span
                                className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200
                          absolute inset-x-0 top-0"
                              ></span>
                              <h4 className=" p-3 flex justify-between items-center mb-2">
                                <span className="text-2xl text-gray-600">
                                  {board.name}
                                </span>
                                <HiDotsVertical className="w-5 h-5 text-gray-500" />
                              </h4>

                              <div
                                className="overflow-y-auto overflow-x-hidden h-auto"
                                style={{ maxHeight: "calc(100vh - 290px)" }}
                              >
                                {board.items.length > 0 &&
                                  board.items.map((item, iIndex) => {
                                    return (
                                      <CardItem
                                        key={item.id}
                                        data={item}
                                        index={iIndex}
                                        className="m-3"
                                      />
                                    );
                                  })}
                                {provided.placeholder}
                              </div>

                              {showForm && selectedBoard === bIndex ? (
                                <div className="p-3">
                                  <textarea
                                    className="border-gray-300 rounded focus:ring-purple-400 w-full"
                                    rows={3}
                                    placeholder="Task info"
                                    data-id={bIndex}
                                    onKeyDown={(e) => onTextAreaKeyPress(e)}
                                  />
                                </div>
                              ) : (
                                <button
                                  className="flex justify-center items-center my-3 space-x-2 text-lg"
                                  onClick={() => {
                                    setSelectedBoard(bIndex);
                                    setShowForm(true);
                                  }}
                                >
                                  <span>Add task</span>
                                  <PlusCircleIcon className="w-5 h-5 text-gray-500" />
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </Droppable>
                    </div>
                  );
                })}
              </div>
            </DragDropContext>
          )}
        </div>
      </main>
    </div>
  );
}
