export function assignTableComment({ taskDeadline, registeredWallet, isTaskStale, daysElapsedSinceTaskCreation }: AssignTableCommentParams) {
  const elements: string[] = ["<samp>", "<table>"];

  if (isTaskStale) {
    elements.push(
      "<tr>",
      "<td>Warning!</td>",
      `<td>This task was created over ${daysElapsedSinceTaskCreation} days ago. Please confirm that this issue specification is accurate before starting.</td>`,
      "</tr>"
    );
  }

  if (taskDeadline) {
    elements.push("<tr>", "<td>Deadline</td>", `<td>${taskDeadline}</td>`, "</tr>");
  }

  const walletMessage = registeredWallet ?? "> [!WARNING]\n> Register your wallet to be eligible for rewards.";
  elements.push("<tr>", "<td>Beneficiary</td>", `<td>${walletMessage}</td>`, "</tr>", "</table>", "</samp>");

  return elements.join("\n");
}

interface AssignTableCommentParams {
  taskDeadline: string | null;
  registeredWallet: string;
  isTaskStale: boolean;
  daysElapsedSinceTaskCreation: number;
}
