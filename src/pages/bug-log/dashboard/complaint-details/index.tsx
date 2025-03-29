import Page from "@/components/helmet-page";
import ComplaintDetails from "./ComplaintDetails";

function index() {
    return (
        <Page title='Grievance Details' subTitle='Manage all the Grievance here'>
            <div className=''>
                <ComplaintDetails />
            </div>
        </Page>


    )
}

export default index
