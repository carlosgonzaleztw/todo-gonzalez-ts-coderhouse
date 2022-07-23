import * as SQLite from 'expo-sqlite';
import { TaskType } from '../types/task.type';

const db = SQLite.openDatabase('main.db');

export const init = () => {
  const promise = new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT, isChecked BOOLEAN NOT NULL, createdAt TEXT NOT NULL, location TEXT, image TEXT)',
        [],
        () => resolve(),
        (_, err): boolean | any => reject(err)
      );
    });
  });

  return promise;
};

export const getAllDbTasks = () => {
  const promise = new Promise<unknown>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * from task',
        [],
        (_, result) => resolve(result),
        (_, err): boolean | any => reject(err)
      );
    });
  });

  return promise;
};

export const persistTask = ({
  title,
  description,
  isChecked,
  createdAt,
  location,
  image,
}: TaskType) => {
  const promise = new Promise<unknown>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT into task (title, description, isChecked, createdAt, location , image) VALUES (?,?,?,?,?,?)',
        [
          title,
          description,
          isChecked ? '1' : '0',
          createdAt as string,
          location ? (location as string) : '',
          image ? (image as string) : '',
        ],
        (_, result) => resolve(result),
        (_, err): boolean | any => reject(err)
      );
    });
  });

  return promise;
};

export const updateDbTask = ({
  title,
  description,
  isChecked,
  createdAt,
  location,
  image,
  id,
}: TaskType) => {
  const promise = new Promise<unknown>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE task SET title=?, description=?, isChecked=?, createdAt=?, location=?, image=? WHERE id=?',
        [
          title,
          description,
          isChecked ? '1' : '0',
          createdAt as string,
          location ? (location as string) : '',
          image ? (image as string) : '',
          id as number,
        ],
        (_, result) => resolve(result),
        (_, err): boolean | any => reject(err)
      );
    });
  });

  return promise;
};

export const deleteDbTask = (id: number) => {
  const promise = new Promise<unknown>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE from task WHERE id=?',
        [id as number],
        (_, result) => resolve(result),
        (_, err): boolean | any => reject(err)
      );
    });
  });

  return promise;
};
