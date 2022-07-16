import { LoremIpsum } from 'lorem-ipsum';
import { TaskType } from '../types/task.type';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 1,
  },
  wordsPerSentence: {
    max: 20,
    min: 5,
  },
});

export const generateTasks = (amount: number): TaskType[] => {
  const tasks: TaskType[] = [];

  for (let i = 0; i < amount; i++) {
    tasks.push({
      id: i,
      title: lorem.generateWords(Math.floor(Math.random() * 10) + 1),
      description: lorem.generateSentences(Math.floor(Math.random() * 4) + 1),
      isChecked: Math.random() < 0.5,
      createdAt: new Date().toDateString(),
    });
  }

  return tasks;
};
