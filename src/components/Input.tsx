// import { useState } from "react";
import { Input as NextUiInput } from "@nextui-org/react";

type Props = React.ComponentProps<typeof NextUiInput> & {
  innerRef?: React.Ref<HTMLInputElement>;
};

export function Input(props: Props) {
  const { className, innerRef, children, ...componentProps } = props;

  //   const [isVisible, setIsVisible] = useState(false);

  const startIcon = componentProps.startContent ? {startContent: (<span> {props.startContent} </span>)} : {};


  return (
    <NextUiInput
      type={props.type ?? "text"}
      label={props.label}
      placeholder={props.placeholder}
      labelPlacement="outside"
      {...startIcon}
      ref={innerRef}
      {...componentProps}
    />
  );
}
