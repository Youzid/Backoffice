import React from 'react';
import { ReactComponent as CheckMarkIcon } from '../../assets/checkMark.svg';

interface PermissionCheckBoxProps {
    actions: string | null;
    permission: string;
    targetAction: string;
    requiredAction: string;
    handleCheckboxChange: (permission: string, actions: string) => void;
}

const PermissionCheckBox: React.FC<PermissionCheckBoxProps> = ({ actions, permission, targetAction, handleCheckboxChange, requiredAction }) => {
    const CheckBoxClass =
        "before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-500 checked:bg-white-500 checked:before:bg-blue-500 hover:before:opacity-10";

    const CheckMarkClass =
        "pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100";

    return (
        <div className="inline-flex items-center">
            <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                data-ripple-dark="true"
            >
                <input
                    type="checkbox"
                    className={CheckBoxClass}
                    id="checkbox"
                    checked={actions !== null && actions?.includes(targetAction)}
                    onChange={() =>
                        handleCheckboxChange(
                            permission,
                            actions !== null && actions?.includes(targetAction) ? (targetAction == "R" ? "" : targetAction == "C" ? "R" : actions.replace(targetAction, '')) : (actions?.replace(requiredAction.charAt(1), "").replace(requiredAction.charAt(0), "") || '') + targetAction + requiredAction
                        )}
                />
                <div className={CheckMarkClass}>
                  <CheckMarkIcon className=' w-4 h-4 text-primaryColor' />          
                </div>
            </label>
        </div>
    );
};

export default PermissionCheckBox;
