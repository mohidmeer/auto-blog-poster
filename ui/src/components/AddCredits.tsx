import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { apiService } from "../api/client";

interface AddCreditsProps {}

const AddCredits: React.FC<AddCreditsProps> = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<{ quantity: number }>({
        defaultValues: {
            quantity: 50, // Default value for quantity
        },
    });

    const [loading, setLoading] = React.useState(false); // Track loading state
    const [error, setError] = React.useState<string | null>(null); // Track error state

    const onSubmit = async (data: { quantity: number }) => {
        setLoading(true);
        setError(null);

        try {
            const response = await apiService.AddCredits(data);

            if (response.success && response.stripe_checkout_url) {
                window.location.href = response.stripe_checkout_url; // Redirect to Stripe URL
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            className="flex-1 flex flex-col justify-center items-center"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="p-1 flex flex-col gap-2 max-w-[450px] mx-auto w-full">
                <div className="flex flex-col gap-4">
                    {/* Quantity Input */}
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-sm">Enter Credits</label>
                        <div className="relative w-full">
                            <input
                                className={`input w-full ${
                                    errors.quantity ? "border-red-500" : ""
                                }`}
                                type="number"
                                placeholder="100"
                                {...register("quantity", {
                                    required: "Quantity is required",
                                    min: { value: 50, message: "Minimum 50 credits" },
                                })}
                            />
                        </div>
                        {/* Error Message */}
                        {errors.quantity && (
                            <p className="text-sm font-semibold text-red-500">
                                {errors.quantity.message as string}
                            </p>
                        )}
                    </div>

                    {/* Buy Button */}
                    <div className="flex flex-col gap-1">
                        <Button disabled={loading}>
                            {loading ? "Processing..." : "Buy"}
                        </Button>
                        {/* Global Error Message */}
                        {error && (
                            <p className="text-sm font-semibold text-red-500">{error}</p>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddCredits;