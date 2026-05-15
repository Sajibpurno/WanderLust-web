import DestinationCard from "../../components/DestinationCard";
import { getDestinationData } from "../../lib/data";


const DestinationPage = async () => {
  const DesData = await getDestinationData();
  return (
    <div className=" container mx-auto my-20">
      {/* //agea pi banate hobe server e */}
      <h1 className="mb-5 text-4xl font-bold text-cyan-500">All Destination</h1>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {DesData.map((data) => (
          <DestinationCard data={data} key={data._id} />
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;
