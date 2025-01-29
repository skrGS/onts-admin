"use client";

import { adminApi } from "@/apis";
import { BarChart } from "@/components/charts/bar";
import { LineChart } from "@/components/charts/line";
import PieChart from "@/components/charts/pie";
import Loading from "@/components/ui/loading";
import useSWR from "swr";

export default function RootPage() {
  const {data, isLoading} = useSWR("swr.dashboard", async () => {
    const res = adminApi.getDashboard();
    return res;
  })
  const {data:chart, isLoading: chartLoading} = useSWR("swr.dashboard.chart", async () => {
    const res=  adminApi.getChartDashboard();
    return res;
  })

  if(isLoading || chartLoading){
    return <Loading/>
  }
  return (
    <div className="p-10 m-0 flex flex-col h-auto gap-y-6">
       <div className="grid grid-cols-3 gap-x-10">
        <div className="min-h-[120px] rounded-lg p-4 justify-center items-center content-center  bg-white shadow-sm">
          <p className="font-semibold text-lg text-center">Бага(3-5-р анги)</p>
          <p className="font-bold text-center text-2xl">{data?.level1unpayment} / {data?.level1}</p>
        </div>
        <div className="min-h-[120px] rounded-lg p-4 justify-center items-center content-center  bg-white shadow-sm">
          <p className="font-semibold text-lg text-center">Дунд(6-9-р анги)</p>
          <p className="font-bold text-center text-2xl">{data?.level2unpayment} / {data?.level2}</p>
        </div>
        <div className="min-h-[120px] rounded-lg p-4 justify-center items-center content-center  bg-white shadow-sm">
          <p className="font-semibold text-lg text-center">Ахлах(10-12-р анги)</p>
          <p className="font-bold text-center text-2xl">{data?.level3unpayment} / {data?.level3}</p>
        </div>
      </div>
      {/* <div>
        <LineChart />
        </div> */}
      {/* <div className="grid grid-cols-2 gap-6">
        <BarChart />
        <PieChart />
      </div> */}
    </div>
  );
}
