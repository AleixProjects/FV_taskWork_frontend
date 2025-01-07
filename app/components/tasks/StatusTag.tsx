import { Button } from "flowbite-react";
import { MdOutlineNotStarted, MdOutlinePendingActions } from "react-icons/md";
import { GiCardboardBoxClosed, GiCancel } from "react-icons/gi";
import { TbCreditCardPay } from "react-icons/tb";
import { RiProgress7Line } from "react-icons/ri";
import { PiPiggyBankBold } from "react-icons/pi";
import { HiClock } from "react-icons/hi";

export function StatusTag({ status, editable }) {
  console.log(status);
  let colorClass = "";
  let icon = null;

  switch (status) {
    case "pending_revision":
      icon = <MdOutlinePendingActions />;
      colorClass = "bg-neutral-400 text-white";
      break;
    case "wating_accept":
      icon = <HiClock />;
      colorClass = "bg-yellow-300 text-white";
      break;
    case "to_start":
      icon = <MdOutlineNotStarted />;
      colorClass = "bg-orange-400 text-white";
      break;
    case "in_progress":
      icon = <RiProgress7Line />;
      colorClass = "bg-lime-500 text-white";
      break;
    case "pending_cashing":
      icon = <TbCreditCardPay />;
      colorClass = "bg-sky-400 text-white";
      break;
    case "cashed":
      icon = <PiPiggyBankBold />;
      colorClass = "bg-purple-500 text-white";
      break;
    case "cancelled":
      icon = <GiCancel />;
      colorClass = "bg-red-500 text-white";
      break;
    case "closed":
      icon = <GiCardboardBoxClosed />;
      colorClass = "bg-black text-white";
      break;
  }

  return (
    <Button
      pill
      className={`w-40 h-8 flex items-center justify-center ${colorClass}`}
      size="xs"
    >
      {icon && (
        <span
          style={{ fontSize: "16px", display: "flex", alignItems: "center" }}
        >
          {icon}
        </span>
      )}
      <span style={{ marginLeft: icon ? "4px" : "0", fontSize: "12px" }}>
        {status.replace("_", " ")}
      </span>
    </Button>
  );
}
