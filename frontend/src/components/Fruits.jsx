import React, { useEffect, useState } from "react";
import { $api } from "../utils";

export default function Fruits() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await $api(`/products`);
        const Fruits = response.data.filter(item => item.category === "fruits");
        setData(Fruits);
      } catch (error) {
        console.error("❌ API Error:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="pt-32 min-h-[696px] max-h-full pb-12 bg-slate-800">
      <h1 className="text-4xl text-center text-white font-bold">Fruits</h1>

      {loading ? (
        <div className="flex items-center justify-center mt-32 bg-slate-800">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-t-4 border-gray-200 border-t-blue-500 animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800 p-5 flex flex-wrap gap-6 justify-center w-full min-h-auto px-4 sm:px-8 md:px-16 lg:px-32 mt-8">
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id || item._id}
                className="w-[270px] cursor-pointer max-w-sm bg-white border border-gray-200 rounded-xl hover:shadow-gray-500 hover:shadow-[0px_0px_13px_3px] duration-700 hover:scale-[1.02] h-[330px] flex flex-col"
              >
                <img
                  className="p-4 hover:opacity-80 w-full h-48 duration-300 rounded-t-lg transition-all object-cover"
                  src={item.image}
                  alt={item.name}
                />
                <div className="px-5 pb-5 flex flex-col justify-between flex-grow">
                  <h5 className="text-2xl text-center font-semibold tracking-tight text-gray-900 mb-2">
                    {item.name}
                  </h5>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-gray-500 text-lg">{item.category}</p>
                    <span className="text-2xl font-bold text-blue-500">
                      ${item.price}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 text-xl font-light whitespace-nowrap">
              No national foods available
            </p>
          )}
        </div>
      )}
    </div>
  );
}
