import { ReactElement } from "react";

interface BudgetProgressProps {
    progress: number;
  }
  
  const BudgetProgress = ({ progress }: BudgetProgressProps): ReactElement => (
    <div>
      <progress
        className="progress progress-accent w-full mt-4"
        value={progress}
        max="100"
      ></progress>
    </div>
  );

  export default BudgetProgress;