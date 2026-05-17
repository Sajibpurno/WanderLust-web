'use client';
import { TrashBin } from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";
import { toast } from 'react-toastify';
import { authClient } from "../lib/auth-client";

const BookingCancleAlert = ({booking}) => {
    const {_id, destinationName} = booking;

    // server a delete api baniye ekeane ese seta connect korchi-
    const handleCancel= async ()=>{
     // client teke token patabo akn
         const {data: tokenData} = await authClient.token()
         console.log(tokenData);
         // end

     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${_id}`,{
        method: "DELETE",
        headers:{
            'content-type': 'application/json',
            authorization : `Bearer ${tokenData?.token}` //token pass
        }
     });
     const data = await res.json();
     if (res.ok) {
                // ১. সাকসেস টোস্ট দেখাবে 
                toast.success(`${destinationName} booking cancelled!`);
                
                 redirect('/my-bookings')
                
            }
     return data;
    }
    return (
            <AlertDialog>
        <Button className={"hover:bg-red-100"}
            color="danger"
            variant="flat"
            startContent={<TrashBin width={16} />}
          > 
            Cancel
          </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete booking card permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently cancel <strong> {destinationName} booking</strong> and all of its
                data from server. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleCancel}  slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
    );
};

export default BookingCancleAlert;