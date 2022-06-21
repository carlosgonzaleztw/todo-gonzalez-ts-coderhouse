import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import CheckBox from 'expo-checkbox';
import CustomText from '../CustomText/CustomText';
import ThemeColors from '../../../styles/colors';
import { TaskType } from '../../../types/task.type';

type Props = {
  task: TaskType;
  onDelete: (task: TaskType) => void;
  onCheckChange: (task: TaskType) => void;
  onViewDetails: (task: TaskType) => void;
};

const Task = ({ onDelete, onCheckChange, task, onViewDetails }: Props) => {
  return (
    <View style={styles.root}>
      <CheckBox
        value={task.isChecked}
        onValueChange={() => onCheckChange(task)}
      ></CheckBox>
      <Pressable style={styles.textWrapper} onPress={() => onViewDetails(task)}>
        <CustomText
          style={[task.isChecked ? styles.disabled : '', styles.title]}
        >
          {task.title}
        </CustomText>
        <CustomText style={styles.description}>
          Press to see the details
        </CustomText>
      </Pressable>
      <Pressable
        style={[
          styles.button,
          task.isChecked
            ? { backgroundColor: ThemeColors.disabledText }
            : { backgroundColor: ThemeColors.primary },
        ]}
        onPress={() => onDelete(task)}
      >
        <CustomText style={styles.buttonText}>X</CustomText>
      </Pressable>
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textWrapper: {
    width: '60%',
  },
  title: {
    fontSize: 18,
    fontFamily: 'poppins-bold',
  },
  description: { fontSize: 10 },
  disabled: {
    color: ThemeColors.disabledText,
    textDecorationLine: 'line-through',
  },
  button: {
    borderRadius: 100,
    alignItems: 'center',
    height: 30,
    width: 30,
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});
