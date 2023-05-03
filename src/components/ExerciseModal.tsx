import { Dispatch, SetStateAction } from "react"
import { api } from "~/utils/api";
import { useAppStore } from "~/store/App_state";

interface RoutineModalProps {
    setmodalOpen: Dispatch<SetStateAction<boolean>>
}

const RoutineModal: React.FC<RoutineModalProps> = () => {
    const [modalOpen, setmodalOpen] = useAppStore((state) => [state.modal, state.toggleModal])
    const [name_routine, setRoutine] = useAppStore((state) => [state.name_routine, state.setRoutineName])
    const [day, setDay] = useAppStore((state) => [state.day, state.setDay])

    const { mutate } = api.routine.create.useMutation();

    return (

        <div className="absolute inset-0 flex items-center justify-center bg-dark-blue">
            <div className="space-y-5 p-3 w-4/5 flex flex-col mx-auto items-center">
                <h3 className="text-slate-300 text-2xl font-semibold">How you gonna do?</h3>
                <form onSubmit={(e: React.FormEvent<HTMLFormElement>)=> {
                    e.preventDefault()
                    const Routine = {day, routine_name: name_routine}
                    mutate(Routine)
                }} className="space-y-5 flex flex-col">
                    <select value={day} onChange={(e)=> setDay(e.target.value)} className="outline-none flex rounded-md h-9 w-80 px-4 font-medium">
                        <option value="lunes">Lunes</option>
                        <option value="martes">Martes</option>
                        <option value="miercoles">Miercoles</option>
                        <option value="jueves">Jueves</option>
                        <option value="viernes">Viernes</option>
                        <option value="sabado">Sabado</option>
                        <option value="domingo">Domingo</option>
                    </select>
                    <input value={name_routine} onChange={(e) => setRoutine(e.target.value)} className="outline-none flex rounded-md h-9 w-80 px-4 font-medium" type="text" placeholder="nameRoutine" />
                    <button type="button" onClick={() => setmodalOpen()} className="h-9 w-80 rounded-md bg-sky-600 text-slate-50 font-semibold">Done</button>
                    <button type="button" onClick={() => setmodalOpen()} className="h-9 w-80 rounded-md bg-pink-700 text-slate-50 font-semibold">Cancel</button>
                </form>

            </div>
        </div>
    )
}

export default RoutineModal