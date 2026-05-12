type Props = {
  name: string;
  email: string;
  company: string;
  completedTasks: number;
  pendingTasks: number;
};

export default function UserOverviewCard({
  name,
  email,
  company,
  completedTasks,
  pendingTasks,
}: Props) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-900 text-3xl font-bold text-white">
            {name.charAt(0)}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {name}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {email}
            </p>

            <p className="mt-2 text-sm text-gray-400">
              {company}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="text-sm text-gray-500">
              Posts
            </p>

            <p className="mt-2 text-3xl font-bold text-gray-900">
              5+
            </p>
          </div>

          <div className="rounded-2xl bg-green-50 p-5">
            <p className="text-sm text-green-700">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-green-900">
              {completedTasks}
            </p>
          </div>

          <div className="rounded-2xl bg-orange-50 p-5">
            <p className="text-sm text-orange-700">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-900">
              {pendingTasks}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}