import { Badge } from "flowbite-react";
import { MdOutlineNotStarted, MdOutlinePendingActions } from "react-icons/md";
import { GiCardboardBoxClosed, GiCancel } from "react-icons/gi";
import { TbCreditCardPay } from "react-icons/tb";
import { RiProgress7Line } from "react-icons/ri";
import { PiPiggyBankBold } from "react-icons/pi";
import { HiClock } from "react-icons/hi";
import PropTypes from 'prop-types';

export function StatusTag({ status, editable }) {
  let colorClass = "";
  let icon = null;

  switch (status) {
    case "pending_revision":
      icon = () => <MdOutlinePendingActions />;
      colorClass = "bg-neutral-400 text-white";
      break;
    case "waiting_accept":
      icon = () => <HiClock />;
      colorClass = "bg-yellow-300 text-white";
      break;
    case "to_start":
      icon = () => <MdOutlineNotStarted />;
      colorClass = "bg-orange-400 text-white";
      break;
    case "in_progress":
      icon = () => <RiProgress7Line />;
      colorClass = "bg-lime-500 text-white";
      break;
    case "pending_cashing":
      icon = () => <TbCreditCardPay />;
      colorClass = "bg-sky-400 text-white";
      break;
    case "cashed":
      icon = () => <PiPiggyBankBold />;
      colorClass = "bg-purple-500 text-white";
      break;
    case "cancelled":
      icon = () => <GiCancel />;
      colorClass = "bg-red-500 text-white";
      break;
    case "closed":
      icon = () => <GiCardboardBoxClosed />;
      colorClass = "bg-black text-white";
      break;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Badge className={colorClass} icon={icon || undefined} tabIndex={0} aria-label={`Status: ${status.replace("_", " ")}`}>
        {status.replace("_", " ")}
      </Badge>
    </div>
  );
}

StatusTag.propTypes = {
  status: PropTypes.string.isRequired,
  editable: PropTypes.bool
};
