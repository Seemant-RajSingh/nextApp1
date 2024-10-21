// grabbing parameters : here - http://localhost:xyz/profile/<value> , value displayed in span


export default function UserProfile({params}) {

    //console.log("params are", params)   // the id after profile/
    console.log("params is: ", params)

    return (
        <div className="flex flex-col justify-center h-screen">
            <div className="flex flex-col items-center">
                <h1>Profile</h1>
                <hr />
                <p>Profile page {' '} {/* ---> for empty space */}
                <span className="text-black bg-green-600">{params.id2}</span>
                </p>
            </div>
        </div>
    )
}