import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {
  RiAddCircleFill,
  RiCheckDoubleFill,
  RiCloseFill,
  RiEditLine,
} from "react-icons/ri";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Loader from "./Loader";
function TodoList(props) {
  const [allTask, setAllTask] = useState();
  const [toggler, setToggler] = useState(false);
  const [todo, setTodo] = useState();
  const [status, setStatus] = useState();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    axios
      .post("http://127.0.0.1:3001/allList", { user: props.user })
      .then((res) => {
        setTimeout(() => {
          updateTasks(res.data);
          console.log("Delayed for 1 second.");
        }, "4000")
        setAllTask(res.data);
        
        console.log(allTask);
      });
      return ()=>{
        console.log("unmount work");
      }
  }, [toggler]);

  const [tasks, updateTasks] = useState(allTask);

  const activeHandler = () => {
    updateTasks(allTask.filter((data) => data.isCompleted === false));
  };
  const completedHandler = () => {
    updateTasks(allTask.filter((data) => data.isCompleted !== false));
  };
  const allHandler = () => {
    updateTasks(allTask);
  };

  const handleOnDragEnd = (result, e) => {
    console.log(result);
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(tasks);
    updateTasks(items);
    console.log(tasks);
  };
  const statusHandler = (l_id) => {
    console.log(l_id);

    axios
      .post("http://127.0.0.1:3001/completed", {
        id: l_id,
      })
      .then((res) => {
        console.log(res.data);
        setToggler(!toggler);
      });
  };
  const editHandler = () => {};
  const deleteHandler = (l_id) => {
    axios
      .post("http://127.0.0.1:3001/delete", {
        id: l_id,
      })
      .then((res) => {
        console.log(res.data);
        setToggler(!toggler);
      });
  };
  const clickHandler = () => {
    console.log(todo);
    axios
      .post("http://127.0.0.1:3001/list", {
        // commentId:commentId,
        user: props.user,
        text: todo||transcript,
        isCompleted: false,
      })
      .then((res) => {
        console.log(res.data);
        document.getElementById("inputToDo").value=""
        document.getElementById("inputToDo").placeholder="Speak or Write"
        setToggler(!toggler);
      });
  };
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
    <DivBody>
      <div className="inputDiv">
        
          
          {/* <p>{transcript}</p> */}
          <input id="inputToDo"
            onChange={(e) => {
              setTodo(e.target.value||transcript);
            }}
            type="text"
            placeholder={transcript||"speak or write"}
          />
          <button
            className="add--button"
            onClick={() => {
              clickHandler();
            }}
          >
            +
          </button>
        </div>
        <div>
        <p>Microphone: {listening ? "on" : "off"}</p>
          <button onClick={SpeechRecognition.startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
        <div>
          <button
            onClick={() => {
              activeHandler();
            }}
          >
            Active
          </button>
          <button
            onClick={() => {
              completedHandler();
            }}
          >
            Completed
          </button>
          <button
            onClick={() => {
              allHandler();
            }}
          >
            All
          </button>
        </div>
      </div>
      <DragDropContext
        onDragEnd={(e) => {
          handleOnDragEnd(e);
        }}
      >
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              className="tasks"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks?.map((data, index) => {
                console.log(index);
                return (
                  <Draggable
                    key={data._id}
                    draggableId={data._id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <p>{data.text}</p>
                        {data.isCompleted ? (
                          <span class="badge badge--line">done</span>
                        ) : (
                          <></>
                        )}
                        <div>
                          <span>
                            <RiEditLine
                              style={{ color: "black" }}
                              size={20}
                            ></RiEditLine>
                          </span>
                          {!data.isCompleted ? (
                            <span
                              onClick={() => {
                                statusHandler(data._id);
                              }}
                            >
                              <RiCheckDoubleFill
                                style={{ color: "green" }}
                                size={22}
                              ></RiCheckDoubleFill>
                            </span>
                          ) : (
                            <></>
                          )}
                          <span
                            onClick={() => {
                              deleteHandler(data._id);
                            }}
                          >
                            <RiCloseFill
                              style={{ color: "red" }}
                              size={22}
                            ></RiCloseFill>
                          </span>
                        </div>
                      </li>
                    )}
                  </Draggable>
                );
              })||<Loader></Loader>}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
     
      <button onClick={()=>window.location.reload()}>Log Out</button>
    </DivBody>
    </SkeletonTheme>
  );
}

export default TodoList;

const DivBody = styled.div`
  background-color: slateblue;
`;
