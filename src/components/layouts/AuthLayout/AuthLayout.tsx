import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
}

const AuthLayout = (props: PropTypes) => {
  const { children } = props;

  return (
    <>
      <section className="max-w-screen-3xl 3xl:container p-6">
        {children}
      </section>
    </>
  );
};

export default AuthLayout;
