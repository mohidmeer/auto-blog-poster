import { Coins, Delete, Edit, LogOut, Pause, Plus, Timer, Trash, Workflow } from "lucide-react"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import { getUsername } from "../lib/utils";
import Modal from "../components/Modal";
import AddCredits from "../components/AddCredits";
import AddScheduleForm from "../components/AddSchedule";


const Dashboard = () => {

    const navigate = useNavigate()

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
                            <span>12</span>
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
                            <h2 className="text-2xl font-bold">12</h2>
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

                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">

                        <Schedule />
                        <Schedule />
                        <Schedule />
                        <Schedule />

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Dashboard

function Schedule() {
    return (
        <div className="border rounded-md   cursor-pointer hover:shadow-xl transition-all duration-300">
            <div className="p-4">
                <Workflow />
            </div>
            <div className="bg-gray-100 p-2">
                <h5 className="text-sm font-bold text-gray-800">Schedule Post Title</h5>

                <div className="flex gap-1 text-xs font-bold text-gray-500 mt-2">
                    <Timer size={16} />
                    <p>daily</p>
                    <p>|</p>
                    <p>8:00 AM</p>
                </div>
                <div className="mt-2 flex items-center justify-between">
                    <span className="bg-green-600 px-2 text-xs rounded-full font-bold text-white">
                        active
                    </span>
                    <div className="flex gap-2">
                        <button   >
                            <Edit size={16} />
                        </button>
                        <button  >
                            <Pause size={16} />
                        </button>
                        <button  >
                            <Trash size={16} className="text-destructive" />
                        </button>

                    </div>
                </div>

            </div>
        </div>
    )
}



