import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { BudgetsData } from '@/lib/types';


type StatisticsChartProps =  {
    data: BudgetsData[];
  }
const StatisticsChart = ({data}: StatisticsChartProps) => {
  return (
    <div className="border-2 border-base-300 p-5 rounded-xl">
    <h3 className="text-lg font-semibold mb-3">Statistiques ( en € )</h3>
    <ResponsiveContainer height={250} width="100%">
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis dataKey="budgetName" />
        <Tooltip />
        <Bar name="Budget" dataKey="totalBudgetAmount" fill="#EF9FBC" radius={[10, 10, 0, 0]} />
        <Bar name="Dépensé" dataKey="totalTransactionsAmount" fill="#EEAF3A" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
  )
}

export default StatisticsChart