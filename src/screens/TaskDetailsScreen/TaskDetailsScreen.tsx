import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  ViewStyle,
  Text,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../../components/common/CustomText/CustomText';
import CustomTextInput from '../../components/common/CustomTextInput/CustomTextInput';
import ThemeColors from '../../styles/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainNavigator';
import { TaskType } from '../../types/task.type';
import { RootState } from '../../store/store';
import { createTask, updateTask } from '../../store/reducers/task.slice';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import PictureButton from '../../components/PictureButton/PictureButton';

type Props = NativeStackScreenProps<MainStackParamList, 'TaskDetails'>;

const EMPTY_TASK: TaskType = {
  title: '',
  description: '',
  isChecked: false,
};

const TaskDetailsScreen = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const task = useAppSelector((state: RootState) => state.tasks.selected);

  const { viewOnly } = route.params;

  const [updatedTask, setUpdatedTask] = useState(task || EMPTY_TASK);
  const [error, setError] = useState(false);

  const newTask = task === undefined;

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

  const createNewTask = () => {
    if (updatedTask.title === '') {
      setError(true);
      return;
    }

    dispatch(createTask(updatedTask));
    navigation.navigate('List');
  };

  useEffect(() => {
    dispatch(updateTask(updatedTask));
  }, [updatedTask]);

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
        <View>
          <Text>Image Container</Text>
        </View>
        {!viewOnly && (
          <View style={styles.buttonsWrapper}>
            {newTask ? (
              <>
                <PictureButton />
                <Pressable
                  style={[
                    styles.button,
                    styles.doneButton,
                    {
                      backgroundColor: ThemeColors.green,
                    },
                  ]}
                  onPress={createNewTask}
                >
                  <CustomText style={styles.buttonText}>
                    Create new task
                  </CustomText>
                </Pressable>
              </>
            ) : (
              <View>
                <PictureButton />
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
    justifyContent: 'center',
    height: 50,
  },
  imageButton: {
    backgroundColor: ThemeColors.pink,
    width: 50,
    marginBottom: 5,
  },
  doneButton: { marginBottom: 5 },
  buttonText: {
    color: 'white',
  },
});
