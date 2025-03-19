// import React from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

import React, { useEffect, useState } from "react";
// import ProductManagement from "./ProductManagement";
// import axios from "axios";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from "recharts";
import axios from "axios";
// import Heading from "../../components/home/Products/Heading";
// import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const MainDashboardContent = () => {
  // const [purchase, setPurchase] = useState([]);
  // const [purchaseCount, setPurchaseCount] = useState(0); // สร้าง state สำหรับจำนวนคำสั่งซื้อ
  const userId = localStorage.getItem("user_id"); // กำหนด userId ที่ต้องการ (อาจมาจาก Context หรือ LocalStorage)
  console.log("userId: ", userId);

  const [sellerId, setSellerId] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [businessInsights, setBusinessInsights] = useState([]);
  const [ordersData, setOrdersData] = useState([]);

  console.log("sellerId: ", sellerId);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await fetch(
  //         `${BASE_URL}/api/seller-purchase-order?userId=${userId}`,
  //         {
  //           headers: {
  //             "Cache-Control": "no-cache", // ห้ามแคช
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       const data = await response.json();

  //       console.log("data: ", data);
  //       console.log("response: ", response);

  //       if (response.ok) {
  //         setPurchaseCount(data.orderCount); // รับจำนวนคำสั่งซื้อและตั้งค่าใน state
  //         console.log("response: ", response);
  //         console.log("response.ok: ", response.ok);
  //       } else {
  //         console.error("Error fetching purchase:", data.message);
  //       }
  //     } catch (error) {
  //       console.error("Network error:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, [userId]);


  const chartData = [
    //data
    { name: "Jan", sales: 4000, visitors: 2400, orders: 2400 },
    { name: "Feb", sales: 3000, visitors: 1398, orders: 2210 },
    { name: "Mar", sales: 2000, visitors: 9800, orders: 2290 },
    { name: "Apr", sales: 2780, visitors: 3908, orders: 2000 },
    { name: "May", sales: 1890, visitors: 4800, orders: 2181 },
    { name: "Jun", sales: 2390, visitors: 3800, orders: 2500 },
    { name: "Jul", sales: 3490, visitors: 4300, orders: 2100 },
  ];

  console.log("chartData: ",chartData);

  useEffect(() => {
    console.log("userId :", userId);
    if (userId) {
      axios
        .get(`${BASE_URL}/api/get-seller-id/${userId}`, {
          headers: {
            "Cache-Control": "no-cache", // ห้ามแคช
          },
        })
        .then((response) => {
          console.log("response get-seller-id: ", response);
          if (response.data.sellerId) {
            setSellerId(response.data.sellerId);
          } else {
            console.error("Seller ID not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching seller ID:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    console.log("sellerId :", sellerId);
    if (sellerId) {
      fetch(`${BASE_URL}/api/seller-sales/${sellerId}`, {
        headers: {
          "Cache-Control": "no-cache", // ห้ามแคช
        },
      })
        .then((response) => response.json()) // แก้ไขให้ใช้ response.json()
        .then((data) => {
          setSalesData(data); // ดึงข้อมูล sales มาเก็บใน state
          // ฟังก์ชันแปลง "2024-01" เป็น "Jan"
          const formatMonth = (dateString) => {
            const date = new Date(dateString + "-01"); // แปลงเป็นวันที่
            return date.toLocaleString("en-US", { month: "short" }); // ได้ "Jan", "Feb" ฯลฯ
          };
          // แปลงข้อมูลเป็น chartData
          const formattedData = data.map((item) => ({
            name: formatMonth(item.month), // ใช้ชื่อเดือนจริง
            sales: item.total_revenue,
            visitors: item.total_sold,
            orders: item.total_orders,
          }));
          console.log("Log formattedData: ",formattedData);
          // แปลงข้อมูลเป็น chartData
          // const formattedData = data.map((item, index) => ({
          //   name: `Month ${index + 1}`, // หรือจะใช้เดือนจากข้อมูลจริงก็ได้
          //   sales: item.total_revenue,
          //   totalsold: item.total_sold, 
          //   orders: item.total_orders,
          // }));
          setBusinessInsights(formattedData);
        })
        .catch((error) => console.error("Error fetching sales data:", error));
    }
  }, [sellerId]);

  
  useEffect(() => {
    console.log("api seller ID 75: ", sellerId);
    if (sellerId) {
      // เรียก API ที่ดึงข้อมูลจากฐานข้อมูล
      axios
        .get(`${BASE_URL}/api/seller-orders/${sellerId}`, {
          headers: {
            "Cache-Control": "no-cache", // ห้ามแคช
          },
        })
        .then((response) => {
          setOrdersData(response.data); // เก็บข้อมูลคำสั่งซื้อใน state
          console.log("log response: ", response);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [sellerId]);
  
  const totalOrderedQuantity = ordersData.reduce((sum, order) => sum + Number(order.ordered_quantity), 0);

  // <ProductManagement sellerIds={sellerId} />

  // 4. รวมค่าของ total_sold, total_orders, total_revenue สำหรับ Pie Chart
  const totalSold = salesData.reduce(
    (sum, item) => sum + parseInt(item.total_sold, 10),
    0
  );
  const totalOrders = salesData.reduce(
    (sum, item) => sum + parseInt(item.total_orders, 10),
    0
  );
  const totalRevenue = salesData.reduce(
    (sum, item) => sum + parseInt(item.total_revenue, 10),
    0
  );

  // 5. จัดข้อมูลเป็น Array สำหรับ Pie Chart
  const aggregatedData = [
    { name: "Total Sold", value: totalSold },
    { name: "Total Orders", value: totalOrders },
    { name: "Total Revenue", value: totalRevenue },
  ];

  // 6. สีสำหรับแต่ละ slice (ปรับตามต้องการ)
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <div className="flex px-4 py-4 ml-4 pb-2">
      {/* Container สูงสุด 1440px และกึ่งกลาง */}
      <main className="flex-1 bg-gray-50 rounded-2xl border-4 border-sky-200 p-6 px-4 py-4 max-w-container mx-auto">
        {/* Grid สำหรับการ์ดข้อมูล */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            <Card className="shadow">
              <CardContent>
                <h3 className="text-lg font-bold">คำสั่งซื้อ</h3>
                <p className="text-2xl font-semibold">
                  {totalOrderedQuantity}
                </p> {/* {order.name} - จำนวน:  - สถานะ: {order.Status} */}
              </CardContent>
            </Card>

          {/* <Card className="shadow">
            <CardContent>
              <h3 className="text-lg font-bold">คำสั่งซื้อ</h3>
              <p className="text-2xl font-semibold">{purchaseCount}</p>
            </CardContent>
          </Card> */}
          <Card className="shadow">
            <CardContent>
              <h3 className="text-lg font-bold">กำลังจัดส่ง</h3>
              <p className="text-2xl font-semibold">0</p>
            </CardContent>
          </Card>
          <Card className="shadow">
            <CardContent>
              <h3 className="text-lg font-bold">คำขอคืนเงิน/คืนสินค้า</h3>
              <p className="text-2xl font-semibold">0</p>
            </CardContent>
          </Card>
          <Card className="shadow">
            <CardContent>
              <h3 className="text-lg font-bold">สินค้าที่ถูกระงับ/ลดการโปรโมต</h3>
              <p className="text-2xl font-semibold">0</p>
            </CardContent>
          </Card>
        </div>

        {/* Grid สำหรับกราฟ */}
        <div className="my-6 px-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Line Chart */}
          <div>
            <h3 className="text-lg font-bold mb-4">Business Insights</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={businessInsights}
                margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 3000000]} tickCount={5} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
                <Line type="monotone" dataKey="orders" stroke="#ffc658" />
                <Line type="monotone" dataKey="visitors" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div>
            <h4 className="text-lg font-bold mb-4">Sales Distribution (PieChart)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={aggregatedData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  minAngle={10}
                  labelLine={false}
                  label={({ name, value, percent }) =>
                    `${name}: ${value.toLocaleString()} (${(percent * 100).toFixed(2)}%)`
                  }
                  padAngle={2}
                >
                  {aggregatedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="justify-self-center"
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString()} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* ตารางรายละเอียด (ขยายให้เต็มคอลัมน์ในหน้าจอใหญ่) */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-lg font-bold mb-4">ยอดขายของคุณ</h3>
            <div className="overflow-y-auto max-h-96 w-full">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-100 sticky top-0">
                  <tr>
                    <th className="border px-4 py-2">สินค้า</th>
                    <th className="border px-4 py-2">จำนวนที่ขายได้</th>
                    <th className="border px-4 py-2">จำนวนคำสั่งซื้อ</th>
                    <th className="border px-4 py-2">รายได้รวม</th>
                  </tr>
                </thead>
                <tbody>
                  {salesData.map((item) => (
                    <tr key={item.product_id} className="border">
                      <td className="border px-4 py-2">{item.product_name}</td>
                      <td className="border px-4 py-2">{item.total_sold}</td>
                      <td className="border px-4 py-2">{item.total_orders}</td>
                      <td className="border px-4 py-2">
                      {parseFloat(item.total_revenue).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} บาท
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* GekkoShop Ads */}
        <div>
          <h3 className="text-lg font-bold mb-4">GekkoShop Ads</h3>
          <Card className="shadow">
            <CardContent className="flex justify-between items-center">
              <p>เพิ่มยอดขายด้วย GekkoShop Ads</p>
              <Button onClick={() => alert("ปุ่มถูกคลิกแล้ว!")} className="bg-blue-500 text-white">เรียนรู้เพิ่มเติม</Button>
            </CardContent>
          </Card>
        </div>

        {/* ประกาศ */}
        <div className="mt-6">
          <Card className="border rounded-lg shadow-sm">
            <CardHeader>
              <h2 className="text-lg font-semibold">ประกาศ</h2>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>หนึ่งสือพิมพ์ผู้ขาย ฉบับ 20 ม.ค. 68</li>
                <li>GekkoShop Mentor 2025 เปิดรับสมัครแล้ว!</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default MainDashboardContent;

{
  /* <div>
            <h3 className="text-lg font-bold mb-4">ยอดขายของคุณ</h3>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">สินค้า</th>
                  <th className="border px-4 py-2">จำนวนที่ขายได้</th>
                  <th className="border px-4 py-2">จำนวนคำสั่งซื้อ</th>
                  <th className="border px-4 py-2">รายได้รวม</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((item) => (
                  <tr key={item.product_id} className="border">
                    <td className="border px-4 py-2">{item.product_name}</td>
                    <td className="border px-4 py-2">{item.total_sold}</td>
                    <td className="border px-4 py-2">{item.total_orders}</td>
                    <td className="border px-4 py-2">{item.total_revenue.toLocaleString()} บาท</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */
}

{
  /* <div className="my-6">
        <h3 className="text-lg font-bold mb-4">Business Insights</h3>
        <LineChart
          width={800}
          height={300}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          <Line type="monotone" dataKey="visitors" stroke="#82ca9d" />
          <Line type="monotone" dataKey="orders" stroke="#ffc658" />
        </LineChart>
      </div> */
}
