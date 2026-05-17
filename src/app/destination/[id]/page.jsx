import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Pin
} from "@gravity-ui/icons";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import DeleteAlert from "../../../components/DeleteAlert";
import { EditModal } from "../../../components/EditModal";
import { getDesDetailsData } from "../../../lib/data";
import BookingCard from "../../../components/BookingCard";



const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  const desDetailsData = await getDesDetailsData(id);

  const {
    destinationName,
    imageUrl,
    price,
    duration,
    country,
    description,
    departureDate,
  } = desDetailsData;

  return (
    //ekan teke details er data form ee pachi abar edit er jonne
    <div className="container mx-auto p-6">
      <h1 className="mb-5 text-4xl font-bold text-cyan-500">
        Destination Details
      </h1>

      <div className="flex justify-between items-center mb-6">
        <Link
          href="/destination"
          className="flex items-center gap-2 text-gray-600 hover:text-black transition"
        >
          <ArrowLeft width={18} />
          Back to Destinations
        </Link>

        <div className="flex gap-3">
          <EditModal desDetailsData={desDetailsData} />

          <DeleteAlert desDetailsData={desDetailsData} />
        </div>
      </div>

      {/* Banner Image */}
      <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-8">
        <Image
          src={imageUrl}
          alt={destinationName}
          fill
          className="object-cover"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-1 text-gray-500 mb-2">
            <Pin width={16} />
            <span>{country}</span>
          </div>

          <h1 className="text-5xl font-extrabold mb-4">{destinationName}</h1>

          <div className="flex items-center gap-6 mb-8 text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 font-bold text-lg">★ 4.9</span>
              <span className="text-gray-400">(234 reviews)</span>
            </div>

            <div className="flex items-center gap-2">
              <Calendar width={18} />
              <span>{duration}</span>
            </div>
          </div>

          <section className="mb-8">
            <h3 className="text-2xl font-bold mb-3">Overview</h3>

            <p className="text-gray-600 leading-relaxed">{description}</p>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-4">Highlights</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
              {[
                "Luxury beachfront accommodation",
                "Traditional Balinese spa treatment",
                "Sunrise trek to Mount Batur",
                "Visit Uluwatu Temple at sunset",
                "Private beach dinner experience",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2 text-gray-700">
                  <Check width={16} className="text-green-500" />

                  <span>{text}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right */}
        <div className="lg:col-span-1">
        <BookingCard desDetailsData={desDetailsData}/>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
