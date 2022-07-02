import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import CustomText from '../../components/common/CustomText/CustomText';
import CustomTextInput from '../../components/common/CustomTextInput/CustomTextInput';
import ThemeColors from '../../styles/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainNavigator';
import { useSelector } from 'react-redux';
import { TaskType } from '../../types/task.type';

type Props = NativeStackScreenProps<MainStackParamList, 'TaskDetails'>;

const EMPTY_TASK: TaskType = {
  id: Math.random(),
  title: '',
  description: '',
  isChecked: false,
};

const TaskDetailsScreen = ({ navigation, route }: Props) => {
  const task = useSelector((state) => state.tasks.selectedTask);

  const { viewOnly } = route.params;

  const [updatedTask, setUpdatedTask] = useState(task || EMPTY_TASK);
  const [error, setError] = useState(false);

  const newTask = task === null;

  const handleTitleChange = (title: string) => {
    if (title !== '') {
      setError(false);
    }

    setUpdatedTask({ ...updatedTask, title: title });
  };
  const handleDescriptionChange = (description: string) => {
    setUpdatedTask({ ...updatedTask, description: description });
  };

  const handleCheckDone = () => {
    setUpdatedTask({ ...updatedTask, isChecked: !updatedTask.isChecked });
  };

  const handleCreateOrUpdateTask = () => {
    if (updatedTask.title === '') {
      setError(true);
      return;
    }

    navigation.navigate('List', { updatedTask: updatedTask });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputsWrapper}>
          {error && (
            <CustomText style={styles.errorLabel}>Title is required</CustomText>
          )}
          <CustomTextInput
            value={updatedTask.title}
            multiline
            style={
              [styles.titleInput, error ? styles.inputError : ''] as ViewStyle
            }
            onChangeText={handleTitleChange}
            placeholder="Title"
            editable={!updatedTask.isChecked && !viewOnly}
            selectTextOnFocus={!updatedTask.isChecked}
          />
          <CustomTextInput
            value={updatedTask.description}
            multiline
            style={styles.descriptionInput}
            onChangeText={handleDescriptionChange}
            placeholder="Description"
            editable={!updatedTask.isChecked && !viewOnly}
            selectTextOnFocus={!updatedTask.isChecked}
          />
        </View>
        {!viewOnly && (
          <View style={styles.buttonsWrapper}>
            {newTask ? (
              <Pressable
                style={[
                  styles.button,
                  styles.doneButton,
                  {
                    backgroundColor: ThemeColors.green,
                  },
                ]}
                onPress={handleCreateOrUpdateTask}
              >
                <CustomText style={styles.buttonText}>
                  Create new task
                </CustomText>
              </Pressable>
            ) : (
              <View>
                <Pressable
                  style={[
                    styles.button,
                    styles.doneButton,
                    {
                      backgroundColor: updatedTask.isChecked
                        ? ThemeColors.orange
                        : ThemeColors.green,
                    },
                  ]}
                  onPress={handleCheckDone}
                >
                  <CustomText style={styles.buttonText}>
                    {updatedTask.isChecked
                      ? 'Mark as in progress'
                      : 'Mark as done'}
                  </CustomText>
                </Pressable>

                <Pressable
                  style={[
                    styles.button,
                    styles.doneButton,
                    {
                      backgroundColor: ThemeColors.green,
                    },
                  ]}
                  onPress={handleCreateOrUpdateTask}
                >
                  <CustomText style={styles.buttonText}>Update task</CustomText>
                </Pressable>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 20,
    width: '100%',
  },
  inputsWrapper: {
    width: '100%',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 5,
  },
  errorLabel: {
    color: 'red',
    fontSize: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 20,
  },
  titleInput: {
    fontSize: 20,
    marginBottom: 10,
    padding: 10,
    backgroundColor: ThemeColors.inputBackgroundColor,
    width: '100%',
  },
  descriptionInput: {
    fontSize: 16,
    backgroundColor: ThemeColors.inputBackgroundColor,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  buttonsWrapper: {
    width: '100%',
    bottom: 0,
  },
  button: {
    borderRadius: 100,
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%',
  },
  doneButton: { marginBottom: 5 },
  backButton: {
    backgroundColor: ThemeColors.pink,
  },
  buttonText: {
    color: 'white',
  },
});
