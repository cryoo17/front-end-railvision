import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
}

const AuthLayout = (props: PropTypes) => {
  const { children } = props;

  return (
    <section className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 antialiased lg:py-0">
      <div className="max-w-screen-3xl 3xl:container p-6">{children}</div>
    </section>
  );
};

export default AuthLayout;
