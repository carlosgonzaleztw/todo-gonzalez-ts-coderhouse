import { User } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore/lite';
import { db } from '../../App';
import { TaskType } from '../types/task.type';

export const getAllDbTasks = async (user: User): Promise<TaskType[]> => {
  const tasksCol = collection(db, 'tasks');

  const q = query(tasksCol, where('user', '==', user?.uid));
  const tasksSnapshot = await getDocs(q);

  let tasks: TaskType[] = [];

  tasksSnapshot.forEach((task) => {
    tasks.push(task.data() as TaskType);
  });

  return tasks;
};

// export const persistTask = ({
//   title,
//   description,
//   isChecked,
//   createdAt,
//   location,
//   image,
// }: TaskType) => {
//   const promise = new Promise<unknown>((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'INSERT into task (title, description, isChecked, createdAt, location , image) VALUES (?,?,?,?,?,?)',
//         [
//           title,
//           description,
//           isChecked ? '1' : '0',
//           createdAt as string,
//           location ? (location as string) : '',
//           image ? (image as string) : '',
//         ],
//         (_, result) => resolve(result),
//         (_, err): boolean | any => reject(err)
//       );
//     });
//   });

//   return promise;
// };

// export const updateDbTask = ({
//   title,
//   description,
//   isChecked,
//   createdAt,
//   location,
//   image,
//   id,
// }: TaskType) => {
//   const promise = new Promise<unknown>((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'UPDATE task SET title=?, description=?, isChecked=?, createdAt=?, location=?, image=? WHERE id=?',
//         [
//           title,
//           description,
//           isChecked ? '1' : '0',
//           createdAt as string,
//           location ? (location as string) : '',
//           image ? (image as string) : '',
//           id as number,
//         ],
//         (_, result) => resolve(result),
//         (_, err): boolean | any => reject(err)
//       );
//     });
//   });

//   return promise;
// };

// export const deleteDbTask = (id: number) => {
//   const promise = new Promise<unknown>((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'DELETE from task WHERE id=?',
//         [id as number],
//         (_, result) => resolve(result),
//         (_, err): boolean | any => reject(err)
//       );
//     });
//   });

//   return promise;
// };
