import { StyleSheet, View, Pressable } from 'react-native';
import React from 'react';
import CheckBox from 'expo-checkbox';
import CustomText from '../CustomText/CustomText';
import ThemeColors from '../../../styles/colors';
import { TaskType } from '../../../types/task.type';
import IonicIcons from '@expo/vector-icons/Ionicons';

type Props = {
  task: TaskType;
  onDelete: (task: TaskType) => void;
  onCheckChange: (task: TaskType) => void;
  onViewDetails: (task: TaskType) => void;
  viewOnly?: boolean;
};

const Task = ({
  onDelete,
  onCheckChange,
  task,
  onViewDetails,
  viewOnly = false,
}: Props) => {
  return (
    <View
      style={[
        styles.root,
        viewOnly
          ? { justifyContent: 'center' }
          : { justifyContent: 'space-between' },
      ]}
    >
      {!viewOnly && (
        <CheckBox
          value={task.isChecked}
          onValueChange={() => onCheckChange(task)}
        ></CheckBox>
      )}
      <Pressable
        style={[
          styles.textWrapper,
          viewOnly ? { width: '100%' } : { width: '60%' },
        ]}
        onPress={() => onViewDetails(task)}
      >
        <CustomText
          style={[task.isChecked ? styles.disabled : '', styles.title]}
        >
          {task.title}
        </CustomText>
      </Pressable>
      {!viewOnly && (
        <Pressable
          style={[
            styles.button,
            task.isChecked
              ? { backgroundColor: ThemeColors.disabledText }
              : { backgroundColor: ThemeColors.primary },
          ]}
          onPress={() => onDelete(task)}
        >
          <IonicIcons
            name={'close-outline'}
            size={20}
            color={ThemeColors.white}
          />
        </Pressable>
      )}
    </View>
  );
};

export default Task;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    paddingHorizontal: 20,
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
