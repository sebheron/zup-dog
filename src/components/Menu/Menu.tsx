import { Menu as HeadlessMenu, Transition } from "@headlessui/react";
import { Fragment, PropsWithChildren, ReactNode } from "react";
import Button from "@/components/Button/Button";
import styles from "./Menu.module.css";

interface Props extends PropsWithChildren {
  buttonContent: ReactNode;
  [key: string]: unknown;
}

const Menu = ({ children, buttonContent, ...props }: Props) => (
  <HeadlessMenu as="div">
    {({ open }) => (
      <>
        <HeadlessMenu.Button as={Button} {...props} data-tooltip-hidden={open}>
          {buttonContent}
        </HeadlessMenu.Button>
        <Transition
          enter={styles.transition}
          leave={styles.transition}
          enterFrom={styles.hidden}
          enterTo={styles.visible}
          leaveFrom={styles.visible}
          leaveTo={styles.hidden}
          as={Fragment}
        >
          <HeadlessMenu.Items as="div" className={styles.items}>
            {children}
          </HeadlessMenu.Items>
        </Transition>
      </>
    )}
  </HeadlessMenu>
);

interface MenuItemProps extends PropsWithChildren {
  disabled?: boolean;
  onClick?: () => void;
}

const MenuItem = ({ children, disabled, onClick }: MenuItemProps) => (
  <HeadlessMenu.Item
    as={Button}
    disabled={disabled}
    onClick={onClick}
    size="small"
    alignment="left"
  >
    {children}
  </HeadlessMenu.Item>
);

Menu.Item = MenuItem;
export default Menu;
