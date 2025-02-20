
type SummaryCardProps = {
  title: string;
  value: string | number | null;
  icon: React.ReactNode;
}

const SummaryCard = ({ title, value, icon } : SummaryCardProps) => (
  <div className="border-2 border-base-300 p-5 flex justify-between items-center rounded-xl ">
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">{title}</span>
      <span className="text-2xl font-bold text-accent">{value !== null ? value : "N/A"}</span>
    </div>
    {icon}
  </div>
);

export default SummaryCard;