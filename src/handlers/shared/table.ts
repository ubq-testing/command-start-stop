export function assignTableComment({ taskDeadline, registeredWallet, isTaskStale, daysElapsedSinceTaskCreation }: AssignTableCommentParams) {
  const elements: string[] = ["<samp>", "<table>"];

  if (isTaskStale) {
    elements.push(
      "<tr>",
      "<td>Warning!</td>",
      `<td><b>This task was created over ${daysElapsedSinceTaskCreation} days ago. Please confirm that this issue specification is accurate before starting.</b></td>`,
      "</tr>"
    );
  }

  if (taskDeadline) {
    elements.push("<tr>", "<td>Deadline</td>", `<td><b>${taskDeadline}</b></td>`, "</tr>");
  }

  elements.push("<tr>", "<td>Beneficiary</td>", `<td><b>${registeredWallet}</b></td>`, "</tr>", "</table>", "</samp>");

  return elements.join("\n");
}

interface AssignTableCommentParams {
  taskDeadline: string | null;
  registeredWallet: string;
  isTaskStale: boolean;
  daysElapsedSinceTaskCreation: number;
}
