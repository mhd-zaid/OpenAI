import { Icon } from '@iconify/react';
import {toast} from "react-toastify";

const SocialShare = () => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        console.log("Lien copié dans le presse-papier");
        toast.success('Lien copié dans le presse-papier');
      })
      .catch(err => console.error("Erreur lors de la copie du lien : ", err));
  };

  const shareOnFacebook = () => {
    const url = window.location.href;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank');
  };

  return (
    <div className="flex space-x-10 justify-center">
      <div onClick={copyToClipboard} className="cursor-pointer">
        <Icon icon="arcticons:linkhub" style={{ color: "black" }} fontSize={30} />
      </div>
      <div onClick={shareOnFacebook} className="cursor-pointer">
        <Icon icon="logos:facebook" fontSize={30} />
      </div>
      <div className="cursor-pointer">
        <a href="https://instagram.com/votreprofil" target="_blank" rel="noreferrer">
          <Icon icon="logos:instagram-icon" fontSize={30} />
        </a>
      </div>
    </div>
  );
};

export default SocialShare;
