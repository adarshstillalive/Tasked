export interface ITask {
  title: string;
  description: string;
  assignToName: string;
  assignTo: string;
  endAt: Date;
  leadName: string;
  leadId: string;
  status: "pending" | "in-progress" | "completed";
  _id?: string;
}
