import { Coins, Edit, LogOut, Pause,Play, Plus, Timer, Trash, Workflow } from "lucide-react"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import { getUsername } from "../lib/utils";
import { apiService } from "../api/client";
import Modal from "../components/Modal";
import AddCredits from "../components/AddCredits";
import AddScheduleForm from "../components/AddSchedule";
import EditScheduleForm from "../components/EditSchedule";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
const Dashboard = () => {
    const navigate = useNavigate()
    const [credits, setCredits] = useState<number | null>(null); // State for credits
    const [loadingCredits, setLoadingCredits] = useState(true); // Track loading state for credits
    const [creditError, setCreditError] = useState<string | null>(null); 


  // Fetch credits on component mount
  // Fetch credits on component mount
  useEffect(() => {
    const fetchCredits = async () => {
        try {
            const data = await apiService.ShowCredits();
            setCredits(data.credits); // Set credits dynamically
        } catch (error: any) {
            setCreditError(error.message || "An error occurred while fetching credits.");
        } finally {
            setLoadingCredits(false); // Stop loading
        }
    };

    fetchCredits();
}, []);



interface Schedule {
    _id: string; // Ensure _id is included
    title: string;
    schedule: string; // e.g., "daily"
    time: string; // e.g., "8:00 AM"
    active: boolean; // e.g., true/false
}
const [schedules, setSchedules] = useState<Schedule[]>([]);


useEffect(() => {
    const fetchSchedules = async () => {
        try {
            const data = await apiService.GetAllSchedules();
            setSchedules(data.schedules);
        } catch (error: any) {
            console.log(error)
        } 
    };

    fetchSchedules();
}, []);

 // Dynamically calculate the number of active schedules
 const activeSchedulesCount = schedules.filter((schedule) => schedule.active).length;
    
    const handleLogout = () => {
        localStorage.removeItem("blogger-api-auth-token");
        navigate("/auth/login");
    };
    return (
        <div className="p-10 ">
            <div className="max-w-6xl mx-auto shadow-2xl p-4 border rounded-md">
                <div className="flex justify-between items-center border-b pb-1">
                    <div className="flex items-center gap-1 font-bold">
                        <div className="size-6  bg-primary" />
                        Blog Flix
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2  font-bold">
                             {/* Loading or Error State for Credits */}
                             {loadingCredits ? (
                                <span>Loading...</span>
                            ) : creditError ? (
                                <span className="text-red-500">{creditError}</span>
                            ) : (
                                <>
                                    <span>{credits ?? 0}</span> {/* Display credits or 0 if undefined */}
                                    
                                </>
                            )}
                            <Coins />
                            <Modal 
                                title='Buy More Credits'
                                content={<AddCredits/>} >
                                <Button variant="outline" size="icon">
                                    <Plus className="w-4 h-4" />
                                </Button>
                            </Modal>

                        </div>
                        <Button size="icon" className="hover:bg-destructive" onClick={() => { handleLogout() }}>
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>

                </div>
                <div className="h-[50vh] flex flex-col justify-center p-4 ">
                    <h1 className="text-6xl">Welcome back,<br />
                        <span className="font-bold">{getUsername()}</span>
                    </h1>
                    <div className="grid grid-cols-3 gap-4 max-w-2xl mt-10">
                        {/* Active Schedules */}
                        <div className="bg-primary text-white p-6 rounded-lg text-center">
                            <h2 className="text-2xl font-bold">{activeSchedulesCount}</h2>
                            <p className="text-sm">Active Schedules</p>
                        </div>

                        {/* Total Posts */}
                        <div className="bg-primary text-white p-6 rounded-lg text-center">
                            <h2 className="text-2xl font-bold">102</h2>
                            <p className="text-sm">Total Posts</p>
                        </div>

                        <Modal title="Add a new Schdeule" content={<AddScheduleForm/>}>
                        <div className="bg-primary text-white p-6 rounded-lg flex flex-col items-center justify-center">
                            <Plus className="size-8 border-white rounded-md p-1" />
                            <p className="text-sm mt-2">Add new Schedule</p>
                        </div>
                        </Modal>
                    </div>
                </div>
                <div className="p-4">
                    <h4 className="text-2xl font-bold mb-4 ">Your Schedules</h4>

               

                        <Schedule />
                 
              
           

                    </div>

                </div>

            </div>

      

    )
}

export default Dashboard





function Schedule() {


    interface Schedule {
        _id: string; // Ensure _id is included
        title: string;
        schedule: string; // e.g., "daily"
        time: string; // e.g., "8:00 AM"
        active: boolean; // e.g., true/false
    }
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [loadingSchedules, setLoadingSchedules] = useState(true);
    const [scheduleError, setScheduleError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const data = await apiService.GetAllSchedules();
                setSchedules(data.schedules);
            } catch (error: any) {
                setScheduleError(error.message || "An error occurred while fetching schedules.");
            } finally {
                setLoadingSchedules(false);
            }
        };

        fetchSchedules();
    }, []);

    if (loadingSchedules) return <p>Loading schedules...</p>;
    if (scheduleError) return <p className="text-red-500">{scheduleError}</p>;

       // Handle schedule deletion
       const handleDeleteSchedule = async (_id:string) => {
        console.log("Deleting schedule with ID:", _id);
    
        if (!window.confirm("Are you sure you want to delete this schedule?")) return;
    
        try {
            const response = await apiService.DeleteSchedule(_id);
            console.log(response); // Call the DeleteSchedule method
    
            if (response.success) {
                // Remove the deleted schedule from the state
                setSchedules((prevSchedules) =>
                    prevSchedules.filter((schedule) => schedule._id !== _id)
                );
            } else {
                throw new Error("Failed to delete schedule.");
            }
        } catch (error: any) {
            console.error("Error deleting schedule:", error);
            alert(error.message || "An error occurred while deleting the schedule.");
        }
    };






 // Handle Pause Schedule
 const handleRunSchedule = async (_id: string) => {
    console.log("Pausing schedule with ID:", _id);



    try {
        const response = await apiService.RunSchedule(_id);
        console.log(response); // Call the PauseSchedule method

        if (response.success) {
            toast.success('Schedule run successfully!')
            // Update the schedule's active state in the local state
            setSchedules((prevSchedules) =>
                prevSchedules.map((schedule) =>
                    schedule._id === _id ? { ...schedule, active: true } : schedule
                )
            );
        } else {
            throw new Error("Failed to pause schedule.");
        }
    } catch (error: any) {
        console.error("Error pausing schedule:", error);
        alert(error.message || "An error occurred while pausing the schedule.");
    }
};

// Handle Stop Schedule
const handleStopSchedule = async (_id: string) => {
    console.log("Stopping schedule with ID:", _id);


    try {
        const response = await apiService.StopSchedule(_id);
        console.log(response); // Call the StopSchedule method

        if (response.success) {

            toast.success('Schedule stopped successfully!')
            // Update the schedule's active state in the local state
            setSchedules((prevSchedules) =>
                prevSchedules.map((schedule) =>
                    schedule._id === _id ? { ...schedule, active: false } : schedule
                )
            );
        } else {
            throw new Error("Failed to stop schedule.");
        }
    } catch (error: any) {
        console.error("Error stopping schedule:", error);
        alert(error.message || "An error occurred while stopping the schedule.");
    }
};




 return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {schedules.map((item) => (
            <div
                key={item._id} // Use _id as the key
                className="border rounded-md cursor-pointer hover:shadow-xl transition-all duration-300"
            >
                <div className="p-4">
                    <Workflow />
                </div>
                <div className="bg-gray-100 p-2">
                    <h5 className="text-sm font-bold text-gray-800">{item.title}</h5>
                    <div className="flex gap-1 text-xs font-bold text-gray-500 mt-2">
                        <Timer size={16} />
                        <p>{item.schedule}</p>
                        <p>|</p>
                        <p>{item.time}</p>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <span
                            className={`${
                                item.active ? "bg-green-600" : "bg-red-500"
                            } px-2 text-xs rounded-full font-bold text-white`}
                        >
                            {item.active ? "active" : "paused"}
                        </span>
                        <div className="flex gap-2">
                        <Modal title="Update Schedule" content={<EditScheduleForm schedule={item} onSuccess={() => window.location.reload()} />}>
                     <button>
                         <Edit size={16} />
                       </button>
                        </Modal>

                            <button onClick={() => handleStopSchedule(item._id) }>
                                    <Play size={16} />
                                </button>
                                <button onClick={() =>handleRunSchedule(item._id)  }>
                                    <Pause size={16}  />
                                </button>
                            <button
                                onClick={() => handleDeleteSchedule(item._id)} // Use _id for deletion
                                className="text-destructive"
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
    )
}



