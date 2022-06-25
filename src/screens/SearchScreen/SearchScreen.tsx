import { StyleSheet, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import CustomTextInput from '../../components/common/CustomTextInput/CustomTextInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemeColors from '../../styles/colors';
import TasksList from '../../components/TasksList/TasksList';
import { generateTasks } from '../../data/fixture';
import { TaskType } from '../../types/task.type';
import { SearchStackParamList } from '../../navigation/SearchNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const demoTasks = generateTasks(Math.floor(Math.random() * 20) + 1);
type Props = NativeStackScreenProps<SearchStackParamList, 'Search'>;

const SearchScreen = ({ navigation, route }: Props) => {
  const [tasks, setTasks] = useState<TaskType[]>(demoTasks);

  const handleSearchTasks = (text: string) => {
    if (text === '') {
      setTasks(demoTasks);
    } else {
      const filteredTask = demoTasks.filter((task) => {
        return task.title.search(text) !== -1;
      });

      setTasks(filteredTask);
    }
  };

  const handleViewDetails = (task: TaskType) => {
    navigation.navigate('TaskDetails', {
      task: task,
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
