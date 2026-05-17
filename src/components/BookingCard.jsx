'use client';
import { ArrowRight, Check } from '@gravity-ui/icons';
import { Button, Card, FieldError, Input, Label, TextField } from '@heroui/react';
import React, { useState } from "react";
import { authClient } from '../lib/auth-client';
import { toast } from 'react-toastify';

const BookingCard = ({ desDetailsData }) => {
  // ১. সেশন এবং লোডিং স্টেট চেক করা
  const { data: session, isPending } = authClient.useSession();
  const users = session?.user;

  // ২. স্টেটে শুধু তারিখের স্ট্রিং রাখা
  const [departureDates, setDepartureDates] = useState("");

  const {
    _id,
    destinationName,
    imageUrl,
    price,
    country,
  } = desDetailsData;

  const handleBooking = async () => {
    // ৩. ইউজার লগইন না থাকলে বুকিং ঠেকানো (Safety Check)
    if (!users) {
      alert("Please login to book this destination!");
      return;
    }

    // ৪. ডেট সিলেক্ট করা না থাকলে চেক করা
    if (!departureDates) {
      alert("Please select a departure date.");
      return;
    }

    const bookingData = {
      userId: users?.id, // এখন ইউজার নিশ্চিত আছে তাই এরর হবে না
      userImage: users?.image,
      userName: users?.name,
      destination: _id,
      destinationName,
      price,
      imageUrl,
      country,
      departureDates: new Date(departureDates) 
    };

    console.log("Final Booking Data:", bookingData);
    
    // client teke token patabo akn
    const {data: tokenData} = await authClient.token()
    console.log(tokenData);
    // end

   //server to client api connect
   const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
    method: "POST",
    headers: {
      'content-type' : 'application/json',
      authorization : `Bearer ${tokenData?.token}` //token pass
    },
    body: JSON.stringify(bookingData)
   })
   const data = await res.json();
   console.log(data)
   toast.success("You booked successfully!")

  };

  return (
    <Card className="sticky top-10 shadow-xl p-6">
      <p className="text-gray-500 text-sm mb-1">Starting from</p>
      <h2 className="text-4xl font-bold text-cyan-600 mb-1">${price}</h2>
      <p className="text-gray-400 text-xs mb-6">per person</p>

      <div className="md:col-span-2 mb-4">
        <TextField name="departureDate" isRequired>
          <Label>Departure Date</Label>
          <Input 
            // এখানে (e.target.value) ব্যবহার করা হয়েছে
            onChange={(e) => setDepartureDates(e.target.value)} 
            type="date" 
            className="rounded-2xl" 
          />
          <FieldError />
        </TextField>
      </div>

      <Button 
        onClick={handleBooking}
        // সেশন লোড হওয়ার সময় বাটন ডিজেবল রাখা ভালো
        isDisabled={isPending}
        color="primary"
        className="w-full py-7 text-lg font-bold bg-cyan-500 rounded-xl mb-6"
        endContent={<ArrowRight width={20} />}
      >
        {isPending ? "Loading..." : "Book Now"}
      </Button>

      {/* Benefits checklist remains same */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Check width={14} className="text-green-500" />
          Free cancellation up to 7 days
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Check width={14} className="text-green-500" />
          Travel insurance included
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;