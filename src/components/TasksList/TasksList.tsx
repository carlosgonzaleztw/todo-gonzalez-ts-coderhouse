import { StyleSheet, View, Text, FlatList } from 'react-native';
import React from 'react';
import Task from '../common/Task/Task';
import { TaskType } from '../../types/task.type';

type Props = {
  tasks: TaskType[];
  onTaskCheckChange: (task: TaskType) => void;
  onTaskDelete: (task: TaskType) => void;
  onViewDetails: (task: TaskType) => void;
  viewOnly?: boolean;
};

const TasksList = ({
  tasks,
  onTaskCheckChange,
  onTaskDelete,
  onViewDetails,
  viewOnly = false,
}: Props) => {
  const renderItem = ({ item }: { item: TaskType }) => {
    return (
      <Task
        task={item}
        onCheckChange={() => onTaskCheckChange(item)}
        onDelete={() => onTaskDelete(item)}
        onViewDetails={() => onViewDetails(item)}
        viewOnly={viewOnly}
      ></Task>
    );
  };

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      style={styles.root}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default TasksList;

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
});
