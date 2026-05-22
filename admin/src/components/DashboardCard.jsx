export default function DashboardCard({

  title,
  value,
  growth

}) {

  return (

    <div className="bg-white rounded-[28px] p-7 border border-[#edf1e8] shadow-sm hover:shadow-md transition">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[#7d877d] text-sm font-medium">

            {title}

          </p>

          <h2 className="mt-5 text-5xl font-bold text-[#183818]">

            {value}

          </h2>

        </div>

        <div className="bg-[#edf7df] text-[#2d5a2d] text-sm font-semibold px-3 py-1 rounded-full">

          {growth}

        </div>

      </div>

    </div>

  )

}