class Task {
  constructor(
    public title: string,
    public description: string,
    public assignToName: string,
    public assignTo: string,
    public endAt: Date,
    public leadName: string,
    public leadId: string,
    public status: "pending" | "in-progress" | "completed",
    public _id?: string
  ) {}

  isCompleted(): boolean {
    return this.status === "completed";
  }

  updateStatus(newStatus: "pending" | "in-progress" | "completed"): void {
    this.status = newStatus;
  }
}

export default Task;
