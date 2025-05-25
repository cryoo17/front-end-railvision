import CardStation from "@/components/ui/CardStation/CardStation";
import { IStation } from "@/types/Station";
import Link from "next/link";

interface PropTypes {
  title: string;
  station: IStation[];
  isLoadingStation: boolean;
}

const HomeStation = (props: PropTypes) => {
  const { title, station, isLoadingStation } = props;
  return (
    <section className="mx-6 mb-16">
      <div className="mb-2 flex items-center justify-between px-6 lg:px-0">
        <h2 className="text-2xl font-bold text-blue-700">{title}</h2>
        <Link href={"/station"} className="font-semibold text-foreground-500">
          See More
        </Link>
      </div>
      <div className="grid auto-cols-[20rem] grid-flow-col gap-6 overflow-x-auto py-2 pb-4 lg:grid-cols-4 lg:px-1">
        {!isLoadingStation
          ? station?.map((item: IStation) => (
              <CardStation
                key={`card-station-${item._id}`}
                station={item}
                className="first:ml-6 last:mr-6 lg:first:ml-0 lg:last:mr-0"
              />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <CardStation
                key={`card-station-loading-${index}`}
                isLoading={isLoadingStation}
                className="first:ml-6 last:mr-6 lg:first:ml-0 lg:last:mr-0"
              />
            ))}
      </div>
    </section>
  );
};

export default HomeStation;
