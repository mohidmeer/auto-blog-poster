import { Coins, LogOut, Plus } from "lucide-react"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import { getUsername } from "../lib/utils";


const Dashboard = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("blogger-api-auth-token");
        navigate("/auth/login");
    };
    return (
        <div className="p-10 ">

            <div className="max-w-6xl mx-auto shadow-2xl p-4 border rounded-md">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 font-bold">
                        <div className="size-6  bg-primary" />
                        Blog Flix
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="flex items-center gap-2  font-bold">
                            <span>12</span>
                            <Coins />
                            <Button variant="outline" size="icon">
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>
                        <Button size="icon" className="hover:bg-destructive" onClick={()=>{handleLogout()}}>
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>

                </div>
                <div className="h-[50vh] flex flex-col justify-center p-4">
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

                        {/* Add New Schedule */}
                        <div className="bg-primary text-white p-6 rounded-lg flex flex-col items-center justify-center">
                            <Plus className="size-8 border-white rounded-md p-1" />
                            <p className="text-sm mt-2">Add new Schedule</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Dashboard
