import useAdminStats from "../../../Hook/useAdminStats";
import useAuth from "../../../Hook/useAuth";
import { AiFillShop, AiOutlineCar, AiOutlineRise, AiOutlineUser } from "react-icons/ai";

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import useAxios from "../../../Hook/useAxios";
import { useQuery } from "@tanstack/react-query";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const AdminHome = () => {
  //useAuth and useAdminStats
  const { user } = useAuth();
  const [adminStats] = useAdminStats();
  console.log(adminStats);

  //axios hook
  const axios = useAxios()

  //usequery ten-satck
  const { data: chartData = [] } = useQuery({
    queryKey: ['admin-chartsData'],
    queryFn: async () => {
      const result = await axios.get("category-sales")
      return result.data
    }
  })

  const pieChartData = chartData.map(data => {
    return  {name: data?.category, value: data?.totalSales}
  })
  
  //custom shape function
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  //pie chart custom functionality
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <h2 className="text-2xl mt-20">
        Hi! Welcome{" "}
        <span className="text-green-500 font-bold">{user?.displayName}. </span>
      </h2>

      <div className="stats w-full stats-vertical lg:stats-horizontal my-5 py-5 shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <AiOutlineRise className="text-4xl font-bold"></AiOutlineRise>
          </div>
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-primary">{adminStats.total} $</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <AiOutlineUser className="text-4xl font-bold"></AiOutlineUser>
          </div>
          <div className="stat-title">Customers</div>
          <div className="stat-value text-secondary">
            {adminStats.customers} persons
          </div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <AiOutlineCar className="text-4xl font-bold"></AiOutlineCar>
          </div>
          <div className="stat-title">Orders done</div>
          <div className="stat-value">{adminStats.orders} orders</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <AiFillShop className="text-4xl"></AiFillShop>
          </div>

          <div className="stat-title">Products</div>
          <div className="stat-value  text-primary">{adminStats.products} items</div>

        </div>
      </div>

      <div className="flex my-16 items-center justify-center gap-6 flex-col lg:flex-row">
        <div className="lg:w-1/2">
          <BarChart
            width={400}
            height={300}
            data={chartData}
            margin={{
              top: 0,
              right:0,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar dataKey="totalSales" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="lg:w-1/2">
          <PieChart width={400} height={400}>
            <Pie
            
              data={pieChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
