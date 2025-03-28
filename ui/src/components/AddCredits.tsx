
import { useForm } from 'react-hook-form';
import { Button } from '../components/ui/button';
import { apiService } from '../api/client';
const AddCredits = () => {
     const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:{
            quantity:50
        }
     });
    
        const onSubmit = async (data:object) => {
           await apiService.AddCredits(data)          
        };
  return (
    <form className='flex-1 flex flex-col justify-center items-center' onSubmit={handleSubmit(onSubmit)} >
            <div className='p-1 flex flex-col gap-2 max-w-[450px] mx-auto  w-full'>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1 w-full '>
                        <label className='text-sm' >Enter Credits</label>
                        <div className='relative  w-full' >
                           
                            <input className={`input w-full`} type='number' data-error={errors.quantity && true} placeholder='100'
                                {...register('quantity', {
                                    required: 'Quantity is required',
                                    min:{message:'Minimum 50 credits',value:50},

                                })}
                            />

                        </div>
                        {
                            errors.quantity && <p className='text-sm font-semibold text-red-500'>{errors.quantity.message as string}</p>
                        }
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <Button>
                            Buy
                        </Button>
                    </div>
                </div>
            </div>

        </form>
  )
}

export default AddCredits
