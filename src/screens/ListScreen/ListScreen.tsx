import { Pressable, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import TasksList from '../../components/TasksList/TasksList';
import Header from '../../components/common/Header/Header';
import CustomText from '../../components/common/CustomText/CustomText';
import ThemeColors from '../../styles/colors';
import { TaskType } from '../../types/task.type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainNavigator';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import {
  deleteTask,
  selectTask,
  unselectTasks,
  updateTask,
} from '../../store/reducers/task.slice';

type Props = NativeStackScreenProps<MainStackParamList, 'List'>;

const ListScreen = async ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  // const user = useContext(AuthContext);
  // console.log('user in ListScreen', user?.uid);

  // try {
  //   // const dbTasks = await getAllDbTasks(user as User);
  //   // console.log('dbTasks', dbTasks);
  //   // dispatch(loadTasks(dbTasks));
  // } catch (error) {
  //   console.log('error in ListScreen', error);
  // }

  const TASK_LIST = useAppSelector((state) => state.tasks.list);

  const [tasks, setTasks] = useState<TaskType[]>(TASK_LIST);

  useEffect(() => setTasks(TASK_LIST), [TASK_LIST]);

  const handleTaskCheckChange = async (task: TaskType) => {
    const updatedTask = { ...task, isChecked: !task.isChecked };
    try {
      // await updateDbTask(updatedTask);

      // @ts-ignore
      dispatch(updateTask(updatedTask));
    } catch (error) {
      console.log(error);
    }
  };

  const handleTaskDelete = async (id: number) => {
    try {
      // await deleteDbTask(id);
      dispatch(deleteTask(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnAddTask = () => {
    dispatch(unselectTasks());
    navigation.navigate('TaskDetails', {
      viewOnly: false,
    });
  };

  const handleViewDetails = (taskId: number) => {
    dispatch(selectTask(taskId));
    navigation.navigate('TaskDetails', {
      viewOnly: false,
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
        onTaskCheckChange={(task) => handleTaskCheckChange(task)}
        onTaskDelete={(task) => handleTaskDelete(task.id!)}
        onViewDetails={(task) => handleViewDetails(task.id!)}
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
