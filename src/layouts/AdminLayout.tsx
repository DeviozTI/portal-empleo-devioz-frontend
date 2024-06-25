import { Footer, SideBar } from "../components";

interface PublicLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: PublicLayoutProps) => {
  return (
    <div>
      <SideBar children={children} />
      <Footer />
    </div>
  );
};

export default AdminLayout;
