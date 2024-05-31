import React, { useRef, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import { useParams } from "react-router-dom";
import NothingImg from "../assets/nothingfound.webp";
import moment from "moment";

export default function Sidebar() {
  const { username } = useParams();
  const topicRef = useRef();
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    getAllTopics(username);
  }, [username]);

  function getAllTopics(username) {
    // Simulating data fetching
    const mockData = {
      "2024-05-31": [
        { id: 1, title: "Sample Topic 1" },
        { id: 2, title: "Sample Topic 2" },
      ],
    };
    setTopic(mockData);
  }

  function formatDate(date) {
    const today = moment().format("YYYY-MM-DD");
    const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

    if (date === today) {
      return "Today";
    } else if (date === yesterday) {
      return "Yesterday";
    } else {
      return date;
    }
  }

  const deleteSelectedTopic = (e, topic) => {
    e.preventDefault();
    const popup = window.confirm("Are you sure you want to delete this topic?");
    if (popup) {
      // Simulating deletion
      console.log("Deleting topic:", topic);
      // Update state after deletion
      getAllTopics(username);
    }
  };

  const updateSelectedTopic = (e, topic) => {
    e.preventDefault();
    const updatedTopic = "Updated Topic";
    console.log("Updating topic:", topic, "to", updatedTopic);
    // Simulating update
    getAllTopics(username);
  };

  const addNewTopic = (e) => {
    e.preventDefault();
    const topicValue = topicRef.current.value;
    console.log("Adding new topic:", topicValue);
    // Simulating addition
    getAllTopics(username);
  };

  return (
    <div className="relative flex flex-col-reverse items-center w-auto h-screen bg-primary text-white p-5 overflow-y-scroll overflow-x-hidden">
      <hr className="w-full py-2 opacity-20" />
      {Object.entries(topic).length !== 0 ? (
        <div
          className="m-5 px-4 w-full break-all hover:cursor-pointer overflow-y-auto "
          style={{ maxHeight: "700px" }}
        >
          {Object.entries(topic).map(([date, topicList]) => (
            <div key={date}>
              <div>{formatDate(date)}</div>
              {topicList.map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => {
                    console.log(
                      "Navigate to:",
                      `/ask-ai/${username}/u/topic/${topic.title}`
                    );
                  }}
                  className="flex flex-row content-center gap-2 justify-between text-primary my-5 p-4 bg-base-300 rounded-md hover:opacity-80"
                >
                  <div>{topic.title}</div>
                  <div className="flex pt-1 gap-4">
                    <LuPencil
                      onClick={(e) => updateSelectedTopic(e, topic.title)}
                    />
                    <MdDelete
                      onClick={(e) => deleteSelectedTopic(e, topic.title)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col text-primary   items-center gap-2 my-36 opacity-30">
          <img src={NothingImg} alt="Nothing Found" />
          <div>It seems clear for now ...</div>
          <div className="text-center">Try asking and chat!</div>
        </div>
      )}
    </div>
  );
}
