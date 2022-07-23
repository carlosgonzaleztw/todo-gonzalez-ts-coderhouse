import {
  StyleSheet,
  View,
  Pressable,
  ScrollView,
  ViewStyle,
  Text,
  Image,
} from 'react-native';
import React, { Fragment, useEffect, useState } from 'react';
import CustomText from '../../components/common/CustomText/CustomText';
import CustomTextInput from '../../components/common/CustomTextInput/CustomTextInput';
import ThemeColors from '../../styles/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../../navigation/MainNavigator';
import { TaskType } from '../../types/task.type';
import { RootState } from '../../store/store';
import { createTask, updateTask } from '../../store/reducers/task.slice';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import ImageButton from '../../components/ImageButton/ImageButton';
import { getCurrentAddress } from '../../utils/maps.utils';
import { persistTask, updateDbTask } from '../../db/db.index';

type Props = NativeStackScreenProps<MainStackParamList, 'TaskDetails'>;

const EMPTY_TASK: TaskType = {
  title: '',
  description: '',
  isChecked: false,
  createdAt: undefined,
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

  const setAddress = async () => {
    const address = await getCurrentAddress();
    setUpdatedTask({ ...task, location: address });
  };

  useEffect(() => {
    if (newTask) setAddress();
  }, []);

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

  const createNewTask = async () => {
    if (task.title === '') {
      setError(true);
      return;
    }

    try {
      const currentDate = new Date().toDateString();
      const dbResponse = await persistTask({
        ...task,
        createdAt: currentDate,
      });

      dispatch(
        createTask({
          ...task,
          // @ts-ignore
          id: parseInt(dbResponse.insertId),
          createdAt: currentDate,
        })
      );
    } catch (error) {
      console.log(error);
    }

    navigation.navigate('List');
  };

  const persistUpdatedTask = async () => {
    try {
      const dbResponse = await updateDbTask(task);

      // @ts-ignore
      dispatch(updateTask({ ...task, id: parseInt(dbResponse.insertId) }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    persistUpdatedTask();
  }, [task]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.inputsWrapper}>
          <View style={styles.metadataContainer}>
            {task.createdAt && (
              <Text style={styles.metadata}>
                {`📅 Created on: ${task.createdAt}`}
              </Text>
            )}
            {task.location && (
              <Text style={styles.metadata}>{`📍 ${task.location}`}</Text>
            )}
          </View>
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
              style={{
                height: 300,
                width: '100%',
                opacity: task.isChecked ? 0.5 : 1,
              }}
            />
          )}
        </View>
        <View style={styles.buttonsWrapper}>
          {!viewOnly && (
            <Fragment>
              {newTask ? (
                <Fragment>
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
                  <ImageButton
                    onImage={handleImageChange}
                    disabled={task.isChecked}
                  />
                </Fragment>
              ) : (
                <Fragment>
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
                  <ImageButton
                    onImage={handleImageChange}
                    disabled={task.isChecked}
                  />
                </Fragment>
              )}
            </Fragment>
          )}
        </View>
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
  metadataContainer: {
    width: '70%',
    marginBottom: 10,
  },
  metadata: {
    color: ThemeColors.disabledText,
    fontSize: 12,
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
    flexDirection: 'row',
  },
  button: {
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  doneButton: {
    marginBottom: 5,
    flexGrow: 1,
    marginEnd: 5,
  },
  locationButton: {
    marginRight: 2,
  },
  buttonText: {
    color: 'white',
  },
});
