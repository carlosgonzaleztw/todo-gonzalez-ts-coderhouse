import { Pressable, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import TasksList from '../../components/TasksList/TasksList';
import Header from '../../components/common/Header/Header';
import CustomText from '../../components/common/CustomText/CustomText';
import ThemeColors from '../../styles/colors';
import { TaskType } from '../../types/task.type';

const ListScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  let updatedTask: TaskType;
  route?.params ? (updatedTask = route.params.updatedTask) : '';

  const addTaskToList = (currentTask: TaskType) => {
    const isNewTask = !tasks.some((task) => {
      return task.id === currentTask.id;
    });

    if (isNewTask) {
      setTasks([...tasks, currentTask]);
    } else {
      const updatedTasks = tasks.map((task) => {
        if (task.id === currentTask.id) {
          return currentTask;
        } else {
          return task;
        }
      });

      setTasks(updatedTasks);
    }
  };

  useEffect(() => {
    console.log('RUNNING USE EFFECT');
    if (updatedTask !== undefined) {
      addTaskToList(updatedTask);
    }
  }, [updatedTask]);

  const handleTaskCheckChange = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.isChecked = !task.isChecked;
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const handleTaskDelete = (id: number) => {
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(updatedTasks);
  };

  const handleOnAddTask = () => {
    const emptyTask: TaskType = {
      id: Math.random(),
      title: '',
      description: '',
      isChecked: false,
    };
    navigation.navigate('TaskDetails', {
      task: emptyTask,
    });
  };

  const handleViewDetails = (task: TaskType) => {
    navigation.navigate('TaskDetails', {
      task: task,
    });
  };

  return (
    <View style={styles.container}>
      <Header title={'Todos!'} />
      <View style={styles.inputWrapper}>
        <Pressable style={styles.button} onPress={handleOnAddTask}>
          <CustomText style={styles.buttonText}>Create a new task</CustomText>
        </Pressable>
      </View>
      <TasksList
        tasks={tasks}
        onTaskCheckChange={(task) => handleTaskCheckChange(task.id)}
        onTaskDelete={(task) => handleTaskDelete(task.id)}
        onViewDetails={(task) => handleViewDetails(task)}
      ></TasksList>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 10,
    width: '100%',
  },
  button: {
    backgroundColor: ThemeColors.green,
    borderRadius: 100,
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 20,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
  },
});
