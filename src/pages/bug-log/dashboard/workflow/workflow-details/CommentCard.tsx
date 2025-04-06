import { Image } from '@/components/image'
import moment from 'moment'

function CommentCard({commentData}:any) {
    return (
        <div>
            <div className="max-w-lg border px-6 py-2 rounded-lg mb-2 bg-amber-50">
                <div className="flex items-center mb-4 space-x-2">
                    <Image
                      src={'/images/dummy-user.png'}
                      alt="Student"
                      className="h-6 w-6 rounded-full"
                    />{" "}
                    <div>
                        <div className="text-sm text-gray-800 font-semibold">{commentData?.userId?.fullName || ''}</div>
                        <div className="text-xs italic text-gray-500">{`(${commentData?.roleId?.roleName})` || ''}</div>
                        <div className="text-xs text-gray-500">{moment(commentData?.timeStamp).format("DD-MM-YYYY hh:mm a")}</div>
                    </div>
                </div>
                <p className="text-sm leading-relaxed mb-6">{commentData?.comment}</p>
            </div>
        </div>

    )
}

export default CommentCard
