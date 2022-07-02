import { StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomTextInput from '../../components/common/CustomTextInput/CustomTextInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeColors from '../../styles/colors';
import TasksList from '../../components/TasksList/TasksList';
import { TaskType } from '../../types/task.type';
import { SearchStackParamList } from '../../navigation/SearchNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { selectTask } from '../../store/reducers/task.slice';

type Props = NativeStackScreenProps<SearchStackParamList, 'Search'>;

const SearchScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const TASK_LIST = useAppSelector((state) => state.tasks.list);

  const [tasks, setTasks] = useState<TaskType[]>(TASK_LIST);

  useEffect(() => setTasks(TASK_LIST), [TASK_LIST]);

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

  const handleViewDetails = (id: number) => {
    dispatch(selectTask(id));
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
        onViewDetails={(task) => handleViewDetails(task.id!)}
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
