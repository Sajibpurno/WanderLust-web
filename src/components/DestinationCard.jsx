import { Button } from "@heroui/react";
// Gravity UI Icons import
import { Pin, Calendar, ArrowUpRight } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";

const DestinationCard = ({ data }) => {
  const { _id, imageUrl, price, destinationName, duration, country } = data;

  return (
    <div className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Image
        className="w-full h-[250px] object-cover"
        alt={destinationName}
        src={imageUrl}
        height={400}
        width={400}
      />

      <div className="p-4">
        {/* Location with Gravity Pin Icon */}
        <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
          <Pin width={14} height={14} /> <span>{country}</span>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{destinationName}</h2>
            {/* Duration with Gravity Calendar Icon */}
            <div className="flex gap-1 items-center text-gray-600 text-sm mt-1">
              <Calendar width={14} height={14} /> {duration}
            </div>
          </div>

          <div className="text-right">
            <h3 className="text-2xl font-bold text-cyan-600">$ {price}</h3>
          </div>
        </div>

        {/* Link and Button with Gravity ArrowUpRight Icon */}
        <Link href={`/destination/${_id}`}>
          <Button  
            variant="ghost" 
            className="mt-4 text-cyan-500 hover:bg-cyan-50 border-cyan-500 flex items-center gap-2"
          >
            <ArrowUpRight width={16} height={16} /> Book Now
          </Button>
        </Link> 
      </div>
    </div>
  );
};

export default DestinationCard;