import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('main.db');

export const init = () => {
  const promise = new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, description TEXT, ischecked BOOLEAN NOT NULL CHECK (ischecked IN (0,1)), createdat TEXT NOT NULL, location TEXT NOT NULL, image TEXT)',
        [],
        () => resolve()
        // (_, err) => reject(err)
      );
    });
  });

  return promise;
};
