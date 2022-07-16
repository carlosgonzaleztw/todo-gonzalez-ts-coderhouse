export type TaskType = {
  id?: number;
  title: string;
  createdAt: string | undefined;
  description: string;
  isChecked: boolean;
  location?: string;
  image?: string;
};
