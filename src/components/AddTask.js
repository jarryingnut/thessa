import React, { useState } from 'react';
import { FaRegListAlt, FaRegCalendarAlt } from 'react-icons/fa';
import moment from 'moment';
import { firebase } from '../firebase';
import { ProjectOverlay } from './ProjectOverlay';
import { TaskDate } from './TaskDate';
import { useSelectedProjectValue, useProjectsValue, useAuth} from '../context';


    export const AddTask = ({
      showAddTaskMain = true,
      shouldShowMain = false,
      showQuickAddTask,
      setShowQuickAddTask,
    }) => {
      const [task, setTask] = useState('');
      const [taskDate, setTaskDate] = useState('');
      const [project, setProject] = useState('');
      const [showMain, setShowMain] = useState(shouldShowMain);
      const [showOverlay, setShowOverlay] = useState(false);
      const [showTaskDate, setShowTaskDate] = useState(false);

      const { projects } = useProjectsValue();
      const { selectedProject } = useSelectedProjectValue();
      const { currentUser } = useAuth();

      const addTask = () => {
        const projectId = project || selectedProject;
        let collatedDate = '';

        if (projectId === 'TODAY') {
          collatedDate = moment().format('DD/MM/YYYY');
        } else if (projectId === 'NEXT_7') {
          collatedDate = moment()
            .add(7, 'days')
            .format('DD/MM/YYYY');
        }

        return (
          task &&
          projectId &&
          firebase
            .firestore()
            .collection('tasks')
            .add({
              archived: false,
              projectId,
              task,
              date: collatedDate || taskDate,
              userId: currentUser.uid,
            })
            .then(() => {
              setTask('');
              setProject('');
              setShowMain('');
              setShowOverlay(false);
              showQuickAddTask && setShowQuickAddTask && setShowQuickAddTask(false); //new
              })
            );
        };

  return (
    <div
      className={showQuickAddTask ? 'add-task add-task__overlay' : 'add-task'}
      data-testid="add-task"
    >
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          onClick={() => setShowMain(!showMain)}
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main">
          {showQuickAddTask && (
            <>
              <h2 className="header">Quick Add Task</h2>
              <span
                className="add-task__cancel-x"
                onClick={() => {
                  setShowMain(false);
                  setShowOverlay(false);
                  setShowQuickAddTask(false);
                }}
              >
                X
              </span>
            </>
          )}
          <ProjectOverlay
          projects={projects}
            setProject={setProject}
            showOverlay={showOverlay}
            setShowOverlay={setShowOverlay}
          /> 
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className="add-task__content"
            type="text"
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <button
            type="button"
            className="add-task__submit"
            onClick={() => addTask()}
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              onClick={() => {
                setShowMain(false);
                setShowOverlay(false);
              }}
            >
              Cancel
            </span>
          )}
          <span
            className="add-task__project"
            onClick={() => setShowOverlay(!showOverlay)}
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            onClick={() => setShowTaskDate(!showTaskDate)}
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};