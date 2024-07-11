import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, ConfigProvider } from "antd";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <header className=" bg-white text-slate-950 h-[60px] w-full flex items-center px-8">
      <ConfigProvider
        theme={
          {
            // components: { Breadcrumb: { linkColor: "#000", itemColor: "#000" } },
          }
        }
      >
        <Breadcrumb
          items={[
            {
              href: "/",
              title: <HomeOutlined />,
            },
            {
              href: location.pathname,
              title: (
                <span className="capitalize">{location.pathname.slice(1)}</span>
              ),
            },
          ]}
        />
      </ConfigProvider>
    </header>
  );
}
