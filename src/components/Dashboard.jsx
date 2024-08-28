import React from 'react';
import { faker }  from '@faker-js/faker';
import { FaHome, FaList, FaCalendar } from 'react-icons/fa';
import { IoMdSettings } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";

const Sidebar = () => {
  return (
    <div className="w-58 bg-gray-200 border-r-4 border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <img
            src={faker.image.avatar()}
            alt="User"
            className="w-4 h-4 rounded-full"
          />
          <span className="font-semibold">Catalyst</span>
        </div>
        <button className="">
          <FaAngleDown  />
        </button>
      </div>

      <nav className="mt-10">
        <ul>
          <li className="px-6 py-2 flex items-center space-x-2 cursor-pointer border-l-4 border-gray-200">
            <FaHome />
            <span>Home</span>
          </li>
          <li className="px-6 py-2 flex items-center space-x-2 cursor-pointer border-l-4 border-gray-200">
            <FaList />
            <span>Events</span>
          </li>
          <li className="px-6 py-2 flex items-center space-x-2 cursor-pointer border-l-4 border-black">
            <FaCalendar />
            <span>Orders</span>
          </li>
          <li className="px-6 py-2 flex items-center space-x-2 cursor-pointer border-l-4 border-gray-200">
            <IoMdSettings />
            <span>Settings</span>
          </li>
        </ul>
      </nav>

      <div className="mt-10 px-6">
        <h2 className="text-md font-normal mb-2 text-slate-600">Upcoming Events</h2>
        <ul>
          <li className="py-2 cursor-pointer font-semibold">Bear Hug: Live in Concert</li>
          <li className="py-2 cursor-pointer font-semibold">Six Fingers - DJ Set</li>
          <li className="py-2 cursor-pointer font-semibold">We All Look The Same</li>
          <li className="py-2 cursor-pointer font-semibold">Viking People</li>
        </ul>
      </div>
    </div>
  );
};

const DataTable = () => {
  const generateFakeData = (numRows) => {
    return Array.from({ length: numRows }, () => ({
      orderNumber: faker.datatype.number({ min: 1000, max: 9999 }),
      purchaseDate: faker.date.past(),
      customer: faker.name.fullName(),
      event: {
        name: faker.hacker.noun(),
        avatar: faker.image.avatar(),
      },
      amount: faker.finance.amount(),
    }));
  };

  const data = generateFakeData(10);

  const formatCurrency = (amount) => {
    return `US$${parseFloat(amount).toFixed(2)}`;
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
  };

  return (
    <div className="flex-1 p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Orders</h1>
        <button className="bg-black text-white px-4 py-2 rounded">Create Order</button>
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b text-left">Order Number</th>
            <th className="px-4 py-2 border-b text-left">Purchase Date</th>
            <th className="px-4 py-2 border-b text-left">Customer</th>
            <th className="px-4 py-2 border-b text-left">Event</th>
            <th className="px-4 py-2 border-b text-left">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="px-4 py-2">{row.orderNumber}</td>
              <td className="px-4 py-2">{formatDate(row.purchaseDate)}</td>
              <td className="px-4 py-2">{row.customer}</td>
              <td className="px-4 py-2 flex items-center space-x-2">
                <img
                  src={row.event.avatar}
                  alt={row.event.name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{row.event.name}</span>
              </td>
              <td className="px-4 py-2">{formatCurrency(row.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="flex h-screen border-4 border-gray-200">
      <Sidebar />
      <DataTable />
    </div>
  );
};

export default Dashboard;
