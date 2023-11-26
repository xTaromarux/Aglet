import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="overflow-none flex h-screen justify-center">
      <div
        className="flex h-full w-full flex-col"
        style={{ backgroundColor: "#11151C" }}
      >
        {props.children}
      </div>
    </main>
  );
};
