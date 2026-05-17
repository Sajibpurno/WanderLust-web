import Image from "next/image";
import Banner from "../components/Banner";
import HomeDestinationCard from "./destination/HomeDestinationCard";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <HomeDestinationCard/>
    </div>
  );
}
