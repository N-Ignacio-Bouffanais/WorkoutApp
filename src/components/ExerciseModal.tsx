import { Dispatch, SetStateAction } from "react"
import { api } from "~/utils/api";
import { useAppStore } from "~/store/App_state";

interface ExerciseModalProps {
    setmodalOpen: Dispatch<SetStateAction<boolean>>
}

const ExerciseModal: React.FC<ExerciseModalProps> = () => {
    const [modalOpen, setmodalOpen] = useAppStore((state) => [state.modal, state.toggleModal])
    const [day, setDay] = useAppStore((state) => [state.day, state.setDay])
    const [name, setName] = useAppStore((state) => [state.nameEx, state.setNameEx])
    const [sets, setSets] = useAppStore((state) => [state.sets, state.setSets])
    const [weight, setWeight] = useAppStore((state) => [state.weight, state.setWeight])
    const [reps, setReps] = useAppStore((state) => [state.reps, state.setReps])

    const Exercise = {
        day: day,
        nameEx: name,
        sets: sets,
        reps: reps,
        weight: weight,
    }
    const { mutate } = api.exercise.create.useMutation()
    return (

        <div className="absolute inset-0 flex items-center justify-center bg-dark-blue">
            <div className="space-y-5 p-3 w-4/5 flex flex-col mx-auto items-center">
                <form onSubmit={(e: React.FormEvent<HTMLFormElement>)=> {
                    e.preventDefault()
                    mutate(Exercise)
                }} className="flex flex-col">
                    <label className="text-slate-300 text-xl font-semibold" htmlFor="exercise">Exercise:</label>
                    <select name="exercise" value={name} onChange={(e) => setName(e.target.value)} className="outline-none flex rounded-md h-9 w-80 px-4 font-medium my-2 cursor-pointer " autoFocus >
                        <option value="Biceps-Curl">Biceps curl</option>
                        <option value="Squat">Squat</option>
                        <option value="Bench-press">Bench press</option>
                        <option value="Deadlift">Deadlift</option>
                        <option value="Bulgarian-Squat">Bulgarian squat</option>
                        <option value="Cardio">Cardio</option>
                    </select>
                    <label className="text-slate-300 text-xl font-semibold" htmlFor="day">Day:</label>
                    <select name="day" value={day} onChange={(e) => setDay(e.target.value)} className="outline-none flex rounded-md h-9 w-80 px-4 font-medium my-2 cursor-pointer">
                        <option value="lunes">Lunes</option>
                        <option value="martes">Martes</option>
                        <option value="miercoles">Miercoles</option>
                        <option value="jueves">Jueves</option>
                        <option value="viernes">Viernes</option>
                        <option value="sabado">Sabado</option>
                        <option value="domingo">Domingo</option>
                    </select>
                    <label className="text-slate-300 text-xl font-semibold" htmlFor="reps">Reps:</label>
                    <input name="reps" id="reps" value={reps} onChange={(e) => setReps(e.target.valueAsNumber)} className="outline-none flex rounded-md h-9 w-80 px-4 font-medium my-2" type="number" />
                    <label className="text-slate-300 text-xl font-semibold" htmlFor="weight">Weight(kg):</label>
                    <input name="weight" id="weight" value={weight} onChange={(e) => setWeight(e.target.valueAsNumber)} className="outline-none flex rounded-md h-9 w-80 px-4 font-medium my-2" type="number" />
                    <label className="text-slate-300 text-xl font-semibold" htmlFor="sets">Sets:</label>
                    <input name="sets" id="sets" value={sets} onChange={(e) => setSets(e.target.valueAsNumber)} className="outline-none flex rounded-md h-9 w-80 px-4 font-medium my-2" type="number" />
                    <button type="button" onClick={() => setmodalOpen()} className="h-9 w-80 rounded-md bg-sky-600 text-slate-50 font-semibold my-4">Done</button>
                    <button type="button" onClick={() => setmodalOpen()} className="h-9 w-80 rounded-md bg-pink-700 text-slate-50 font-semibold my-2">Cancel</button>
                </form>

            </div>
        </div>
    )
}

export default ExerciseModal