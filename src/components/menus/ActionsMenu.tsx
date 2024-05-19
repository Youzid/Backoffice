import React,{useEffect,useState} from 'react';
import { ReactComponent as OptionsIcon } from '../../assets/CRUD/crudToggle.svg';
import ActionsHandler from './ActionsHandler';

export interface IActionsProps {
  permissions: any,
  setSelectedViewElement?: () => void,
  setSelectedEditElement?: () => void,
  setSelectedAddElement?: () => void,
  setSelectedDeleteElement?: () => void,
  handleActivate?: () => void,
  handleDeactivate?: () => void,
  handlePay?: () => void,
  handleCancel?: () => void,
  handleVisible?: () => void,
  handleInvisible?: () => void,
  status?:string
  setSelectedDetailsElement?:()=>void
}
interface IToggleProps  {
   setToggleOptions:(index:number)=> void,  
   toggleOptions:number,
   elementIndex:number 
   }

const ActionsMenu = ({permissions,handlePay,handleCancel,setSelectedDetailsElement,setSelectedViewElement,setSelectedEditElement,setSelectedAddElement,handleVisible,handleInvisible,setSelectedDeleteElement,status,handleDeactivate,handleActivate,elementIndex,setToggleOptions,toggleOptions}:IActionsProps & IToggleProps) => {
  const [toggleOn, setToggleOn] = useState(false);


  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const optionIcon = target.closest('.option-icon');
    if (!optionIcon) {
      setToggleOptions(-1);
      setToggleOn(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line
  }, []);

  const handleOptionClick = (index: number) => {
    if (toggleOptions === index) {
      setToggleOn((prevToggleOn) => !prevToggleOn);
    } else {
      setToggleOptions(index);
      setToggleOn(true);
    }
  };
    return (
        <div className={` absolute -translate-y-2 start-4  z-[40]`}>
                    <button className={`option-icon cursor-pointer hover:scale-110 duration-150 ${(toggleOptions === elementIndex && toggleOn) && "rotate-90 duration-75"}`} onClick={() => handleOptionClick(elementIndex)}>
                      <OptionsIcon />
                    </button>
                    <div className={` -translate-y-4  option-icon  `}>
                      {toggleOptions === elementIndex && toggleOn &&
                        <ActionsHandler
                          setSelectedViewElement={setSelectedViewElement}
                          setSelectedDeleteElement={setSelectedDeleteElement}
                          setSelectedEditElement={setSelectedEditElement}
                          setSelectedAddElement={setSelectedAddElement}
                          setSelectedDetailsElement={setSelectedDetailsElement}
                          handleActivate={handleActivate}
                          handleDeactivate={handleDeactivate}
                          handlePay={handlePay}
                          handleCancel={handleCancel}
                          handleVisible={handleVisible}
                          handleInvisible={handleInvisible}
                          status={status}
                          permissions={permissions}
                        />}
                    </div>
                  </div>
    );
};

export default ActionsMenu;