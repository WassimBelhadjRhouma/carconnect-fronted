import { ToastContentProps } from "react-toastify";
import cx from "clsx";
import { ReactNode } from "react";

type CustomNotificationProps = ToastContentProps<{
  title: string;
  content: string;
}> & {
  children?: ReactNode; // Add `children` as an optional prop
};

export default function CustomToast({
  closeToast,
  data,
  toastProps,
  children = "",
}: CustomNotificationProps) {
  const isColored = toastProps.theme === "colored";

  return (
    <div className="flex flex-col w-full">
      <h3
        className={cx(
          "text-sm font-semibold",
          isColored ? "text-white" : "text-zinc-800"
        )}
      >
        {data.title}
      </h3>
      <div className="flex items-center justify-between">
        <p className="text-sm">{data.content}</p>
      </div>
    </div>
  );
}
