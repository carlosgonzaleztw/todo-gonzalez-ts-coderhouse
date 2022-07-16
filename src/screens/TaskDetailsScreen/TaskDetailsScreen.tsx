import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  ViewStyle,
  Text,
  Image,
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
import ImageButton from '../../components/PictureButton/PictureButton';

type Props = NativeStackScreenProps<MainStackParamList, 'TaskDetails'>;

const EMPTY_TASK: TaskType = {
  title: '',
  description: '',
  isChecked: false,
};

const TaskDetailsScreen = ({ navigation, route }: Props) => {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector(
    (state: RootState) => state.tasks.selected
  );

  const { viewOnly } = route.params;

  const [task, setUpdatedTask] = useState(selectedTask || EMPTY_TASK);
  const [error, setError] = useState(false);

  const newTask = selectedTask === undefined;

  const handleTitleChange = (title: string) => {
    if (title !== '') setError(false);

    setUpdatedTask({ ...task, title: title });
  };
  const handleDescriptionChange = (description: string) => {
    setUpdatedTask({ ...task, description: description });
  };

  const handleCheckDone = () => {
    setUpdatedTask({ ...task, isChecked: !task.isChecked });
  };

  const handleImageChange = (url: string) => {
    setUpdatedTask({ ...task, image: url });
  };

  const createNewTask = () => {
    if (task.title === '') {
      setError(true);
      return;
    }

    dispatch(createTask(task));
    navigation.navigate('List');
  };

  useEffect(() => {
    dispatch(updateTask(task));
  }, [task]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputsWrapper}>
          {error && (
            <CustomText style={styles.errorLabel}>Title is required</CustomText>
          )}
          <CustomTextInput
            value={task.title}
            multiline
            style={
              [styles.titleInput, error ? styles.inputError : ''] as ViewStyle
            }
            onChangeText={handleTitleChange}
            placeholder="Title"
            editable={!task.isChecked && !viewOnly}
            selectTextOnFocus={!task.isChecked}
          />
          <CustomTextInput
            value={task.description}
            multiline
            style={styles.descriptionInput}
            onChangeText={handleDescriptionChange}
            placeholder="Description"
            editable={!task.isChecked && !viewOnly}
            selectTextOnFocus={!task.isChecked}
          />
          {task?.image && (
            <Image
              source={{ uri: task.image }}
              style={{ height: 200, width: '100%' }}
            />
          )}
        </View>
        {!viewOnly && (
          <View style={styles.buttonsWrapper}>
            {newTask ? (
              <>
                <ImageButton onImage={handleImageChange} />
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
                <ImageButton onImage={handleImageChange} />
                <Pressable
                  style={[
                    styles.button,
                    styles.doneButton,
                    {
                      backgroundColor: task.isChecked
                        ? ThemeColors.orange
                        : ThemeColors.green,
                    },
                  ]}
                  onPress={handleCheckDone}
                >
                  <CustomText style={styles.buttonText}>
                    {task.isChecked ? 'Mark as in progress' : 'Mark as done'}
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
