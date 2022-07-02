import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../../components/common/CustomTextInput/CustomTextInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeColors from '../../styles/colors';
import TasksList from '../../components/TasksList/TasksList';
import { TaskType } from '../../types/task.type';
import { SearchStackParamList } from '../../navigation/SearchNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { selectTask } from '../../store/actions/task.action';

type Props = NativeStackScreenProps<SearchStackParamList, 'Search'>;

const SearchScreen = ({ navigation, route }: Props) => {
  const dispatch = useDispatch();
  const TASK_LIST = useSelector((state) => state.tasks.taskList);

  const [tasks, setTasks] = useState<TaskType[]>(TASK_LIST);

  const handleSearchTasks = (text: string) => {
    if (text === '') {
      setTasks(TASK_LIST);
    } else {
      const filteredTask = TASK_LIST.filter((task: TaskType) => {
        return task.title.toLowerCase().search(text.toLowerCase()) !== -1;
      });

      setTasks(filteredTask);
    }
  };

  const handleViewDetails = (task: TaskType) => {
    dispatch(selectTask(task.id));
    navigation.navigate('TaskDetails', {
      viewOnly: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomTextInput
        placeholder="Search tasks"
        style={styles.input}
        onChangeText={(text: string) => handleSearchTasks(text)}
      />
      <TasksList
        tasks={tasks}
        onTaskCheckChange={() => {}}
        onTaskDelete={() => {}}
        onViewDetails={(task) => handleViewDetails(task)}
        viewOnly
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    fontSize: 20,
    marginBottom: 10,
    padding: 10,
    backgroundColor: ThemeColors.inputBackgroundColor,
    width: '100%',
    borderColor: ThemeColors.inputTextColor,
    borderWidth: 2,
    borderRadius: 10,
  },
});
