import Image from "next/image";
import { getDestinationData } from "../../lib/data";
import { ArrowUpRight, Pin, Calendar } from "@gravity-ui/icons";
import Link from "next/link";
import { Button } from "@heroui/react";
import { BiRightArrow } from "react-icons/bi";


const HomeDestinationCard = async () => {
  const DesData = await getDestinationData();

  const Ddata = DesData?.slice(0,6);
  return (
    <div className=" container mx-auto my-20">
      {/* //agea pi banate hobe server e */}
      <div className="flex items-center justify-between">
      <h1 className="mb-5 text-4xl font-bold text-cyan-500">Some Destination</h1>

      <Link href={"/destination"}><p className=" text-cyan-500 flex items-center">See more-<BiRightArrow/> </p></Link>

      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

        {
        Ddata.map((data) => (
          <div key={data._id} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Image
        className="w-full h-[250px] object-cover"
        alt={data.destinationName}
        src={data.imageUrl}
        height={400}
        width={400}
      />

      <div className="p-4">
        {/* Location with Gravity Pin Icon */}
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
          <Pin width={14} height={14} /> <span>{data.country}</span>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{data.destinationName}</h2>
            {/* Duration with Gravity Calendar Icon */}
            <div className="flex gap-1 items-center text-gray-600 text-sm mt-1">
              <Calendar width={14} height={14} /> {data.duration}
            </div>
          </div>

          <div className="text-right">
            <h3 className="text-2xl font-bold text-cyan-600">$ {data.price}</h3>
          </div>
        </div>

        {/* Link and Button with Gravity ArrowUpRight Icon */}
        <Link href={`/destination/${data._id}`}>
          <Button  
            variant="ghost" 
            className="mt-4 text-cyan-500 hover:bg-cyan-50 border-cyan-500 flex items-center gap-2"
          >
            <ArrowUpRight width={16} height={16} /> Book Now
          </Button>
        </Link> 
      </div>
    </div>
        ))}
      </div>
    </div>
  );
};

export default HomeDestinationCard;
