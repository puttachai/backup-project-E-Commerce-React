// import React from "react";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

import React,{ useEffect, useState} from "react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
// import Heading from "../../components/home/Products/Heading";
// import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const MainDashboardContent = () => {

  // const [purchase, setPurchase] = useState([]);
  const [purchaseCount, setPurchaseCount] = useState(0); // สร้าง state สำหรับจำนวนคำสั่งซื้อ
  const userId = localStorage.getItem("user_id"); // กำหนด userId ที่ต้องการ (อาจมาจาก Context หรือ LocalStorage)
  console.log("userId: ", userId);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/seller-purchase-order?userId=${userId}`,{
          headers: {
            'Cache-Control': 'no-cache', // ห้ามแคช
            "Content-Type": "multipart/form-data",
          },
        });
        const data = await response.json();

        console.log("data: ",data);
        console.log("response: ",response);

        if (response.ok) {
          setPurchaseCount(data.orderCount); // รับจำนวนคำสั่งซื้อและตั้งค่าใน state
          console.log("response: ",response);
          console.log("response.ok: ",response.ok);
        } else {
          console.error("Error fetching purchase:", data.message);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchProducts();
  }, [userId]);

    const data = [
        { name: "Jan", sales: 4000, visitors: 2400, orders: 2400 },
        { name: "Feb", sales: 3000, visitors: 1398, orders: 2210 },
        { name: "Mar", sales: 2000, visitors: 9800, orders: 2290 },
        { name: "Apr", sales: 2780, visitors: 3908, orders: 2000 },
        { name: "May", sales: 1890, visitors: 4800, orders: 2181 },
        { name: "Jun", sales: 2390, visitors: 3800, orders: 2500 },
        { name: "Jul", sales: 3490, visitors: 4300, orders: 2100 },
      ];
      

  return (
    <div className="flex px-4 py-4 ml-4 pb-2"> {/* h-screen */}
    {/* <Heading heading="Seller Centre" /> */}
    {/* Main Dashboard Content */}
    <main className="flex-1 bg-gray-50 rounded-2xl border-4 border-sky-200 p-6 px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow">
          <CardContent>
            <h3 className="text-lg font-bold">คำสั่งซื้อ</h3>
            {/* <p className="text-2xl font-semibold">0</p> */}
            <p className="text-2xl font-semibold">{purchaseCount}</p> {/* แสดงจำนวนคำสั่งซื้อ */}
          </CardContent>
        </Card>
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

      <div className="my-6">
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
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">GekkoShop Ads</h3>
        <Card className="shadow">
          <CardContent className="flex justify-between items-center">
            <p>เพิ่มยอดขายด้วย GekkoShop Ads</p>
            <Button className="bg-blue-500 text-white">เรียนรู้เพิ่มเติม</Button>
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

