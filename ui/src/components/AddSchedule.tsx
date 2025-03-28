import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { apiService } from "../api/client";

const AddScheduleForm = () => {
  const {
    register,
    handleSubmit,
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

  const onSubmit = async (data: object) => {
    console.log(data);
    const res = await apiService.AddSchedule(data);
  };

  return (
    <form
      className="flex-1 flex flex-col justify-center items-center overflow-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="p-1 flex flex-col gap-2 max-w-[600px] mx-auto w-full max-h-screen overflow-auto ">
        <div className="flex flex-col gap-4 ">
          {/* Title */}
          <div className="flex flex-col gap-1 w-full ">
            <label className="text-xs font-semibold">Title</label>
            <input
              className="input w-full input-sm"
              type="text"
              placeholder="Enter title"
              data-error={errors.title && true}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <p className="text-xs mt-1 font-semibold text-red-500">{errors.title.message as string}</p>}
          </div>

          {/* Instructions */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Instructions</label>
            <textarea
              className="input w-full input-sm"
              placeholder="Enter instructions"
              data-error={errors.instructions && true}
              {...register("instructions", { required: "Instructions are required" })}
            />
            {errors.instructions && <p className="text-xs mt-1 font-semibold text-red-500">{errors.instructions.message as string}</p>}
          </div>

          {/* Niche */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Niche</label>
            <input
              className="input w-full input-sm"
              type="text"
              placeholder="Enter niche (e.g., Hollywood, Tech)"
              data-error={errors.niche && true}
              {...register("niche", { required: "Niche is required" })}
            />
            {errors.niche && <p className="text-xs mt-1 font-semibold text-red-500">{errors.niche.message as string}</p>}
          </div>

          {/* Schedule */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Schedule</label>
            <select className="input w-full input-sm" data-error={errors.schedule && true} {...register("schedule")}>
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
              data-error={errors.time && true}
              {...register("time")}
            />
          </div>

          {/* Website URL */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Website URL</label>
            <input
              className="input w-full input-sm"
              type="url"
              placeholder="Enter website URL"
              data-error={errors.website_url && true}
              {...register("website_url", { required: "Website URL is required" })}
            />
            {errors.website_url && <p className="text-xs mt-1 font-semibold text-red-500">{errors.website_url.message as string}</p>}
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Username</label>
            <input
              className="input w-full input-sm"
              type="text"
              placeholder="Enter username"
              data-error={errors.username && true}
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <p className="text-xs mt-1 font-semibold text-red-500">{errors.username.message as string}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 w-full">
            <label className="text-xs font-semibold">Password</label>
            <input
              className="input w-full input-sm"
              type="password"
              placeholder="Enter password"
              data-error={errors.password && true}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-xs mt-1 font-semibold text-red-500">{errors.password.message as string}</p>}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col gap-1 mt-1">
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddScheduleForm;