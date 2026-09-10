const Filtering = ({ setLocation, setIndustry, setSalary })=>{
    const filterLocation = [
        {
            category:"Location",
            Options: [
    { label: "Delhi" },
    { label: "Banglore" },
    { label: "Mumbai" },
    { label: "Tamil Nadu" }
]
        },
        {
            category:"Industry",
            Options:[ { label: "Frontend Dev" },
            { label: "Backend Dev" },
            { label: "Fullstack Dev" },
            { label: "Javascript dev" },
            { label: "Python Dev" },
            { label: "Go lang Dev" },
            { label: "Java Dev" },
             { label: "Mern dev" },
        ]
        },
        {
            category:"Salary",
            Options:[
                {label:"0-40k" , min:0, max:40000},
                {label:"40k-100000",min:40000,max:100000}
            ]
        },
    ]
    return(
        <div className="mb-2.5 border-2 rounded-md w-50">
            <div className="mb-2">
            <h3 className="font-bold">Filter Job</h3>
            </div>
          {
            filterLocation.map((filter)=>(
            <div key={filter.category} className="">
                <h3 className="font-extrabold">{filter.category}</h3>
                {filter.Options.map((option)=>(
                    <div className="flex gap-2">
                         <input id={option} type="radio" value={option.label} name={filter.category}onChange={() => {

                        if (filter.category === "Location") {
                            setLocation(option.label);
                        }

                        if (filter.category === "Industry") {
                            setIndustry(option.label);
                        }

                        if (filter.category === "Salary") {
                            setSalary(option);
                        }

                    }}/>
                        <label className="" htmlFor={option.label}>{option.label}</label>
                    </div>
                   
                ))}
            </div>
            ))
          }
        </div>
    )
}
export default Filtering
