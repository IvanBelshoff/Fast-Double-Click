import { MdOutlineDangerous, MdOutlineDone } from "react-icons/md";

interface IAlertpProps {
    type: 'info' | 'danger' | 'sucess' | 'warning' | 'dark';
    message: string;
    view: boolean
}
export const Alert = ({ view, message, type }: IAlertpProps) => {


    if (type === 'danger' && view) {
        return (
            <div className="absolute left-4 bottom-0 z-10">
                <div className="flex items-center gap-2 p-4 mb-4 text-sm text-white rounded-lg bg-red-500" role="alert">
                    <MdOutlineDangerous size={24} />
                    <span className="sr-only">Info</span>
                    <div>
                        <span className={`font-medium`}>{message}</span>
                    </div>
                </div>
            </div>
        );
    } else if (type === 'sucess' && view) {
        return (
            <div className="absolute right-4 bottom-0 z-10">
                <div className="flex items-center gap-2 p-4 mb-4 text-sm font-bold text-white rounded-lg bg-green-500" role="alert">
                    <MdOutlineDone size={24} />
                    <span className="sr-only">Info</span>
                    <div>
                        <span className={`font-medium`}>{message}</span>
                    </div>
                </div>
            </div>
        );
    } else {
        <></>;
    }


};