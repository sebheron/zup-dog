import { Menu } from "@headlessui/react";
import { PropsWithChildren } from "react";
import Button from "@/components/Button/Button";

interface MenuItemProps extends PropsWithChildren {
  disabled?: boolean;
  onClick?: () => void;
}

const MenuItem = ({ children, disabled, onClick }: MenuItemProps) => (
  <Menu.Item
    as={Button}
    disabled={disabled}
    onClick={onClick}
    size="small"
    alignment="left"
  >
    {children}
  </Menu.Item>
);

export default MenuItem;
