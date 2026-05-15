import { headers } from 'next/headers';
import { auth } from '../../lib/auth';
import Image from 'next/image';
import { Calendar, MapPin, TrashBin, Eye } from '@gravity-ui/icons'; // Gravity Icons
import { Button, Card, Chip } from '@heroui/react'; // HeroUI
import BookingCancleAlert from '../../components/BookingCancleAlert';

const MyBookingPage = async () => {
    // server side a user data anlam
    const session = await auth.api.getSession({
        headers: await headers()
    });
    const user = session?.user;

    // if no user than show
    if (!user) return <div className="p-10 text-center">
        <p>Please login to view bookings.</p>
    </div>;

    const res = await fetch(`http://localhost:8000/booking/${user?.id}`, {
        cache: 'no-store' // লেটেস্ট ডেটা পাওয়ার জন্য
    });
    const bookingData = await res.json();

    return (
        <div className="max-w-5xl mx-auto p-6">
            <header className="mb-10">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">My Bookings</h1>
                <p className="text-gray-500">Manage and view your upcoming travel plans</p>
            </header>

            <div className="space-y-6">
                {bookingData.length > 0 ? (
                    bookingData.map((booking) => (
                        <Card key={booking._id} className="p-0 border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                            <div className="flex flex-col md:flex-row gap-6 p-4">
                                {/* Left Side: Image */}
                                <div className="relative w-full md:w-72 h-48 rounded-xl overflow-hidden shadow-inner">
                                    <Image
                                        src={booking.imageUrl || "https://via.placeholder.com/300"}
                                        alt={booking.destinationName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                {/* Middle Side: Details */}
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-2">
                                        {/* Status Chip */}
                                        <Chip 
                                            size="sm" 
                                            variant="flat" 
                                            color={booking.status === 'Pending' ? "warning" : "success"}
                                            startContent={booking.status === 'Pending' ? "" : "✓"}
                                            className="capitalize"
                                        >
                                            {booking.status || "Confirmed"}
                                        </Chip>
                                    </div>
                                    
                                    <h2 className="text-2xl font-bold text-gray-800">{booking.destinationName}</h2>
                                    
                                    <div className="space-y-2 text-gray-500 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Calendar width={16} className="text-gray-400" />
                                            <span>Departure: {new Date(booking.departureDates).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin width={16} className="text-gray-400" />
                                            <span>Booking ID: {booking._id.slice(-6)}</span>
                                        </div>
                                    </div>

                                    <div className="text-3xl font-bold text-cyan-600 mt-2">
                                        ${booking.price}
                                    </div>
                                </div>

                                {/* Right Side: Actions */}
                                <div className="flex justify-end items-center gap-3 min-w-[120px]">
                                    <BookingCancleAlert booking={booking}/>

                                    <Button 
                                        color="primary" 
                                        className="bg-cyan-500 font-medium"
                                        startContent={<Eye width={18}/>}
                                    >
                                        View
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed">
                        <p className="text-gray-500 italic">No bookings found yet!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookingPage;