import React from "react";

type Props = {
  children?: React.ReactNode;
};

export default function App({ children }: Props) {
  return <>{children}</>;
}
