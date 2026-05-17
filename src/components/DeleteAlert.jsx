'use client';
import { TrashBin } from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";

const DeleteAlert = ({desDetailsData}) => {
    const {_id, destinationName} = desDetailsData;

    // server a delete api baniye ekeane ese seta connect korchi-
    const handleDelete= async ()=>{
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`,{
        method: "DELETE",
        headers:{
            'content-type': 'application/json'
        }
     });
     const data = await res.json();
     console.log(data)
     redirect('/destination')
     return data;
    }
    return (
            <AlertDialog>
        <Button className={"hover:bg-red-100"}
            color="danger"
            variant="flat"
            startContent={<TrashBin width={16} />}
          > 
            Delete
          </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete destination card permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{destinationName} destination</strong> and all of its
                data from server. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
    );
};

export default DeleteAlert;