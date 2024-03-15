import Image from "next/image";
import styles  from './userIcon.module.css'

interface Props {
  userImage: string;
  size: number;
}

const UserIcon = ({ userImage, size }: Props) => {
  console.log(userImage)
  return (
    <Image 
      src={userImage} 
      alt="User" 
      width={size} 
      height={size} 
      className={styles.image}
    />
    )
};

export default UserIcon;