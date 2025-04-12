import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { apiService } from "../api/client";

const EditScheduleForm = ({ schedule, onSuccess }: { schedule?: any; onSuccess?: () => void }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      instructions: "",
      niche: "",
      schedule: "daily",
      time: "08:00",
      username: "admin",
      website_url: window.location.origin,
      password: "",
    },
  });

  // Populate form when `schedule` prop changes
  useEffect(() => {
    if (schedule) {
      reset(schedule);
    }
  }, [schedule, reset]);

  const onSubmit = async (data: any) => {
    try {
      if (schedule?._id) {
        await apiService.UpdateSchedule(schedule._id, data); // Use Update method if editing
      } else {
        await apiService.AddSchedule(data); // Otherwise add new
        document.getElementById('update')?.click()
      }
      if (onSuccess) onSuccess(); // Callback to refresh data
    } catch (error) {
      console.error("Error submitting schedule:", error);
    }
  };

  return (
    <form
      className="flex-1 flex flex-col justify-center items-center overflow-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-1 flex flex-col gap-2 max-w-[600px] mx-auto w-full max-h-screen overflow-auto ">
        <div className="flex flex-col gap-4 ">

          {/* Title */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Title</label>
            <input
              className="input w-full input-sm"
              type="text"
              placeholder="Enter title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message as string}</p>}
          </div>

          {/* Instructions */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Instructions</label>
            <textarea
              className="input w-full input-sm"
              placeholder="Enter instructions"
              {...register("instructions", { required: "Instructions are required" })}
            />
            {errors.instructions && <p className="text-xs text-red-500">{errors.instructions.message as string}</p>}
          </div>

          {/* Niche */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Niche</label>
            <input
              className="input w-full input-sm"
              type="text"
              placeholder="Enter niche"
              {...register("niche", { required: "Niche is required" })}
            />
            {errors.niche && <p className="text-xs text-red-500">{errors.niche.message as string}</p>}
          </div>

          {/* Schedule */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Schedule</label>
            <select className="input w-full input-sm" {...register("schedule")}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Time */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Time</label>
            <input
              className="input w-full input-sm"
              type="time"
              {...register("time")}
            />
          </div>

          {/* Website URL */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Website URL</label>
            <input
              className="input w-full input-sm"
              type="url"
              {...register("website_url", { required: "Website URL is required" })}
            />
            {errors.website_url && <p className="text-xs text-red-500">{errors.website_url.message as string}</p>}
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Username</label>
            <input
              className="input w-full input-sm"
              type="text"
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-xs text-red-500">{errors.username.message as string}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Password</label>
            <input
              className="input w-full input-sm"
              type="password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-xs text-red-500">{errors.password.message as string}</p>}
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-1 mt-1">
            <Button>{schedule ? "Update" : "Submit"}</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditScheduleForm;
