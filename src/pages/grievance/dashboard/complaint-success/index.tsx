import Page from "@/components/helmet-page";
import SuccessPage from "./SuccessPage";

function index() {
    return (
        <Page title='' subTitle=''>
            <div className='bg-white p-12'>
                <SuccessPage />
            </div>
        </Page>

    )
}

export default index
