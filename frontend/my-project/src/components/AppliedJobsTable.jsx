const AppliedJobTable = ()=>{
    return(
        <div>
            <table className=" border-separate border-spacing-x-56 border-spacing-y-5">
                <thead>
                    <tr>
                    <th>Date</th>
                    <th>Job Role</th>
                    <th>Company</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {[1,2,3,4].map((elem)=>(
                            <tr className="">
                                <td>17 july 2026</td>
                                <td>Frontend Developer</td>
                                <td>Google</td>
                                <td>Selected</td>
                           </tr>   
                        ))}
                </tbody>
            </table>
        </div>
    )
}
export default AppliedJobTable