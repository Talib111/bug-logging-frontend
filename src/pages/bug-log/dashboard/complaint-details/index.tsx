import Page from "@/components/helmet-page";
import ComplaintDetails from "./ComplaintDetails";

function index() {
    return (
        <Page title='Bug Details' subTitle='Manage all the Bug here'>
            <div className=''>
                <ComplaintDetails />
            </div>
        </Page>


    )
}

export default index
