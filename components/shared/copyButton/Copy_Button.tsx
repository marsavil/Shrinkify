import { FC, ReactNode } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineCopy } from 'react-icons/ai';

interface CopyButtonProps {
  content: string;
  onCopy: () => void;
  copied: boolean;
  children: ReactNode; // Aquí se define el tipo de children
}

const Copy_Button: FC<CopyButtonProps> = ({ content, onCopy, copied, children }) => {
  return (
    <div onClick={onCopy}>
      {children}
    </div>
  );
};

export default Copy_Button;
